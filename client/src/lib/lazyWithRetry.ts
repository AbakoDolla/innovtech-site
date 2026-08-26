import { lazy, type ComponentType } from "react";

const RETRY_KEY = "innovtech-chunk-reload";

/** Reloads once when an older mobile tab still points to a removed Vite chunk after a deployment. */
export function lazyWithRetry<T extends ComponentType<any>>(factory: () => Promise<{ default: T }>) {
  return lazy(async () => {
    try {
      const module = await factory();
      if (typeof window !== "undefined") sessionStorage.removeItem(RETRY_KEY);
      return module;
    } catch (error) {
      if (typeof window !== "undefined" && !sessionStorage.getItem(RETRY_KEY)) {
        sessionStorage.setItem(RETRY_KEY, "1");
        window.location.reload();
        return new Promise<never>(() => undefined);
      }
      throw error;
    }
  });
}
