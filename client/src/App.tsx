/** InnovTech design reminder: global layout supports a bilingual, high-trust technology storefront with humane WhatsApp conversion. */
import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import type { Lang } from "./lib/site";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MediaManager from "./pages/MediaManager";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function Router({ lang }: { lang: Lang }) {
  return <Switch>
    <Route path="/">{() => <Home lang={lang} />}</Route>
    <Route path="/boutique">{() => <Shop lang={lang} />}</Route>
    <Route path="/boutique/:id">{(params) => <ProductDetail lang={lang} productId={params.id} />}</Route>
    <Route path="/services">{() => <Services lang={lang} />}</Route>
    <Route path="/a-propos">{() => <About lang={lang} />}</Route>
    <Route path="/contact">{() => <Contact lang={lang} />}</Route>
    <Route path="/admin/media">{() => <MediaManager />}</Route>
    <Route>{() => <NotFound />}</Route>
  </Switch>;
}

function App() {
  const [location] = useLocation();
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("innovtech-language") === "en" ? "en" : "fr"));
  const isAdminRoute = location.startsWith("/admin");
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    localStorage.setItem("innovtech-language", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    const observeSections = () => document.querySelectorAll("main section, main article").forEach((element) => observer.observe(element));
    const mutations = new MutationObserver(observeSections);
    observeSections();
    mutations.observe(document.body, { childList: true, subtree: true });
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => { observer.disconnect(); mutations.disconnect(); window.removeEventListener("scroll", updateProgress); window.removeEventListener("resize", updateProgress); };
  }, []);

  return <ErrorBoundary><TooltipProvider><div className="min-h-screen overflow-x-hidden bg-white"><div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />{!isAdminRoute && <SiteHeader lang={lang} onLanguageChange={setLang} />}<Router lang={lang} />{!isAdminRoute && <><SiteFooter lang={lang} /><FloatingWhatsApp lang={lang} /></>}</div><Toaster /></TooltipProvider></ErrorBoundary>;
}

export default App;
