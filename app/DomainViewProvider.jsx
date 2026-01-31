"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const DEBUG = process.env.NEXT_PUBLIC_REDIRECT_DEBUG === "1";

/**
 * view:
 *  - 'white' => показываем <White />
 *  - 'seo'   => показываем <MainBlockSeo />
 */
const DomainViewContext = createContext({
  view: "white",
  checking: true,
  debugInfo: null,
});

export function useDomainView() {
  return useContext(DomainViewContext);
}

// --- helpers ---
function getUA() {
  try {
    return navigator.userAgent || "";
  } catch {
    return "";
  }
}
function getUAD() {
  try {
    return navigator.userAgentData || null;
  } catch {
    return null;
  }
}
function isYandexBrowser(ua) {
  return /YandexBrowserCorp|YaBrowser|YandexBrowser/i.test(ua);
}
function isLikelyMobileByUA(ua) {
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}
function getPlatform(uad) {
  if (uad && typeof uad.platform === "string" && uad.platform) return uad.platform;
  try {
    return navigator.platform || "";
  } catch {
    return "";
  }
}
function isProbablyIPad(ua, platform) {
  const plat = String(platform || "");
  const isMacLike = /Mac/i.test(plat) || /Macintosh/i.test(ua);
  const hasTouch = (navigator.maxTouchPoints || 0) > 1;
  const hasMobileToken = /Mobile/i.test(ua);
  return isMacLike && hasTouch && hasMobileToken;
}
function isDesktopPlatform(platform, ua) {
  const p = String(platform).toLowerCase();

  if (isProbablyIPad(ua, platform)) return false;

  const looksDesktop =
    p.includes("win") ||
    p.includes("mac") ||
    p.includes("darwin") ||
    p.includes("cros") ||
    p === "linux" ||
    p.includes("x11");

  if (/android/i.test(ua) || /iphone|ipad|ipod/i.test(ua)) return false;
  if (p.includes("android") || p.includes("ios")) return false;

  return looksDesktop;
}
function isMobileLike(uad, ua, platform) {
  if (uad && typeof uad.mobile === "boolean") return uad.mobile;

  if (isProbablyIPad(ua, platform)) return true;
  if (isLikelyMobileByUA(ua)) return true;

  const touch = (navigator.maxTouchPoints || 0) > 1;
  const w = window.screen?.width || 0;
  const h = window.screen?.height || 0;
  const minSide = Math.min(w, h);

  return touch && minSide > 0 && minSide <= 900;
}
function getWebGLRenderer() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return "";
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    if (!dbg) return "";
    const renderer = gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL);
    return String(renderer || "");
  } catch {
    return "";
  }
}
function looksLikeDesktopGPU(renderer) {
  return /NVIDIA|GeForce|RTX|GTX|Quadro|AMD|Radeon|RX\s?\d+|Intel\(R\)\s?Arc/i.test(renderer);
}
function getQueryParam(name) {
  try {
    return new URLSearchParams(window.location.search).get(name);
  } catch {
    return null;
  }
}
function setCookie(name, value, maxAgeSeconds = 60 * 60 * 24 * 365) {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
}
function deleteCookie(name) {
  document.cookie = `${encodeURIComponent(name)}=; Path=/; Max-Age=0; SameSite=Lax`;
}
function getCookie(name) {
  const n = encodeURIComponent(name) + "=";
  return document.cookie
    .split(";")
    .map((c) => c.trim())
    .filter((c) => c.startsWith(n))
    .map((c) => decodeURIComponent(c.slice(n.length)))[0];
}

function FullscreenLoader({ show, withDebug, debugInfo }) {
  if (!show && !(withDebug && debugInfo)) return null;

  return (
    <>
      <style>{`
        @keyframes gateSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .gateSpinner { animation: none !important; }
        }
      `}</style>

      {show && (
        <div
          aria-live="polite"
          aria-busy="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            display: "grid",
            placeItems: "center",
            background: "#ffffff",
          }}
        >
          <div style={{ display: "grid", placeItems: "center", gap: 10 }}>
            <div
              className="gateSpinner"
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                border: "6px solid rgba(15, 23, 42, 0.12)",
                borderTopColor: "#facc15",
                animation: "gateSpin 0.9s linear infinite",
              }}
            />
            <div style={{ fontSize: 13, color: "rgba(15, 23, 42, 0.7)" }}>
              Загружаем страницу…
            </div>
          </div>
        </div>
      )}

      {withDebug && debugInfo && (
        <div
          style={{
            position: "fixed",
            bottom: 12,
            right: 12,
            zIndex: 1000000,
            width: 360,
            maxWidth: "calc(100vw - 24px)",
            background: "rgba(0,0,0,0.85)",
            color: "white",
            padding: 12,
            borderRadius: 12,
            fontSize: 12,
            lineHeight: 1.35,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 6 }}>
            Gate debug: {debugInfo.decision}
          </div>

          <div style={{ opacity: 0.9, marginBottom: 8 }}>
            <div>
              <b>platform:</b> {String(debugInfo.platform)}
            </div>
            <div>
              <b>deviceMemory:</b> {String(debugInfo.mem)}
            </div>
          </div>

          <div style={{ marginBottom: 8 }}>
            <b>reasons:</b>
            <ul style={{ margin: "6px 0 0 16px", padding: 0 }}>
              {debugInfo.reasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <details style={{ opacity: 0.85 }}>
            <summary style={{ cursor: "pointer" }}>UA</summary>
            <div style={{ marginTop: 6, wordBreak: "break-word" }}>{debugInfo.ua}</div>
          </details>
        </div>
      )}
    </>
  );
}

