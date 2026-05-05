import { useCallback, useState } from 'react';
import { CheckCircle2, KeyRound, Loader2, ShieldCheck, XCircle, Copy, Check } from 'lucide-react';
import {
  generateIssuerKeyset,
  issueCredential,
  verifyCredential,
  shortenDid,
  type IssuerKeyset,
  type IssuedCredential,
  type VerificationResult,
} from '../lib/vc';
import { recordIssuance, useIssuanceCounter } from '../lib/issuanceCounter';
import { recordLastIssued } from '../lib/lastIssued';

type DemoState = 'idle' | 'issuing' | 'issued' | 'verifying' | 'verified';

const SAMPLE_SUBJECT_DID = 'did:example:resident-2418';
const SAMPLE_VC_TYPE = 'ResidentialIdentityCredential';
const SAMPLE_CLAIMS = {
  jurisdiction: 'JUR-04',
  enrollmentTier: 'Resident · Tier 2',
  issuedAt: 'Civic Office #12',
  reviewable: true,
};

/**
 * Live W3C Verifiable Credential demo.
 *
 * Generates a real Ed25519 keypair in-browser, issues a real JWT-VC
 * signed with that key, then verifies the signature locally.
 * No backend, no chain. The JWT it produces is a valid VC-JWT per
 * W3C VC Data Model 1.1 §6.3.1.
 */
