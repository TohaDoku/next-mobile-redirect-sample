# Next.js sample: redirect mobile users to a mobile domain (with exceptions)

This is a minimal **App Router** Next.js project (JavaScript, no TypeScript) that demonstrates:

- `middleware.js` redirecting **mobile** User-Agents to a **mobile domain**
- **NOT** redirecting if:
  - `device-memory` Client Hint is **> 10 GB** (when available)
  - a cookie `prefer_desktop=1` is set (manual toggle or client-side GPU check)
  - the request looks like **desktop DevTools device emulation / UA override** (mobile UA but desktop Client Hints)

## 1) Install & run

```bash
npm i
npm run dev
```

## 2) Configure domains (production)

Copy `.env.example` to `.env.local` and set your domains:

```bash
DESKTOP_HOST=example.com
MOBILE_HOST=m.example.com
```

> Note: In dev on `localhost` the middleware redirect is disabled by default.

## 3) Manual toggles

- `?desktop=1` sets cookie `prefer_desktop=1` and keeps the user on the desktop domain
- `?mobile=1` clears the cookie and allows redirect again

## 4) About GPU / RAM detection

- Middleware **cannot** reliably detect GPU.
- `device-memory` header is **not** sent by all browsers (e.g. iOS Safari).
- Client component `app/components/PreferDesktopGate.js` checks `navigator.deviceMemory` and WebGL renderer and pins desktop by cookie.

Adjust heuristics for your needs.
