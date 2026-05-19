/**
 * Cloudflare Pages Function: edge middleware.
 *
 * Protects the entire site with HTTP Basic Authentication when accessed
 * via the preview hostname (preview.mtme.ae). The public hostname
 * (mtme.ae and www.mtme.ae) is always accessible without auth.
 *
 * Credentials are read from environment variables configured in the
 * Cloudflare Pages dashboard (Settings -> Environment variables), NOT
 * from this repository. Do NOT commit secrets in this file.
 *
 * Required env vars (set in Cloudflare Pages):
 *   PREVIEW_USER     - basic-auth username (e.g. mt-team)
 *   PREVIEW_PASSWORD - basic-auth password (set as a Secret)
 *
 * Hostnames that are PROTECTED:
 *   - preview.mtme.ae   (full site behind basic-auth)
 *
 * Hostnames that are PUBLIC:
 *   - mtme.ae           (no auth)
 *   - www.mtme.ae       (no auth)
 *   - *.pages.dev       (no auth - Cloudflare preview deploys)
 */
interface Env {
  PREVIEW_USER?: string;
  PREVIEW_PASSWORD?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase();

  // Only protect the preview hostname. Public hostnames pass through.
  if (hostname !== 'preview.mtme.ae') {
    return next();
  }

  const expectedUser = env.PREVIEW_USER || '';
  const expectedPass = env.PREVIEW_PASSWORD || '';

  // If credentials are not configured, refuse access entirely (fail closed).
  if (!expectedUser || !expectedPass) {
    return new Response(
      'Preview area is not configured. Set PREVIEW_USER and PREVIEW_PASSWORD in Cloudflare Pages environment variables.',
      {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      }
    );
  }

  const auth = request.headers.get('Authorization') || '';
  const [scheme, encoded] = auth.split(' ');

  if (scheme === 'Basic' && encoded) {
    let decoded = '';
    try {
      decoded = atob(encoded);
    } catch {
      decoded = '';
    }
    const idx = decoded.indexOf(':');
    const user = idx >= 0 ? decoded.slice(0, idx) : '';
    const pass = idx >= 0 ? decoded.slice(idx + 1) : '';

    if (timingSafeEqual(user, expectedUser) && timingSafeEqual(pass, expectedPass)) {
      return next();
    }
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="MT Middle East Preview", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
};

/** Constant-time string compare to avoid timing attacks. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
