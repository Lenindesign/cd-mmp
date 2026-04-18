/**
 * SitepingSupabaseStore — SitePing `SitepingStore` implementation backed by Supabase.
 *
 * Replaces the default `LocalStorageStore` so that stakeholder feedback is shared
 * across all reviewers instead of being scoped to each reviewer's browser.
 *
 * See `supabase/migrations/20260418_siteping_feedback.sql` for the required schema.
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SitepingStore } from '@siteping/widget';

// SitePing doesn't re-export these from the widget package entry, so derive
// them from the `SitepingStore` interface (which is exported).
export type FeedbackRecord = Awaited<ReturnType<SitepingStore['createFeedback']>>;
export type FeedbackCreateInput = Parameters<SitepingStore['createFeedback']>[0];
export type FeedbackQuery = Parameters<SitepingStore['getFeedbacks']>[0];
export type FeedbackUpdateInput = Parameters<SitepingStore['updateFeedback']>[1];
export type AnnotationRecord = FeedbackRecord['annotations'][number];
export type FeedbackStatus = FeedbackRecord['status'];
export type FeedbackType = FeedbackRecord['type'];

// Minimal local equivalents of SitePing's error classes. SitePing identifies
// them by the `code` string, not by instanceof, so matching shape is enough.
class StoreNotFoundError extends Error {
  readonly code = 'STORE_NOT_FOUND' as const;
  constructor(message = 'Record not found') {
    super(message);
    this.name = 'StoreNotFoundError';
  }
}

class StoreDuplicateError extends Error {
  readonly code = 'STORE_DUPLICATE' as const;
  constructor(message = 'Duplicate record') {
    super(message);
    this.name = 'StoreDuplicateError';
  }
}

interface SupabaseStoreOptions {
  supabase: SupabaseClient;
  /** Defaults to `siteping_feedback` */
  feedbackTable?: string;
  /** Defaults to `siteping_annotations` */
  annotationsTable?: string;
}

interface FeedbackRow {
  id: string;
  project_name: string;
  type: FeedbackRecord['type'];
  message: string;
  status: FeedbackRecord['status'];
  url: string;
  viewport: string;
  user_agent: string;
  author_name: string;
  author_email: string;
  client_id: string;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

interface AnnotationRow {
  id: string;
  feedback_id: string;
  css_selector: string;
  xpath: string;
  text_snippet: string;
  element_tag: string;
  element_id: string | null;
  text_prefix: string;
  text_suffix: string;
  fingerprint: string;
  neighbor_text: string;
  x_pct: number;
  y_pct: number;
  w_pct: number;
  h_pct: number;
  scroll_x: number;
  scroll_y: number;
  viewport_w: number;
  viewport_h: number;
  device_pixel_ratio: number;
  created_at: string;
}

type FeedbackRowWithAnnotations = FeedbackRow & { annotations: AnnotationRow[] };

export class SitepingSupabaseStore implements SitepingStore {
  private readonly supabase: SupabaseClient;
  private readonly feedbackTable: string;
  private readonly annotationsTable: string;

  constructor(options: SupabaseStoreOptions) {
    this.supabase = options.supabase;
    this.feedbackTable = options.feedbackTable ?? 'siteping_feedback';
    this.annotationsTable = options.annotationsTable ?? 'siteping_annotations';
  }

  async createFeedback(data: FeedbackCreateInput): Promise<FeedbackRecord> {
    // Idempotency: if a row with this clientId already exists, return it unchanged.
    const existing = await this.findByClientId(data.clientId);
    if (existing) return existing;

    const { data: inserted, error } = await this.supabase
      .from(this.feedbackTable)
      .insert({
        project_name: data.projectName,
        type: data.type,
        message: data.message,
        status: data.status,
        url: data.url,
        viewport: data.viewport,
        user_agent: data.userAgent,
        author_name: data.authorName,
        author_email: data.authorEmail,
        client_id: data.clientId,
      })
      .select('*')
      .single<FeedbackRow>();

    if (error) {
      // 23505 = unique_violation on client_id — a concurrent insert won the race.
      if (error.code === '23505') {
        const racedExisting = await this.findByClientId(data.clientId);
        if (racedExisting) return racedExisting;
        throw new StoreDuplicateError(`Duplicate clientId: ${data.clientId}`);
      }
      throw new Error(`Failed to create feedback: ${error.message}`);
    }

    if (data.annotations.length > 0) {
      const rows = data.annotations.map((a) => ({
        feedback_id: inserted.id,
        css_selector: a.cssSelector,
        xpath: a.xpath,
        text_snippet: a.textSnippet,
        element_tag: a.elementTag,
        element_id: a.elementId ?? null,
        text_prefix: a.textPrefix,
        text_suffix: a.textSuffix,
        fingerprint: a.fingerprint,
        neighbor_text: a.neighborText,
        x_pct: a.xPct,
        y_pct: a.yPct,
        w_pct: a.wPct,
        h_pct: a.hPct,
        scroll_x: a.scrollX,
        scroll_y: a.scrollY,
        viewport_w: a.viewportW,
        viewport_h: a.viewportH,
        device_pixel_ratio: a.devicePixelRatio,
      }));

      const { error: annError } = await this.supabase
        .from(this.annotationsTable)
        .insert(rows);

      if (annError) {
        throw new Error(`Failed to insert annotations: ${annError.message}`);
      }
    }

    return this.hydrate(inserted.id);
  }

