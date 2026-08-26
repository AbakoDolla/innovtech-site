import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CookieConsent = {
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "innovtech-cookie-consent";

export function parseCookieConsent(value: string | null): CookieConsent | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<CookieConsent>;
    if (typeof parsed.preferences !== "boolean" || typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") return null;
    return { preferences: parsed.preferences, analytics: parsed.analytics, marketing: parsed.marketing, updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "" };
  } catch {
    return null;
  }
}

type CookieConsentContextValue = {
  consent: CookieConsent | null;
  preferencesOpen: boolean;
  saveConsent: (choices: Omit<CookieConsent, "updatedAt">) => void;
  openPreferences: () => void;
  closePreferences: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(() => parseCookieConsent(localStorage.getItem(STORAGE_KEY)));
  const [preferencesOpen, setPreferencesOpen] = useState(() => !consent);

  const saveConsent = (choices: Omit<CookieConsent, "updatedAt">) => {
    const next = { ...choices, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setConsent(next);
    setPreferencesOpen(false);
  };

  const value = useMemo(() => ({ consent, preferencesOpen, saveConsent, openPreferences: () => setPreferencesOpen(true), closePreferences: () => setPreferencesOpen(false) }), [consent, preferencesOpen]);
  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return context;
}
