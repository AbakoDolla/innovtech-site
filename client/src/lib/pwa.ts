export function isStandalonePwa(displayModeMatches: boolean, legacyStandalone = false) {
  return displayModeMatches || legacyStandalone;
}

export function shouldUseAdminManifest(pathname: string) {
  return pathname.startsWith("/admin");
}

export function registerPwaServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => { void navigator.serviceWorker.register("/service-worker.js"); }, { once: true });
}