export const IssuerDemo = () => {
  const [state, setState] = useState<DemoState>('idle');
  const [issuer, setIssuer] = useState<IssuerKeyset | null>(null);
  const [credential, setCredential] = useState<IssuedCredential | null>(null);
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const counter = useIssuanceCounter();

  const handleIssue = useCallback(async () => {
    setState('issuing');
    setVerification(null);
    setCredential(null);

    // Tiny artificial delay so the loading state is visible — keypair gen
    // itself is sub-millisecond. UX > raw speed for a demo.
    await new Promise((r) => setTimeout(r, 350));
    const keyset = generateIssuerKeyset();
    const cred = issueCredential(keyset, {
      subjectId: SAMPLE_SUBJECT_DID,
      subject: SAMPLE_CLAIMS,
      vcType: SAMPLE_VC_TYPE,
    });
    setIssuer(keyset);
    setCredential(cred);
    setState('issued');
    // Wire this real issuance into the live dashboard counter.
    recordIssuance();
    // Stash the JWT for the verifier demo to pick up below.
    recordLastIssued(cred.jwt);
  }, []);

  const handleVerify = useCallback(async () => {
    if (!credential || !issuer) return;
    setState('verifying');
    await new Promise((r) => setTimeout(r, 250));
    const result = verifyCredential(credential.jwt, issuer.publicKey);
    setVerification(result);
    setState('verified');
  }, [credential, issuer]);

  const handleReset = useCallback(() => {
    setState('idle');
    setIssuer(null);
    setCredential(null);
    setVerification(null);
    setCopied(false);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!credential) return;
    try {
      await navigator.clipboard.writeText(credential.jwt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API may be blocked; ignore — demo still works
    }
  }, [credential]);

  const handleTamperVerify = useCallback(async () => {
    if (!credential || !issuer) return;
    setState('verifying');
    await new Promise((r) => setTimeout(r, 250));
    // Flip the last byte of the signature segment
    const parts = credential.jwt.split('.');
    const sig = parts[2];
    const tampered = `${parts[0]}.${parts[1]}.${sig.slice(0, -1)}${sig.slice(-1) === 'A' ? 'B' : 'A'}`;
    const result = verifyCredential(tampered, issuer.publicKey);
    setVerification(result);
    setState('verified');
  }, [credential, issuer]);

  return (
    <section id="issuer-demo" className="border border-fc-gold/25 bg-[#020617]/70 p-6 md:p-8 my-10 scroll-mt-32">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-fc-gold">Live demo</p>
          <h3 className="text-2xl font-serif font-light text-white leading-tight">
            Issue a real verifiable credential.
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Generates a real Ed25519 issuer keypair in your browser, signs a W3C VC-JWT, and verifies
            the signature locally. No backend, no chain. The resulting JWT is interoperable with any
            standard VC verifier that supports <span className="font-mono text-cyan-300">EdDSA</span> and{' '}
            <span className="font-mono text-cyan-300">did:key</span>.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 border border-cyan-300/25 bg-cyan-300/[0.03] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" aria-hidden />
            Live · {counter.total.toLocaleString()} issued from this browser · feeds /dashboard
          </p>
        </div>
        {state !== 'idle' && (
          <button
            type="button"
            onClick={handleReset}
            className="self-start md:self-end border border-white/10 bg-white/[0.02] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.22em] text-slate-300 transition-colors hover:border-fc-gold/40 hover:text-white"
          >
            Reset
          </button>
        )}
      </div>

      {state === 'idle' && (
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr] md:items-start">
          <div className="border border-white/5 bg-white/[0.02] p-5">
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-slate-400">What happens when you click</p>
            <ol className="space-y-2 text-sm text-slate-300 leading-relaxed">
              <li>1. Generate Ed25519 keypair (32 random bytes via Web Crypto)</li>
              <li>2. Encode public key as <span className="font-mono text-cyan-300">did:key</span> with multibase + multicodec prefix</li>
              <li>3. Construct a VC payload (issuer, subject, claims) per W3C VC 1.1</li>
              <li>4. Sign as a JWT with EdDSA</li>
              <li>5. Decode + verify the signature locally</li>
            </ol>
          </div>
          <button
            type="button"
            onClick={handleIssue}
            className="group inline-flex h-full items-center justify-center gap-3 border border-fc-gold/30 bg-fc-gold/5 px-6 py-6 text-sm text-fc-gold transition-colors hover:border-fc-gold/55 hover:bg-fc-gold/10"
          >
            <KeyRound className="h-5 w-5" />
            <span className="font-mono uppercase tracking-[0.22em]">Issue credential</span>
          </button>
        </div>
      )}

      {state === 'issuing' && (
        <div className="flex items-center gap-3 border border-white/5 bg-white/[0.02] p-6 text-sm text-slate-300">
          <Loader2 className="h-5 w-5 animate-spin text-fc-gold" aria-hidden />
          Generating keypair, encoding did:key, building W3C VC payload, signing…
        </div>
      )}

      {(state === 'issued' || state === 'verifying' || state === 'verified') && credential && issuer && (
        <div className="space-y-4">
          {/* Issuer identity */}
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">Issuer DID (did:key, just generated)</p>
            <p className="font-mono text-[12px] text-white break-all leading-relaxed" title={issuer.did}>
              {issuer.did}
            </p>
            <p className="mt-3 text-[11px] text-slate-400 leading-relaxed">
              Public key embedded in the DID. Anyone can verify a credential signed by this DID with no external lookup —
              the key resolves from the DID itself.
            </p>
          </div>

          {/* Decoded payload */}
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">Credential payload (decoded)</p>
            <pre className="bg-black/40 border border-white/5 p-4 text-[11px] font-mono leading-relaxed text-slate-200 overflow-x-auto whitespace-pre-wrap break-all">
{JSON.stringify(credential.payload.vc, null, 2)}
            </pre>
          </div>

          {/* Raw JWT */}
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">Signed VC-JWT (transport format)</p>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-slate-300 transition-colors hover:border-fc-gold/40 hover:text-white"
              >
                {copied ? <Check className="h-3 w-3 text-fc-gold" /> : <Copy className="h-3 w-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="bg-black/40 border border-white/5 p-4 text-[10px] font-mono leading-relaxed text-slate-300 overflow-x-auto break-all whitespace-pre-wrap">
              {credential.jwt}
            </pre>
            <p className="mt-3 text-[11px] text-slate-400 leading-relaxed">
              Three base64url-encoded segments:{' '}
              <span className="font-mono text-cyan-300">header</span>.<span className="font-mono text-cyan-300">payload</span>.<span className="font-mono text-cyan-300">signature</span>{' '}
              — verifiable by any compliant VC verifier without contacting this site.
            </p>
          </div>

          {/* Verification action */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleVerify}
              disabled={state === 'verifying'}
              className="group inline-flex flex-1 items-center justify-center gap-2 border border-cyan-300/30 bg-cyan-300/5 px-5 py-3 text-sm text-cyan-200 transition-colors hover:border-cyan-300/55 hover:bg-cyan-300/10 disabled:opacity-60"
            >
              {state === 'verifying' ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <ShieldCheck className="h-4 w-4" />
              )}
              <span className="font-mono uppercase tracking-[0.22em]">Verify signature</span>
            </button>
            <button
              type="button"
              onClick={handleTamperVerify}
              disabled={state === 'verifying'}
              className="inline-flex flex-1 items-center justify-center gap-2 border border-white/10 bg-white/[0.02] px-5 py-3 text-sm text-slate-300 transition-colors hover:border-red-400/40 hover:text-white disabled:opacity-60"
            >
              <XCircle className="h-4 w-4" />
              <span className="font-mono uppercase tracking-[0.22em]">Try a tampered copy</span>
            </button>
          </div>

          {state === 'verified' && verification && (
            <div
              className={
                'border p-5 ' +
                (verification.valid
                  ? 'border-cyan-300/40 bg-cyan-300/5'
                  : 'border-red-400/40 bg-red-400/5')
              }
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                {verification.valid ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden />
                ) : (
                  <XCircle className="h-5 w-5 shrink-0 text-red-400" aria-hidden />
                )}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Verification result</p>
                  <p className={'mt-1 text-base font-semibold ' + (verification.valid ? 'text-cyan-200' : 'text-red-300')}>
                    {verification.valid ? 'Signature valid · credential authentic' : 'Signature mismatch · credential rejected'}
                  </p>
                  <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                    {verification.valid
                      ? `Verified against did:key public key (${shortenDid(issuer.did, 12, 6)}). The credential was signed by this issuer and has not been modified.`
                      : verification.reason
                        ? `Reason: ${verification.reason}. A flipped byte in the signature is enough to invalidate the credential — that's the whole point.`
                        : 'Signature could not be verified.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default IssuerDemo;
