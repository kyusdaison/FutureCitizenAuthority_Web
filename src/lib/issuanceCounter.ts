/**
 * Browser-local issuance counter.
 *
 * Persists across page reloads via localStorage. Used to wire one tile
 * on /dashboard to a real, live number that increments every time the
 * /identity demo issues a credential.
 *
 * This is intentionally NOT a backend counter — institutional buyers
 * see this as a demonstration of "the same surface that runs your
 * pilot reads from the issuance event stream", with a small live
 * source they can move themselves while watching the dashboard react.
 */
import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'fca:issuance-counter';
const EVENT_NAME = 'fca:issuance';

interface IssuanceState {
  total: number;
  /** ISO timestamp of the most recent issuance, or null. */
  lastIssuedAt: string | null;
}

const EMPTY_STATE: IssuanceState = { total: 0, lastIssuedAt: null };

function safeRead(): IssuanceState {
  if (typeof window === 'undefined') return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<IssuanceState>;
    return {
      total: typeof parsed.total === 'number' ? parsed.total : 0,
      lastIssuedAt: typeof parsed.lastIssuedAt === 'string' ? parsed.lastIssuedAt : null,
    };
  } catch {
    return EMPTY_STATE;
  }
}

function safeWrite(state: IssuanceState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota / privacy mode — silently degrade.
  }
}

/**
 * Record an issuance event. Increments the persisted counter and
 * notifies any listening hooks in the same tab.
 */
export function recordIssuance(): IssuanceState {
  const next: IssuanceState = {
    total: safeRead().total + 1,
    lastIssuedAt: new Date().toISOString(),
  };
  safeWrite(next);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: next }));
  }
  return next;
}

/** Reset the persisted counter to zero. Useful for demo flows. */
export function resetIssuance(): IssuanceState {
  safeWrite(EMPTY_STATE);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: EMPTY_STATE }));
  }
  return EMPTY_STATE;
}

// useSyncExternalStore needs a stable snapshot. We memoize the last state
// returned by safeRead() so identical reads return referentially-equal
// objects — required to avoid an infinite render loop.
let cachedSnapshot: IssuanceState = EMPTY_STATE;
let cachedSnapshotKey: string = '';

function getSnapshot(): IssuanceState {
  const next = safeRead();
  const key = `${next.total}|${next.lastIssuedAt ?? ''}`;
  if (key !== cachedSnapshotKey) {
    cachedSnapshot = next;
    cachedSnapshotKey = key;
  }
  return cachedSnapshot;
}

function getServerSnapshot(): IssuanceState {
  return EMPTY_STATE;
}

function subscribe(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const onCustom = () => onChange();
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange();
  };
  window.addEventListener(EVENT_NAME, onCustom);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(EVENT_NAME, onCustom);
    window.removeEventListener('storage', onStorage);
  };
}

/**
 * React hook that subscribes to the issuance counter.
 *
 * Updates on:
 *  - in-tab issuances (custom event)
 *  - cross-tab issuances (storage event)
 */
export function useIssuanceCounter(): IssuanceState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Format an ISO timestamp as a short HH:MM UTC label, or em-dash if null. */
export function formatLastIssued(iso: string | null): string {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    const hh = d.getUTCHours().toString().padStart(2, '0');
    const mm = d.getUTCMinutes().toString().padStart(2, '0');
    return `${hh}:${mm} UTC`;
  } catch {
    return '—';
  }
}
