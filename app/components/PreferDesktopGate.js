'use client';

import { useEffect } from 'react';

function getWebGLRenderer() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return '';

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return '';

    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    return String(renderer || '');
  } catch {
    return '';
  }
}

function setCookie(name, value, days = 365) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export default function PreferDesktopGate() {
  useEffect(() => {
    // If already pinned, do nothing.
    if (document.cookie.includes('prefer_desktop=1')) return;

    const mem = typeof navigator !== 'undefined' ? navigator.deviceMemory : undefined;
    const renderer = getWebGLRenderer();

    // Heuristic for "desktop/discrete" GPU in renderer string.
    // You can expand this list for your audience.
    const looksDesktopGPU = /NVIDIA|GeForce|RTX|GTX|AMD|Radeon|RX\s?\d+|Intel\(R\)\s?Arc/i.test(renderer);

    const hasHighMem = typeof mem === 'number' && mem > 10;

    // If device looks powerful, pin desktop.
    if (hasHighMem && looksDesktopGPU) {
      setCookie('prefer_desktop', '1', 365);
    }
  }, []);

  return null;
}
