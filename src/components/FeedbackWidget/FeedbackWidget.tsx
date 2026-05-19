import { useEffect } from 'react';
import type { SitepingInstance, SitepingStore } from '@siteping/widget';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';

/**
 * FeedbackWidget mounts the SitePing review widget when enabled.
 *
 * Enablement (any of these):
 *   - URL query string contains `?review=1`
 *   - `localStorage.setItem('cd-mmp:feedback', '1')` was set previously
 *   - `VITE_ENABLE_FEEDBACK=true` is set at build time
 *
 * Once enabled via `?review=1`, the preference is persisted to localStorage so
 * reviewers do not need to re-add the query param as they navigate between pages.
 * Use `?review=0` to opt out and clear the preference.
 *
 * Storage backend:
 *   - When Supabase is configured (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY set),
 *     all reviewers share a single feedback stream via the `siteping_feedback` +
 *     `siteping_annotations` tables. Run `supabase/migrations/20260418_siteping_feedback.sql`
 *     in your Supabase project to provision the schema.
 *   - Otherwise, each reviewer's comments live only in their own browser's
 *     localStorage. Useful as a fallback but NOT suitable for shared stakeholder
 *     reviews — switch to Supabase before handing the URL to multiple reviewers.
 *
 * The widget packages are lazy-loaded — when feedback is disabled, none of the
 * SitePing code is downloaded. Normal visitors pay zero bundle cost.
 */
const STORAGE_FLAG_KEY = 'cd-mmp:feedback';
const STORAGE_DATA_KEY = 'cd-mmp:feedback:data';
const PENDING_FEEDBACK_KEY = 'cd-mmp:feedback:pending-id';
const PROJECT_NAME = 'cd-mmp-review';

type FeedbackRecord = Awaited<ReturnType<SitepingStore['createFeedback']>>;

function withOpenSitepingShadow<T>(callback: () => T): T {
  const originalAttachShadow = Element.prototype.attachShadow;

  Element.prototype.attachShadow = function attachSitepingShadow(this: Element, init: ShadowRootInit) {
    if (this.localName === 'siteping-widget' && init.mode === 'closed') {
      return originalAttachShadow.call(this, { ...init, mode: 'open' });
    }

    return originalAttachShadow.call(this, init);
  } as typeof Element.prototype.attachShadow;

  try {
    return callback();
  } finally {
    Element.prototype.attachShadow = originalAttachShadow;
  }
}

function getSitepingShadowRoot(): ShadowRoot | null {
  return document.querySelector('siteping-widget')?.shadowRoot ?? null;
}

function getComparablePageUrl(url: URL): string {
  const normalized = new URL(url.toString());
  normalized.hash = '';
  normalized.searchParams.delete('review');
  return normalized.toString();
}

function getFeedbackTargetUrl(feedback: FeedbackRecord): URL | null {
  try {
    return new URL(feedback.url, window.location.href);
  } catch {
    return null;
  }
}

function isCurrentFeedbackPage(feedback: FeedbackRecord): boolean {
  const targetUrl = getFeedbackTargetUrl(feedback);
  if (!targetUrl) return true;

  return getComparablePageUrl(targetUrl) === getComparablePageUrl(new URL(window.location.href));
}

function scrollToFeedbackAnnotation(feedback: FeedbackRecord) {
  const annotation = feedback.annotations[0];
  if (!annotation) return;

  window.scrollTo({
    left: annotation.scrollX,
    top: annotation.scrollY,
    behavior: 'smooth',
  });
}

function navigateToFeedbackPage(feedback: FeedbackRecord) {
  const targetUrl = getFeedbackTargetUrl(feedback);
  if (!targetUrl) return;

  try {
    window.sessionStorage.setItem(PENDING_FEEDBACK_KEY, feedback.id);
  } catch {
    // Ignore storage errors; navigation still works without marker restoration.
  }

  window.location.assign(targetUrl.toString());
}

