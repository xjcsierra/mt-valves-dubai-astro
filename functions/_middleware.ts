/**
 * Cloudflare Pages Function: edge middleware.
 *
 * Protects the /team/* area with HTTP Basic Authentication.
 * Credentials are read from environment variables configured in the
 * Cloudflare Pages dashboard (Settings → Environment variables), NOT from
 * this repository. Do NOT commit secrets in this file.
 *
 * Required env vars:
 *   TEAM_USER     - basic-auth username (e.g. admin)
 *   TEAM_PASSWORD - basic-auth password (set as a Secret)
 *
 * All other routes pass through untouched.
 */

interface Env {
  TEAM_USER?: string;
  TEAM_PASSWORD?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Only guard the private team area.
  if (!url.pathname.startsWith('/team')) {
    return next();
  }

  const expectedUser = env.TEAM_USER || '';
  const expectedPass = env.TEAM_PASSWORD || '';

  // If credentials are not configured, refuse access entirely (fail closed).
  if (!expectedUser || !expectedPass) {
    return new Response('Team area is not configured. Set TEAM_USER and TEAM_PASSWORD in Cloudflare Pages environment variables.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
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
      'WWW-Authenticate': 'Basic realm="MT Team Area", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
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
