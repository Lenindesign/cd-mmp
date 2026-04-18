import { useEffect } from 'react';

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
 * The widget packages are lazy-loaded — when feedback is disabled, none of the
 * SitePing code is downloaded. Normal visitors pay zero bundle cost.
 *
 * Comments persist in each reviewer's own browser (localStorage). To share
 * feedback across stakeholders, swap `LocalStorageStore` for a Supabase-backed
 * SitepingStore implementation.
 */
const STORAGE_FLAG_KEY = 'cd-mmp:feedback';
const STORAGE_DATA_KEY = 'cd-mmp:feedback:data';

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

    Promise.all([
      import('@siteping/widget'),
      import('@siteping/adapter-localstorage'),
    ]).then(([{ initSiteping }, { LocalStorageStore }]) => {
      if (cancelled) return;

      const instance = initSiteping({
        store: new LocalStorageStore({ key: STORAGE_DATA_KEY }),
        projectName: 'cd-mmp-review',
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