export default function DomainViewProvider({ children }) {
  const [checking, setChecking] = useState(true);
  const [view, setView] = useState("white");
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    const ua = getUA();
    const uad = getUAD();
    const platform = getPlatform(uad);
    const reasons = [];

    const finalize = (nextView, decisionLabel) => {
      setView(nextView);
      setChecking(false);

      if (DEBUG) {
        const mem = typeof navigator.deviceMemory === "number" ? navigator.deviceMemory : null;
        setDebugInfo({
          decision: decisionLabel,
          reasons,
          ua,
          platform,
          mem,
          uad,
        });
      }
    };

    // --- ручные переключатели ---
    const desktopParam = getQueryParam("desktop");
    const mobileParam = getQueryParam("mobile");

    if (desktopParam === "1") {
      setCookie("prefer_desktop", "1");
      const url = new URL(window.location.href);
      url.searchParams.delete("desktop");
      window.history.replaceState({}, "", url.toString());
      reasons.push("query desktop=1 => set prefer_desktop cookie => show WHITE");
      finalize("white", "force_white(desktop=1)");
      return;
    }

    if (mobileParam === "1") {
      deleteCookie("prefer_desktop");
      const url = new URL(window.location.href);
      url.searchParams.delete("mobile");
      window.history.replaceState({}, "", url.toString());
      reasons.push("query mobile=1 => clear prefer_desktop cookie => show SEO");
      finalize("seo", "force_seo(mobile=1)");
      return;
    }

    // --- закрепление ПК ---
    if (getCookie("prefer_desktop") === "1") {
      reasons.push("cookie prefer_desktop=1 => show WHITE");
      finalize("white", "prefer_desktop_cookie");
      return;
    }

    // --- Яндекс.Браузер всегда ПК ---
    if (isYandexBrowser(ua)) {
      reasons.push("YandexBrowser detected => show WHITE");
      finalize("white", "yandex_keep_white");
      return;
    }

    // --- любой десктоп (включая DevTools device toolbar) ---
    if (isDesktopPlatform(platform, ua)) {
      reasons.push(`desktop platform detected (${platform}) => show WHITE`);
      finalize("white", "desktop_platform_white");
      return;
    }

    // --- далее: мобильное/планшет ---
    const mobileLike = isMobileLike(uad, ua, platform);
    if (!mobileLike) {
      reasons.push("not mobile-like => show WHITE");
      finalize("white", "not_mobile_like_white");
      return;
    }

    // --- исключение: мощная мобилка + десктопная GPU ---
    const mem = typeof navigator.deviceMemory === "number" ? navigator.deviceMemory : null;
    const isHighMem = typeof mem === "number" && mem > 10;

    let renderer = null;
    let desktopGpu = false;

    if (isHighMem) {
      renderer = getWebGLRenderer();
      desktopGpu = looksLikeDesktopGPU(renderer);
    }

    if (isHighMem && desktopGpu) {
      reasons.push(`mobile but deviceMemory=${mem}>10 and desktop GPU => show WHITE`);
      if (DEBUG) {
        setDebugInfo({
          decision: "high_mem_desktop_gpu_white",
          reasons,
          ua,
          platform,
          mem,
          renderer,
          uad,
        });
      }
      setView("white");
      setChecking(false);
      return;
    }

    // --- иначе (то, что раньше было redirect_mobile) ---
    reasons.push("real mobile (no desktop exceptions) => show SEO (instead of redirect)");
    finalize("seo", "mobile_show_seo");
  }, []);

  const ctxValue = useMemo(
    () => ({ view, checking, debugInfo }),
    [view, checking, debugInfo]
  );

  return (
    <DomainViewContext.Provider value={ctxValue}>
      <FullscreenLoader show={checking} withDebug={DEBUG} debugInfo={debugInfo} />
      {children}
    </DomainViewContext.Provider>
  );
}
