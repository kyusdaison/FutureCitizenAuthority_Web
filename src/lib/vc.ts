/**
 * Minimal W3C Verifiable Credential primitives — JWT format.
 *
 * Real cryptography (Ed25519 via @noble/ed25519). Real DID:key
 * encoding. Real JWT signing and verification. No backend, no chain.
 *
 * The output JWT is a valid VC-JWT per W3C VC Data Model 1.1 §6.3.1
 * and can be verified by any standard VC verifier that supports
 * Ed25519 + did:key.
 *
 * Used by /identity's Issuer demo to show institutional buyers a
 * working credential issuance and verification, not a mock.
 */
import * as ed from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha512';

// @noble/ed25519 v2 needs an async hash configured for the sync API
ed.etc.sha512Sync = (...m: Uint8Array[]) => sha512(ed.etc.concatBytes(...m));

// ---- base64url helpers ----------------------------------------------------

const b64uEncode = (bytes: Uint8Array): string => {
  const bin = String.fromCharCode(...bytes);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const b64uEncodeJson = (obj: unknown): string =>
  b64uEncode(new TextEncoder().encode(JSON.stringify(obj)));

const b64uDecode = (s: string): Uint8Array => {
  const padded = s.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice((s.length + 2) % 4);
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
};

const b64uDecodeJson = <T = unknown>(s: string): T =>
  JSON.parse(new TextDecoder().decode(b64uDecode(s))) as T;

// ---- multibase / multicodec for did:key ----------------------------------
//
// did:key spec: https://w3c-ccg.github.io/did-method-key/
// Format: did:key:z<multibase-base58btc(multicodec(0xed01) || pubkey)>

// Multicodec varint prefix for ed25519-pub (0xed) — encoded as 2-byte varint 0xed 0x01
const ED25519_PUB_MULTICODEC = new Uint8Array([0xed, 0x01]);

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

function base58btcEncode(bytes: Uint8Array): string {
  // Standard base58btc encoding. We don't expect leading zero bytes here
  // since the multicodec prefix 0xed makes that impossible.
  let n = 0n;
  for (const b of bytes) n = n * 256n + BigInt(b);
  let out = '';
  while (n > 0n) {
    const r = Number(n % 58n);
    n = n / 58n;
    out = BASE58_ALPHABET[r] + out;
  }
  return out;
}

function publicKeyToDidKey(pubKey: Uint8Array): string {
  const buf = new Uint8Array(ED25519_PUB_MULTICODEC.length + pubKey.length);
  buf.set(ED25519_PUB_MULTICODEC, 0);
  buf.set(pubKey, ED25519_PUB_MULTICODEC.length);
  return `did:key:z${base58btcEncode(buf)}`;
}

// ---- public API ----------------------------------------------------------

export interface IssuerKeyset {
  publicKey: Uint8Array;
  privateKey: Uint8Array;
  did: string; // did:key
  kid: string; // key id (did + #fragment)
}

export interface CredentialClaims {
  /** Subject DID or identifier */
  subjectId: string;
  /** Claim payload (cardholder, role, jurisdiction, etc.) */
  subject: Record<string, unknown>;
  /** VC type after VerifiableCredential — e.g. ResidentialIdentity */
  vcType: string;
}

export interface IssuedCredential {
  jwt: string;
  payload: VcJwtPayload;
  header: { alg: string; typ: string; kid: string };
  signatureBytes: Uint8Array;
}

export interface VcJwtPayload {
  iss: string;
  sub: string;
  iat: number;
  jti: string;
  vc: {
    '@context': string[];
    type: string[];
    credentialSubject: Record<string, unknown>;
    issuer: string;
    issuanceDate: string;
  };
}

export function generateIssuerKeyset(): IssuerKeyset {
  // Random 32-byte private key
  const privateKey = ed.utils.randomPrivateKey();
  const publicKey = ed.getPublicKey(privateKey);
  const did = publicKeyToDidKey(publicKey);
  return { publicKey, privateKey, did, kid: `${did}#${did.split(':').pop()}` };
}

function randomJti(): string {
  // 16 random bytes, hex-encoded
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function issueCredential(issuer: IssuerKeyset, claims: CredentialClaims): IssuedCredential {
  const now = Math.floor(Date.now() / 1000);
  const jti = `urn:uuid:${randomJti()}`;
  const issuanceDate = new Date(now * 1000).toISOString();

  const vcPayload: VcJwtPayload = {
    iss: issuer.did,
    sub: claims.subjectId,
    iat: now,
    jti,
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential', claims.vcType],
      credentialSubject: { id: claims.subjectId, ...claims.subject },
      issuer: issuer.did,
      issuanceDate,
    },
  };

  const header = { alg: 'EdDSA', typ: 'JWT', kid: issuer.kid };
  const headerB64 = b64uEncodeJson(header);
  const payloadB64 = b64uEncodeJson(vcPayload);
  const signingInput = `${headerB64}.${payloadB64}`;
  const signatureBytes = ed.sign(new TextEncoder().encode(signingInput), issuer.privateKey);
  const jwt = `${signingInput}.${b64uEncode(signatureBytes)}`;

  return { jwt, payload: vcPayload, header, signatureBytes };
}

export interface DecodedJwt {
  header: { alg: string; typ?: string; kid?: string };
  payload: VcJwtPayload;
  signature: Uint8Array;
  signingInput: string;
}

export function decodeJwt(jwt: string): DecodedJwt {
  const parts = jwt.split('.');
  if (parts.length !== 3) throw new Error('Malformed JWT — expected 3 segments');
  const [headerB64, payloadB64, sigB64] = parts;
  return {
    header: b64uDecodeJson(headerB64),
    payload: b64uDecodeJson(payloadB64),
    signature: b64uDecode(sigB64),
    signingInput: `${headerB64}.${payloadB64}`,
  };
}

export interface VerificationResult {
  valid: boolean;
  reason?: string;
}

export function verifyCredential(jwt: string, publicKey: Uint8Array): VerificationResult {
  let decoded: DecodedJwt;
  try {
    decoded = decodeJwt(jwt);
  } catch (e) {
    return { valid: false, reason: `decode failed: ${(e as Error).message}` };
  }
  if (decoded.header.alg !== 'EdDSA') {
    return { valid: false, reason: `unsupported alg: ${decoded.header.alg}` };
  }
  try {
    const ok = ed.verify(decoded.signature, new TextEncoder().encode(decoded.signingInput), publicKey);
    return ok ? { valid: true } : { valid: false, reason: 'signature mismatch' };
  } catch (e) {
    return { valid: false, reason: `verify error: ${(e as Error).message}` };
  }
}

// ---- helpers for UI display ----------------------------------------------

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function shortenDid(did: string, head = 16, tail = 8): string {
  if (did.length <= head + tail + 1) return did;
  return `${did.slice(0, head)}…${did.slice(-tail)}`;
}
