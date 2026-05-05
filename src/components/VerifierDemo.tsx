import { useCallback, useState } from 'react';
import * as ed from '@noble/ed25519';
import {
  CheckCircle2,
  ClipboardPaste,
  FileSearch,
  Loader2,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import {
  decodeJwt,
  resolveDidKeyPublicKey,
  shortenDid,
  type DecodedJwt,
} from '../lib/vc';
import { useLastIssuedCredential } from '../lib/lastIssued';

type VerifierState = 'idle' | 'verifying' | 'verified';

interface CheckResult {
  id: 'shape' | 'didResolve' | 'signature' | 'validity';
  label: string;
  pass: boolean;
  detail: string;
}

function checkValidityWindow(payload: DecodedJwt['payload']): CheckResult {
  const now = Math.floor(Date.now() / 1000);
  const iatLabel = payload.iat ? new Date(payload.iat * 1000).toISOString() : 'unknown';

  if (typeof payload.iat === 'number' && payload.iat > now + 60) {
    return {
      id: 'validity',
      label: 'Within validity window',
      pass: false,
      detail: `Issuance date is ${iatLabel} — in the future. Reject.`,
    };
  }
  // VcJwtPayload doesn't currently include exp; check defensively if present.
  const expCandidate = (payload as DecodedJwt['payload'] & { exp?: number }).exp;
  if (typeof expCandidate === 'number' && expCandidate < now) {
    return {
      id: 'validity',
      label: 'Within validity window',
      pass: false,
      detail: `Expired at ${new Date(expCandidate * 1000).toISOString()}.`,
    };
  }
  return {
    id: 'validity',
    label: 'Within validity window',
    pass: true,
    detail: typeof expCandidate === 'number'
      ? `Issued ${iatLabel}, valid until ${new Date(expCandidate * 1000).toISOString()}.`
      : `Issued ${iatLabel}, no expiration set.`,
  };
}

/**
 * Live W3C Verifiable Credential verification — the relying-party path.
 *
 * Given only a VC-JWT, decode it, resolve the issuer's public key from
 * the embedded did:key (no external lookup), verify the Ed25519
 * signature, and check the validity window. Each step is exposed as
 * a separate pass/fail row so a procurement officer can see exactly
 * what a verifier actually does.
 */
export const VerifierDemo = () => {
  const [input, setInput] = useState('');
  const [state, setState] = useState<VerifierState>('idle');
  const [results, setResults] = useState<CheckResult[]>([]);
  const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
  const lastIssued = useLastIssuedCredential();

  const useLast = useCallback(() => {
    if (!lastIssued.jwt) return;
    setInput(lastIssued.jwt);
    setResults([]);
    setDecoded(null);
    setState('idle');
  }, [lastIssued.jwt]);

  const tamperLast = useCallback(() => {
    if (!lastIssued.jwt) return;
    const parts = lastIssued.jwt.split('.');
    if (parts.length !== 3) return;
    const sig = parts[2];
    const flipped = `${sig.slice(0, -1)}${sig.slice(-1) === 'A' ? 'B' : 'A'}`;
    setInput(`${parts[0]}.${parts[1]}.${flipped}`);
    setResults([]);
    setDecoded(null);
    setState('idle');
  }, [lastIssued.jwt]);

  const reset = useCallback(() => {
    setInput('');
    setResults([]);
    setDecoded(null);
    setState('idle');
  }, []);

  const verify = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setState('verifying');
    setResults([]);
    setDecoded(null);

    // Tiny visible delay for UX consistency with IssuerDemo.
    await new Promise((r) => setTimeout(r, 250));

    const checks: CheckResult[] = [];
    let dec: DecodedJwt | null = null;

    // (1) JWT shape
    try {
      dec = decodeJwt(trimmed);
      checks.push({
        id: 'shape',
        label: 'JWT well-formed',
        pass: true,
        detail: `Three base64url segments. alg=${dec.header.alg}, typ=${dec.header.typ ?? 'JWT'}.`,
      });
    } catch (e) {
      setResults([
        {
          id: 'shape',
          label: 'JWT well-formed',
          pass: false,
          detail: `Could not decode: ${(e as Error).message}`,
        },
      ]);
      setState('verified');
      return;
    }

    // (2) Resolve did:key → public key
    let pubKey: Uint8Array | null = null;
    const issuerDid = dec.payload.iss || dec.payload.vc?.issuer;
    try {
      if (!issuerDid) throw new Error('no issuer DID found in payload');
      pubKey = resolveDidKeyPublicKey(issuerDid);
      checks.push({
        id: 'didResolve',
        label: 'Issuer DID resolves',
        pass: true,
        detail: `did:key parsed → 32-byte Ed25519 public key embedded in the DID itself. No registry lookup needed (${shortenDid(
          issuerDid,
          14,
          6,
        )}).`,
      });
    } catch (e) {
      checks.push({
        id: 'didResolve',
        label: 'Issuer DID resolves',
        pass: false,
        detail: `${(e as Error).message}`,
      });
      // Skip signature check — we have no key to check against.
      checks.push({
        id: 'signature',
        label: 'Signature valid',
        pass: false,
        detail: 'Skipped — issuer key could not be resolved.',
      });
      checks.push(checkValidityWindow(dec.payload));
      setDecoded(dec);
      setResults(checks);
      setState('verified');
      return;
    }

    // (3) Signature
    try {
      const ok = ed.verify(
        dec.signature,
        new TextEncoder().encode(dec.signingInput),
        pubKey,
      );
      checks.push({
        id: 'signature',
        label: 'Signature valid',
        pass: ok,
        detail: ok
          ? 'Ed25519 signature matches the issuer’s public key. Credential has not been modified.'
          : 'Signature does not match. Credential was tampered with or signed by a different key.',
      });
    } catch (e) {
      checks.push({
        id: 'signature',
        label: 'Signature valid',
        pass: false,
        detail: `Verify error: ${(e as Error).message}`,
      });
    }

    // (4) Validity window
    checks.push(checkValidityWindow(dec.payload));

    setDecoded(dec);
    setResults(checks);
    setState('verified');
  }, [input]);

  const allPass = results.length > 0 && results.every((c) => c.pass);

  return (
    <section
      id="verifier-demo"
      className="border border-cyan-300/25 bg-[#020617]/70 p-6 md:p-8 my-10 scroll-mt-32"
    >
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-cyan-300">Verifier view</p>
          <h3 className="text-2xl font-serif font-light text-white leading-tight">
            Verify it as a relying party.
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Same machinery, opposite direction. Given only the credential, decode the JWT, resolve the
            issuer&rsquo;s public key from the embedded <span className="font-mono text-cyan-300">did:key</span>{' '}
            (no registry lookup), verify the <span className="font-mono text-cyan-300">EdDSA</span> signature,
            and check the validity window. This is what a relying party actually does.
          </p>
        </div>
        {state !== 'idle' && (
          <button
            type="button"
            onClick={reset}
            className="self-start md:self-end border border-white/10 bg-white/[0.02] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.22em] text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-white"
          >
            Reset
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Source picker */}
        <div className="border border-white/10 bg-white/[0.02] p-5">
          <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-slate-400">Credential to verify</p>
          <div className="mb-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={useLast}
              disabled={!lastIssued.jwt}
              className="inline-flex items-center gap-2 border border-cyan-300/30 bg-cyan-300/[0.04] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-200 transition-colors hover:border-cyan-300/55 hover:bg-cyan-300/10 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FileSearch className="h-3 w-3" />
              Use last issued
            </button>
            <button
              type="button"
              onClick={tamperLast}
              disabled={!lastIssued.jwt}
              className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.22em] text-slate-300 transition-colors hover:border-red-400/40 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <XCircle className="h-3 w-3" />
              Tamper, then verify
            </button>
            {!lastIssued.jwt && (
              <span className="inline-flex items-center gap-2 px-1 text-[10px] font-mono uppercase tracking-[0.22em] text-slate-500">
                <ClipboardPaste className="h-3 w-3" />
                Issue a credential above first, or paste a JWT.
              </span>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDprZXk6e..."
            rows={4}
            spellCheck={false}
            className="w-full bg-black/40 border border-white/10 p-3 text-[11px] font-mono leading-relaxed text-slate-200 outline-none transition-colors focus:border-cyan-300/45 placeholder:text-slate-600 break-all"
          />
        </div>

        <button
          type="button"
          onClick={verify}
          disabled={!input.trim() || state === 'verifying'}
          className="group inline-flex w-full items-center justify-center gap-3 border border-cyan-300/30 bg-cyan-300/5 px-6 py-4 text-sm text-cyan-200 transition-colors hover:border-cyan-300/55 hover:bg-cyan-300/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === 'verifying' ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <ShieldCheck className="h-4 w-4" />
          )}
          <span className="font-mono uppercase tracking-[0.22em]">
            {state === 'verifying' ? 'Verifying…' : 'Run all four checks'}
          </span>
        </button>

        {state === 'verified' && results.length > 0 && (
          <div className="space-y-3">
            {results.map((c) => (
              <div
                key={c.id}
                className={
                  'border p-4 ' +
                  (c.pass
                    ? 'border-cyan-300/30 bg-cyan-300/[0.04]'
                    : 'border-red-400/40 bg-red-400/[0.04]')
                }
              >
                <div className="flex items-start gap-3">
                  {c.pass ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden />
                  ) : (
                    <XCircle className="h-5 w-5 shrink-0 text-red-400" aria-hidden />
                  )}
                  <div>
                    <p
                      className={
                        'text-sm font-semibold ' + (c.pass ? 'text-cyan-100' : 'text-red-200')
                      }
                    >
                      {c.label}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{c.detail}</p>
                  </div>
                </div>
              </div>
            ))}

            <div
              className={
                'border p-5 ' +
                (allPass
                  ? 'border-cyan-300/55 bg-cyan-300/[0.07]'
                  : 'border-red-400/55 bg-red-400/[0.07]')
              }
              role="status"
              aria-live="polite"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Verifier verdict</p>
              <p
                className={
                  'mt-1 text-base font-semibold ' + (allPass ? 'text-cyan-100' : 'text-red-200')
                }
              >
                {allPass
                  ? 'Credential accepted · all four checks passed.'
                  : 'Credential rejected · at least one check failed.'}
              </p>
              {decoded && (
                <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                  Decoded payload available below for inspection. The same checks would apply to a
                  credential presented from any wallet to any relying party — no FCA-specific
                  infrastructure required.
                </p>
              )}
            </div>

            {decoded && (
              <div className="border border-white/10 bg-white/[0.02] p-5">
                <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">
                  Decoded payload (verified)
                </p>
                <pre className="bg-black/40 border border-white/5 p-4 text-[11px] font-mono leading-relaxed text-slate-200 overflow-x-auto whitespace-pre-wrap break-all">
{JSON.stringify(decoded.payload.vc, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default VerifierDemo;