  async getFeedbacks(query: FeedbackQuery): Promise<{
    feedbacks: FeedbackRecord[];
    total: number;
  }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 100;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let builder = this.supabase
      .from(this.feedbackTable)
      .select(`*, annotations:${this.annotationsTable}(*)`, { count: 'exact' })
      .eq('project_name', query.projectName)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (query.type) builder = builder.eq('type', query.type);
    if (query.status) builder = builder.eq('status', query.status);
    if (query.search) builder = builder.ilike('message', `%${query.search}%`);

    const { data, error, count } = await builder;

    if (error) {
      throw new Error(`Failed to fetch feedbacks: ${error.message}`);
    }

    const rows = ((data ?? []) as unknown) as FeedbackRowWithAnnotations[];
    return {
      feedbacks: rows.map((row) => this.rowToRecord(row)),
      total: count ?? 0,
    };
  }

  async findByClientId(clientId: string): Promise<FeedbackRecord | null> {
    const { data, error } = await this.supabase
      .from(this.feedbackTable)
      .select(`*, annotations:${this.annotationsTable}(*)`)
      .eq('client_id', clientId)
      .maybeSingle<FeedbackRowWithAnnotations>();

    if (error) {
      throw new Error(`Failed to find feedback by clientId: ${error.message}`);
    }
    if (!data) return null;
    return this.rowToRecord(data);
  }

  async updateFeedback(id: string, data: FeedbackUpdateInput): Promise<FeedbackRecord> {
    const { data: updated, error } = await this.supabase
      .from(this.feedbackTable)
      .update({
        status: data.status,
        resolved_at: data.resolvedAt ? data.resolvedAt.toISOString() : null,
      })
      .eq('id', id)
      .select(`*, annotations:${this.annotationsTable}(*)`)
      .maybeSingle<FeedbackRowWithAnnotations>();

    if (error) {
      throw new Error(`Failed to update feedback: ${error.message}`);
    }
    if (!updated) {
      throw new StoreNotFoundError(`Feedback not found: ${id}`);
    }
    return this.rowToRecord(updated);
  }

  async deleteFeedback(id: string): Promise<void> {
    const { data, error } = await this.supabase
      .from(this.feedbackTable)
      .delete()
      .eq('id', id)
      .select('id');

    if (error) {
      throw new Error(`Failed to delete feedback: ${error.message}`);
    }
    if (!data || data.length === 0) {
      throw new StoreNotFoundError(`Feedback not found: ${id}`);
    }
  }

  async deleteAllFeedbacks(projectName: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.feedbackTable)
      .delete()
      .eq('project_name', projectName);

    if (error) {
      throw new Error(`Failed to delete all feedbacks: ${error.message}`);
    }
  }

  private async hydrate(id: string): Promise<FeedbackRecord> {
    const { data, error } = await this.supabase
      .from(this.feedbackTable)
      .select(`*, annotations:${this.annotationsTable}(*)`)
      .eq('id', id)
      .single<FeedbackRowWithAnnotations>();

    if (error) {
      throw new Error(`Failed to hydrate feedback: ${error.message}`);
    }
    return this.rowToRecord(data);
  }

  private rowToRecord(row: FeedbackRowWithAnnotations): FeedbackRecord {
    return {
      id: row.id,
      projectName: row.project_name,
      type: row.type,
      message: row.message,
      status: row.status,
      url: row.url,
      viewport: row.viewport,
      userAgent: row.user_agent,
      authorName: row.author_name,
      authorEmail: row.author_email,
      clientId: row.client_id,
      resolvedAt: row.resolved_at ? new Date(row.resolved_at) : null,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      annotations: (row.annotations ?? []).map((a) => this.annotationToRecord(a)),
    };
  }

  private annotationToRecord(row: AnnotationRow): AnnotationRecord {
    return {
      id: row.id,
      feedbackId: row.feedback_id,
      cssSelector: row.css_selector,
      xpath: row.xpath,
      textSnippet: row.text_snippet,
      elementTag: row.element_tag,
      elementId: row.element_id,
      textPrefix: row.text_prefix,
      textSuffix: row.text_suffix,
      fingerprint: row.fingerprint,
      neighborText: row.neighbor_text,
      xPct: row.x_pct,
      yPct: row.y_pct,
      wPct: row.w_pct,
      hPct: row.h_pct,
      scrollX: row.scroll_x,
      scrollY: row.scroll_y,
      viewportW: row.viewport_w,
      viewportH: row.viewport_h,
      devicePixelRatio: row.device_pixel_ratio,
      createdAt: new Date(row.created_at),
    };
  }
}
