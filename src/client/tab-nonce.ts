/**
 * Secure-context-proof id minting for built-in tabs.
 *
 * `crypto.randomUUID` exists only in secure contexts: opening a side chat or
 * a bottom terminal from a plain-HTTP LAN address (a wildcard bind reached
 * via the machine's IP) crashed the tab slot with "crypto.randomUUID is not
 * a function" (fork fix 4d0ce349, re-ported over the official v0.32.1 line).
 * Same uuid-when-available / time-based fallback idiom as
 * {@link newCustomEditorId} in open-with.ts.
 */

/** One tab id fragment: uuid when available, time-based fallback. */
export function newTabNonce(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`
}
