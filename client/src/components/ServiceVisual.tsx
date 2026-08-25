import { BarChart3, Braces, Code2, LayoutPanelTop, Smartphone, Sparkles } from "lucide-react";
import type { Lang } from "@/lib/site";

type ServiceVisualProps = {
  kind: "site-web" | "app-web" | "app-mobile";
  lang: Lang;
};

const labels = {
  "site-web": { fr: "Illustration d’un site web moderne", en: "Modern website illustration" },
  "app-web": { fr: "Illustration d’une application web", en: "Web application illustration" },
  "app-mobile": { fr: "Illustration d’une application mobile", en: "Mobile application illustration" },
} as const;

export function ServiceVisual({ kind, lang }: ServiceVisualProps) {
  if (kind === "site-web") {
    return (
      <div className="service-visual" role="img" aria-label={labels[kind][lang]}>
        <div className="service-orbit service-orbit--one" />
        <div className="service-board service-float">
          <div className="service-toolbar"><span /><span /><span /></div>
          <div className="service-web-layout"><div className="service-web-copy"><span /><span /><span /></div><div className="service-web-graphic"><Sparkles className="h-7 w-7" /></div></div>
          <div className="service-web-cards"><i /><i /><i /></div>
        </div>
        <div className="service-chip service-chip--website"><LayoutPanelTop className="h-4 w-4" /><span>UI</span></div>
      </div>
    );
  }

  if (kind === "app-web") {
    return (
      <div className="service-visual" role="img" aria-label={labels[kind][lang]}>
        <div className="service-orbit service-orbit--two" />
        <div className="service-dashboard service-float service-float--slow">
          <div className="service-toolbar"><span /><span /><span /></div>
          <div className="service-dashboard-grid"><aside><Braces className="h-5 w-5" /><span /><span /><span /></aside><div><div className="service-dashboard-title"><span /><em /></div><div className="service-chart"><b /><b /><b /><b /><b /></div></div></div>
        </div>
        <div className="service-chip service-chip--dashboard"><BarChart3 className="h-4 w-4" /><span>DATA</span></div>
      </div>
    );
  }

  return (
    <div className="service-visual" role="img" aria-label={labels[kind][lang]}>
      <div className="service-orbit service-orbit--three" />
      <div className="service-phone service-float">
        <div className="service-phone-notch" />
        <div className="service-phone-screen"><div className="service-mobile-top"><span /><span /></div><div className="service-mobile-map"><i /><i /><i /></div><div className="service-mobile-list"><span /><span /></div></div>
      </div>
      <div className="service-chip service-chip--mobile"><Smartphone className="h-4 w-4" /><span>APP</span></div>
      <div className="service-code-pill"><Code2 className="h-3.5 w-3.5" /> <span>01</span></div>
    </div>
  );
}
