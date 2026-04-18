import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  Trash2,
  ExternalLink,
  Filter,
  Search,
  AlertTriangle,
  RefreshCw,
  MessageSquare,
} from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';
import {
  SitepingSupabaseStore,
  type FeedbackRecord,
  type FeedbackStatus,
  type FeedbackType,
} from '../../lib/sitepingSupabaseStore';
import './FeedbackAdmin.css';

const PROJECT_NAME = 'cd-mmp-review';

type StatusFilter = 'all' | FeedbackStatus;
type TypeFilter = 'all' | FeedbackType;

const TYPE_LABELS: Record<FeedbackType, string> = {
  question: 'Question',
  change: 'Change',
  bug: 'Bug',
  other: 'Other',
};

const TYPE_CLASS: Record<FeedbackType, string> = {
  question: 'feedback-admin__pill--question',
  change: 'feedback-admin__pill--change',
  bug: 'feedback-admin__pill--bug',
  other: 'feedback-admin__pill--other',
};

function formatRelative(date: Date): string {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

function shortenUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.pathname}${parsed.search || ''}` || '/';
  } catch {
    return url;
  }
}

export default function FeedbackAdmin() {
  const store = useMemo(
    () => (supabase ? new SitepingSupabaseStore({ supabase }) : null),
    [],
  );

  const [feedbacks, setFeedbacks] = useState<FeedbackRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [search, setSearch] = useState('');

  const fetchAll = useCallback(async () => {
    if (!store) return;
    setLoading(true);
    setError(null);
    try {
      const res = await store.getFeedbacks({
        projectName: PROJECT_NAME,
        status: statusFilter === 'all' ? undefined : statusFilter,
        type: typeFilter === 'all' ? undefined : typeFilter,
        search: search.trim() || undefined,
        limit: 500,
      });
      setFeedbacks(res.feedbacks);
      setTotal(res.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load feedback');
    } finally {
      setLoading(false);
    }
  }, [store, statusFilter, typeFilter, search]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    const channel = client
      .channel('siteping-admin-live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'siteping_feedback' },
        () => {
          fetchAll();
        },
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, [fetchAll]);

  const handleResolveToggle = useCallback(
    async (item: FeedbackRecord) => {
      if (!store) return;
      const nextStatus: FeedbackStatus = item.status === 'open' ? 'resolved' : 'open';
      try {
        await store.updateFeedback(item.id, {
          status: nextStatus,
          resolvedAt: nextStatus === 'resolved' ? new Date() : null,
        });
        fetchAll();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update feedback');
      }
    },
    [store, fetchAll],
  );

  const handleDelete = useCallback(
    async (item: FeedbackRecord) => {
      if (!store) return;
      if (
        !window.confirm(
          `Delete this ${TYPE_LABELS[item.type].toLowerCase()} from ${item.authorName || 'anonymous'}?`,
        )
      ) {
        return;
      }
      try {
        await store.deleteFeedback(item.id);
        fetchAll();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete feedback');
      }
    },
    [store, fetchAll],
  );

  const openCount = useMemo(
    () => feedbacks.filter((f) => f.status === 'open').length,
    [feedbacks],
  );
  const resolvedCount = feedbacks.length - openCount;

  if (!isSupabaseConfigured) {
    return (
      <div className="feedback-admin">
        <div className="feedback-admin__container">
          <header className="feedback-admin__header">
            <h1 className="feedback-admin__title">Stakeholder feedback</h1>
          </header>
          <div className="feedback-admin__empty feedback-admin__empty--warning">
            <AlertTriangle size={24} />
            <div>
              <p className="feedback-admin__empty-title">Supabase is not configured</p>
              <p className="feedback-admin__empty-body">
                Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your
                local <code>.env</code> and Netlify environment variables, then run the SQL at
                <code> supabase/migrations/20260418_siteping_feedback.sql</code>. Without Supabase,
                each reviewer's comments live only in their own browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-admin">
      <div className="feedback-admin__container">
        <header className="feedback-admin__header">
          <div>
            <h1 className="feedback-admin__title">Stakeholder feedback</h1>
            <p className="feedback-admin__subtitle">
              All pins left by reviewers across the prototype.{' '}
              <span className="feedback-admin__stat">{openCount} open</span>
              {' · '}
              <span className="feedback-admin__stat">{resolvedCount} resolved</span>
              {' · '}
              <span className="feedback-admin__stat">{total} total</span>
            </p>
          </div>
          <button
            type="button"
            className="feedback-admin__refresh"
            onClick={fetchAll}
            disabled={loading}
            aria-label="Refresh"
          >
            <RefreshCw size={16} className={loading ? 'feedback-admin__refresh-icon--spin' : ''} />
            Refresh
          </button>
        </header>

        <div className="feedback-admin__toolbar">
          <div className="feedback-admin__search">
            <Search size={16} className="feedback-admin__search-icon" />
            <input
              type="search"
              placeholder="Search messages..."
              className="feedback-admin__search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="feedback-admin__filters">
            <div className="feedback-admin__filter-group" role="tablist" aria-label="Status">
              <Filter size={14} className="feedback-admin__filter-icon" />
              {(['all', 'open', 'resolved'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={statusFilter === value}
                  className={`feedback-admin__filter-chip${
                    statusFilter === value ? ' feedback-admin__filter-chip--active' : ''
                  }`}
                  onClick={() => setStatusFilter(value)}
                >
                  {value === 'all' ? 'All' : value === 'open' ? 'Open' : 'Resolved'}
                </button>
              ))}
            </div>

            <div className="feedback-admin__filter-group" role="tablist" aria-label="Type">
              {(['all', 'question', 'change', 'bug', 'other'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={typeFilter === value}
                  className={`feedback-admin__filter-chip${
                    typeFilter === value ? ' feedback-admin__filter-chip--active' : ''
                  }`}
                  onClick={() => setTypeFilter(value)}
                >
                  {value === 'all' ? 'All types' : TYPE_LABELS[value]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="feedback-admin__error" role="alert">
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        )}

        {!loading && feedbacks.length === 0 && !error && (
          <div className="feedback-admin__empty">
            <MessageSquare size={28} />
            <p className="feedback-admin__empty-title">No feedback yet</p>
            <p className="feedback-admin__empty-body">
              Share a{' '}
              <Link to="/?review=1" className="feedback-admin__empty-link">
                review URL
              </Link>{' '}
              with your stakeholders and pins will appear here as they come in.
            </p>
          </div>
        )}

        <ul className="feedback-admin__list">
          {feedbacks.map((item) => (
            <li
              key={item.id}
              className={`feedback-admin__item${
                item.status === 'resolved' ? ' feedback-admin__item--resolved' : ''
              }`}
            >
              <div className="feedback-admin__item-main">
                <div className="feedback-admin__item-meta">
                  <span className={`feedback-admin__pill ${TYPE_CLASS[item.type]}`}>
                    {TYPE_LABELS[item.type]}
                  </span>
                  <span className="feedback-admin__author">
                    {item.authorName || 'Anonymous'}
                    {item.authorEmail && (
                      <span className="feedback-admin__author-email"> · {item.authorEmail}</span>
                    )}
                  </span>
                  <span className="feedback-admin__dot" aria-hidden>·</span>
                  <time
                    className="feedback-admin__time"
                    dateTime={item.createdAt.toISOString()}
                    title={item.createdAt.toLocaleString()}
                  >
                    {formatRelative(item.createdAt)}
                  </time>
                </div>
                <p className="feedback-admin__message">{item.message}</p>
                <div className="feedback-admin__item-footer">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="feedback-admin__url"
                  >
                    <ExternalLink size={12} />
                    <span>{shortenUrl(item.url)}</span>
                  </a>
                  {item.annotations.length > 0 && (
                    <span className="feedback-admin__annotations">
                      {item.annotations.length} pin{item.annotations.length === 1 ? '' : 's'} ·{' '}
                      <code>{item.annotations[0].elementTag.toLowerCase()}</code>
                      {item.annotations[0].elementId
                        ? `#${item.annotations[0].elementId}`
                        : ''}
                    </span>
                  )}
                </div>
              </div>

              <div className="feedback-admin__item-actions">
                <button
                  type="button"
                  className="feedback-admin__action"
                  onClick={() => handleResolveToggle(item)}
                  aria-label={item.status === 'open' ? 'Mark resolved' : 'Reopen'}
                  title={item.status === 'open' ? 'Mark resolved' : 'Reopen'}
                >
                  {item.status === 'open' ? (
                    <Circle size={16} />
                  ) : (
                    <CheckCircle2 size={16} className="feedback-admin__check" />
                  )}
                </button>
                <button
                  type="button"
                  className="feedback-admin__action feedback-admin__action--danger"
                  onClick={() => handleDelete(item)}
                  aria-label="Delete"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {loading && feedbacks.length > 0 && (
          <p className="feedback-admin__loading">Refreshing…</p>
        )}
      </div>
    </div>
  );
}
