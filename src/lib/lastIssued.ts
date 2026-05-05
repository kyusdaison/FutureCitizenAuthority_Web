/**
 * Browser-local store of the most recently issued VC-JWT.
 *
 * Lets the Verifier demo on /identity pick up the credential the
 * Issuer demo just produced, without prop-drilling state across
 * components. Mirrors the issuanceCounter pattern.
 */
import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'fca:last-issued-credential';
const EVENT_NAME = 'fca:last-issued';

interface LastIssuedState {
  jwt: string | null;
  issuedAt: string | null;
}

const EMPTY_STATE: LastIssuedState = { jwt: null, issuedAt: null };

function safeRead(): LastIssuedState {
  if (typeof window === 'undefined') return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<LastIssuedState>;
    return {
      jwt: typeof parsed.jwt === 'string' ? parsed.jwt : null,
      issuedAt: typeof parsed.issuedAt === 'string' ? parsed.issuedAt : null,
    };
  } catch {
    return EMPTY_STATE;
  }
}

function safeWrite(state: LastIssuedState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota / privacy mode — silently degrade.
  }
}

export function recordLastIssued(jwt: string): LastIssuedState {
  const next: LastIssuedState = {
    jwt,
    issuedAt: new Date().toISOString(),
  };
  safeWrite(next);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: next }));
  }
  return next;
}

let cachedSnapshot: LastIssuedState = EMPTY_STATE;
let cachedSnapshotKey: string = '';

function getSnapshot(): LastIssuedState {
  const next = safeRead();
  const key = `${next.jwt ?? ''}|${next.issuedAt ?? ''}`;
  if (key !== cachedSnapshotKey) {
    cachedSnapshot = next;
    cachedSnapshotKey = key;
  }
  return cachedSnapshot;
}

function getServerSnapshot(): LastIssuedState {
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

export function useLastIssuedCredential(): LastIssuedState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