function installFeedbackUrlNavigation(instance: SitepingInstance, store: SitepingStore): () => void {
  const shadowRoot = getSitepingShadowRoot();
  if (!shadowRoot) return () => {};

  let feedbacksById = new Map<string, FeedbackRecord>();
  let refreshPromise: Promise<void> | null = null;
  const timeouts = new Set<number>();

  const schedule = (callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(() => {
      timeouts.delete(timeoutId);
      callback();
    }, delay);
    timeouts.add(timeoutId);
  };

  const refreshFeedbackCache = () => {
    if (!refreshPromise) {
      refreshPromise = store
        .getFeedbacks({ projectName: PROJECT_NAME, limit: 100 })
        .then(({ feedbacks }) => {
          feedbacksById = new Map(feedbacks.map((feedback) => [feedback.id, feedback]));
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    return refreshPromise;
  };

  const getFeedback = async (feedbackId: string) => {
    let feedback = feedbacksById.get(feedbackId);
    if (feedback) return feedback;

    await refreshFeedbackCache();
    return feedbacksById.get(feedbackId);
  };

  const handleFeedbackCard = async (feedbackId: string) => {
    const feedback = await getFeedback(feedbackId);
    if (!feedback) return;

    if (isCurrentFeedbackPage(feedback)) {
      scrollToFeedbackAnnotation(feedback);
      return;
    }

    navigateToFeedbackPage(feedback);
  };

  const onCardClick = (event: Event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('button, [data-action]')) return;

    const card = target.closest<HTMLElement>('.sp-card');
    const feedbackId = card?.dataset.feedbackId;
    if (!feedbackId) return;

    const cachedFeedback = feedbacksById.get(feedbackId);
    if (cachedFeedback && isCurrentFeedbackPage(cachedFeedback)) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    void handleFeedbackCard(feedbackId);
  };

  const onCardKeydown = (event: Event) => {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key !== 'Enter' && keyboardEvent.key !== ' ') return;

    const target = keyboardEvent.target;
    if (!(target instanceof HTMLElement) || !target.classList.contains('sp-card')) return;

    const feedbackId = target.dataset.feedbackId;
    if (!feedbackId) return;

    const cachedFeedback = feedbacksById.get(feedbackId);
    if (cachedFeedback && isCurrentFeedbackPage(cachedFeedback)) return;

    keyboardEvent.preventDefault();
    keyboardEvent.stopImmediatePropagation();
    void handleFeedbackCard(feedbackId);
  };

  const restorePendingFeedback = async () => {
    let pendingFeedbackId: string | null = null;
    try {
      pendingFeedbackId = window.sessionStorage.getItem(PENDING_FEEDBACK_KEY);
      if (pendingFeedbackId) window.sessionStorage.removeItem(PENDING_FEEDBACK_KEY);
    } catch {
      return;
    }

    if (!pendingFeedbackId) return;

    instance.open();
    await refreshFeedbackCache();

    const feedback = feedbacksById.get(pendingFeedbackId);
    if (feedback && isCurrentFeedbackPage(feedback)) {
      schedule(() => scrollToFeedbackAnnotation(feedback), 350);
    }

    const scrollCardIntoView = (attempt = 0) => {
      const activeShadowRoot = getSitepingShadowRoot();
      const escapedFeedbackId = CSS.escape(pendingFeedbackId);
      const card = activeShadowRoot?.querySelector<HTMLElement>(`.sp-card[data-feedback-id="${escapedFeedbackId}"]`);

      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('sp-anim-flash');
        return;
      }

      if (attempt < 10) schedule(() => scrollCardIntoView(attempt + 1), 250);
    };

    scrollCardIntoView();
  };

  void refreshFeedbackCache();
  schedule(() => {
    void restorePendingFeedback();
  }, 0);

  const unsubscribeOpen = instance.on('panel:open', () => {
    void refreshFeedbackCache();
  });

  const unsubscribeFeedbackSent = instance.on('feedback:sent', (feedback) => {
    feedbacksById.set(feedback.id, feedback as unknown as FeedbackRecord);
  });

  shadowRoot.addEventListener('click', onCardClick, true);
  shadowRoot.addEventListener('keydown', onCardKeydown, true);

  return () => {
    shadowRoot.removeEventListener('click', onCardClick, true);
    shadowRoot.removeEventListener('keydown', onCardKeydown, true);
    unsubscribeOpen();
    unsubscribeFeedbackSent();
    timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeouts.clear();
  };
}

function isFeedbackEnabled(): boolean {
  if (typeof window === 'undefined') return false;

  if (import.meta.env.VITE_ENABLE_FEEDBACK === 'true') return true;

  const params = new URLSearchParams(window.location.search);
  const flag = params.get('review');

  if (flag === '1' || flag === 'true') {
    try {
      window.localStorage.setItem(STORAGE_FLAG_KEY, '1');
    } catch {
      // Ignore storage errors (private mode, quota exceeded, etc.)
    }
    return true;
  }

  if (flag === '0' || flag === 'false') {
    try {
      window.localStorage.removeItem(STORAGE_FLAG_KEY);
    } catch {
      // Ignore storage errors
    }
    return false;
  }

  try {
    return window.localStorage.getItem(STORAGE_FLAG_KEY) === '1';
  } catch {
    return false;
  }
}

export default function FeedbackWidget() {
  useEffect(() => {
    if (!isFeedbackEnabled()) return;

    let destroy: (() => void) | null = null;
    let cancelled = false;

    const loadStore = async () => {
      const { initSiteping } = await import('@siteping/widget');

      if (isSupabaseConfigured && supabase) {
        const { SitepingSupabaseStore } = await import('../../lib/sitepingSupabaseStore');
        return {
          initSiteping,
          store: new SitepingSupabaseStore({ supabase }),
          backend: 'supabase' as const,
        };
      }

      const { LocalStorageStore } = await import('@siteping/adapter-localstorage');
      return {
        initSiteping,
        store: new LocalStorageStore({ key: STORAGE_DATA_KEY }),
        backend: 'localstorage' as const,
      };
    };

    loadStore().then(({ initSiteping, store, backend }) => {
      if (cancelled) return;

      if (backend === 'localstorage' && import.meta.env.DEV) {
        console.warn(
          '[FeedbackWidget] Running with LocalStorage store — comments are NOT shared ' +
            'across reviewers. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY ' +
            'to switch to the shared Supabase store.',
        );
      }

      const instance = withOpenSitepingShadow(() => initSiteping({
        store,
        projectName: PROJECT_NAME,
        position: 'bottom-right',
        accentColor: '#1B5F8A',
        theme: 'light',
        forceShow: true,
      }));
      const destroyFeedbackUrlNavigation = installFeedbackUrlNavigation(instance, store);

      destroy = () => {
        destroyFeedbackUrlNavigation();
        instance.destroy();
      };
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  return null;
}
