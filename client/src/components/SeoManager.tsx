import { useEffect } from "react";
import type { Lang } from "@/lib/site";
import { absoluteUrl, getSeoPage } from "@/lib/seo";

function setMeta(selector: string, content: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
}

export function SeoManager({ location, lang }: { location: string; lang: Lang }) {
  useEffect(() => {
    const seo = getSeoPage(location, lang);
    const canonicalUrl = absoluteUrl(seo.canonicalPath);
    document.title = seo.title;
    setMeta('meta[name="description"]', seo.description);
    setMeta('meta[property="og:title"]', seo.title);
    setMeta('meta[property="og:description"]', seo.description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[name="twitter:title"]', seo.title);
    setMeta('meta[name="twitter:description"]', seo.description);
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = canonicalUrl;

    const schema = { "@context": "https://schema.org", "@type": seo.type === "product" ? "Product" : "WebPage", name: seo.title, description: seo.description, url: canonicalUrl, inLanguage: lang };
    let script = document.getElementById("innovtech-page-schema") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "innovtech-page-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [lang, location]);

  return null;
}
