import { defaultCommercialSettings, defaultHeroSettings, readJsonSetting, type CommercialSettings, type HeroSettings } from "@/lib/adminCommerce";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export type ManagedSettings = { commercial: CommercialSettings; hero: HeroSettings; isLoading: boolean };

export function useManagedSettings(): ManagedSettings {
  const [settings, setSettings] = useState<ManagedSettings>({ commercial: defaultCommercialSettings, hero: defaultHeroSettings, isLoading: true });
  useEffect(() => {
    let active = true;
    supabase.from("innovtech_site_settings").select("setting_key, setting_value").then(({ data }) => {
      if (!active) return;
      const values = new Map((data || []).map((setting) => [setting.setting_key, setting.setting_value]));
      setSettings({ commercial: readJsonSetting(values.get("commerce_settings"), defaultCommercialSettings), hero: readJsonSetting(values.get("home_hero"), defaultHeroSettings), isLoading: false });
    });
    return () => { active = false; };
  }, []);
  return settings;
}
