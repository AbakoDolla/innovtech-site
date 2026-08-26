/** InnovTech design reminder: global layout supports a bilingual, high-trust technology storefront with humane WhatsApp conversion. */
import { Suspense, useEffect, useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { localMediaSrc, type Lang } from "./lib/site";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazyWithRetry } from "@/lib/lazyWithRetry";
import { revealPageSections } from "@/lib/pageVisibility";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const MediaManager = lazyWithRetry(() => import("./pages/MediaManager"));

function PageLoader() {
  return <div className="grid min-h-[45vh] place-items-center" role="status" aria-live="polite"><span className="h-9 w-9 animate-spin rounded-full border-2 border-blue-100 border-t-blue-700" /><span className="sr-only">Chargement…</span></div>;
}

function Router({ lang }: { lang: Lang }) {
  return <Suspense fallback={<PageLoader />}><Switch>
    <Route path="/">{() => <Home lang={lang} />}</Route>
    <Route path="/boutique">{() => <Shop lang={lang} />}</Route>
    <Route path="/boutique/:id">{(params) => <ProductDetail lang={lang} productId={params.id} />}</Route>
    <Route path="/services">{() => <Services lang={lang} />}</Route>
    <Route path="/a-propos">{() => <About lang={lang} />}</Route>
    <Route path="/contact">{() => <Contact lang={lang} />}</Route>
    <Route path="/admin/media">{() => <MediaManager />}</Route>
    <Route>{() => <NotFound />}</Route>
  </Switch></Suspense>;
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
    const frame = window.requestAnimationFrame(() => revealPageSections());
    const fallback = window.setTimeout(revealPageSections, 500);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
    };
  }, [location]);

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
    const recoverImage = (event: Event) => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement) || image.dataset.localFallback === "true") return;
      const pathname = new URL(image.src, window.location.origin).pathname;
      const fallback = localMediaSrc(pathname);
      if (fallback !== pathname) {
        image.dataset.localFallback = "true";
        image.src = fallback;
      }
    };
    document.addEventListener("error", recoverImage, true);
    return () => { observer.disconnect(); mutations.disconnect(); window.removeEventListener("scroll", updateProgress); window.removeEventListener("resize", updateProgress); document.removeEventListener("error", recoverImage, true); };
  }, []);

  return <ErrorBoundary><TooltipProvider><div className="min-h-screen overflow-x-hidden bg-white dark:bg-[#081426]"><div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />{!isAdminRoute && <SiteHeader lang={lang} onLanguageChange={setLang} />}<Router lang={lang} />{!isAdminRoute && <><SiteFooter lang={lang} /><FloatingWhatsApp lang={lang} /></>}</div><Toaster /></TooltipProvider></ErrorBoundary>;
}

export default App;
