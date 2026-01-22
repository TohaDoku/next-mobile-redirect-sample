import { NextResponse } from 'next/server';

// Domains can be configured via env.
// In dev on localhost, the redirect is disabled by default.
const DESKTOP_HOST = process.env.DESKTOP_HOST || 'example.com';
const MOBILE_HOST = process.env.MOBILE_HOST || 'm.example.com';

function isLocalhost(host = '') {
  return host.startsWith('localhost') || host.startsWith('127.0.0.1');
}

function isMobileUA(ua = '') {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}

function normalizeCHValue(v = '') {
  // Client Hint headers often wrap values in quotes.
  return String(v).trim().replace(/^"|"$/g, '');
}

function isDesktopPlatformCH(platform = '') {
  const p = normalizeCHValue(platform).toLowerCase();
  // Common desktop platforms in Sec-CH-UA-Platform
  return p === 'windows' || p === 'macos' || p === 'linux' || p === 'chrome os';
}

function isLikelyDevtoolsEmulation(req, ua) {
  // In Chrome DevTools, changing UA to a mobile string often does NOT change
  // Sec-CH-UA-Platform (it stays "Windows"/"macOS"), so we can avoid redirecting.
  const chPlatform = req.headers.get('sec-ch-ua-platform') || '';
  const chMobile = req.headers.get('sec-ch-ua-mobile') || '';

  // If UA looks mobile, but CH platform says desktop, treat it as emulation.
  if (isMobileUA(ua) && isDesktopPlatformCH(chPlatform)) return true;

  // Another heuristic: UA says mobile, but CH says explicitly not mobile.
  // (Rare, but can happen depending on override settings.)
  if (isMobileUA(ua) && normalizeCHValue(chMobile) === '?0') return true;

  return false;
}

export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = (req.headers.get('host') || '').toLowerCase();
  const ua = req.headers.get('user-agent') || '';

  // Avoid redirect loops: don't redirect on the mobile host.
  if (host === MOBILE_HOST.toLowerCase()) return NextResponse.next();

  // In development on localhost, do nothing (easier to test).
  // You can still test by setting HOST in your hosts file and using a local proxy.
  if (isLocalhost(host)) return NextResponse.next();

  // Manual toggles:
  // ?desktop=1 -> set cookie prefer_desktop=1
  // ?mobile=1  -> remove cookie
  if (url.searchParams.get('desktop') === '1') {
    url.searchParams.delete('desktop');
    const res = NextResponse.redirect(url);
    res.cookies.set('prefer_desktop', '1', {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365
    });
    return res;
  }

  if (url.searchParams.get('mobile') === '1') {
    url.searchParams.delete('mobile');
    const res = NextResponse.redirect(url);
    res.cookies.delete('prefer_desktop', { path: '/' });
    return res;
  }

  // If user/device is pinned to desktop -> no redirect
  const preferDesktop = req.cookies.get('prefer_desktop')?.value === '1';
  if (preferDesktop) return NextResponse.next();

  // IMPORTANT:
  // If the site is opened on a desktop in DevTools device mode / UA override,
  // we should keep the desktop domain.
  if (isLikelyDevtoolsEmulation(req, ua)) return NextResponse.next();

  // Device memory Client Hint: often available in Chromium as `device-memory`.
  // Not available on many browsers (e.g. iOS Safari).
  const deviceMemoryRaw =
    req.headers.get('device-memory') ||
    req.headers.get('sec-ch-device-memory') ||
    '';

  const deviceMemory = parseFloat(deviceMemoryRaw);
  const isHighMemory = Number.isFinite(deviceMemory) && deviceMemory > 10;

  const isMobile = isMobileUA(ua);

  // Redirect only if mobile AND NOT high-memory
  if (isMobile && !isHighMemory) {
    const redirectUrl = new URL(req.url);
    redirectUrl.hostname = MOBILE_HOST;

    // If you use different protocols, uncomment:
    // redirectUrl.protocol = 'https:';

    return NextResponse.redirect(redirectUrl, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'
  ]
};
