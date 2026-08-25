/** InnovTech design reminder: global layout supports a bilingual, high-trust technology storefront with humane WhatsApp conversion. */
import { useEffect, useState } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import type { Lang } from "./lib/site";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
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
    <Route>{() => <NotFound />}</Route>
  </Switch>;
}

function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("innovtech-language") === "en" ? "en" : "fr"));
  useEffect(() => {
    localStorage.setItem("innovtech-language", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return <ErrorBoundary><TooltipProvider><div className="min-h-screen overflow-x-hidden bg-white"><SiteHeader lang={lang} onLanguageChange={setLang} /><Router lang={lang} /><SiteFooter lang={lang} /></div><Toaster /></TooltipProvider></ErrorBoundary>;
}

export default App;
