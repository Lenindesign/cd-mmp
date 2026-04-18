import { useEffect } from 'react';
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
const PROJECT_NAME = 'cd-mmp-review';

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

      const instance = initSiteping({
        store,
        projectName: PROJECT_NAME,
        position: 'bottom-right',
        accentColor: '#1B5F8A',
        theme: 'light',
        forceShow: true,
      });

      destroy = () => instance.destroy();
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  return null;
}
