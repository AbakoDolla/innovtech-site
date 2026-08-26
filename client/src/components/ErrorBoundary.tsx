import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    const staleChunk = /loading chunk|dynamically imported module|importing a module script failed|failed to fetch dynamically imported module/i.test(error.message);
    const recoveryKey = "innovtech-boundary-refresh";
    if (staleChunk && !sessionStorage.getItem(recoveryKey)) {
      sessionStorage.setItem(recoveryKey, "1");
      window.location.reload();
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F8FF] p-6">
        <div className="w-full max-w-lg rounded-[2rem] border border-blue-100 bg-white p-8 text-center shadow-[0_24px_56px_rgba(20,68,145,0.12)] sm:p-10">
          <AlertTriangle size={48} className="mx-auto mb-6 text-blue-700" />
          <p className="eyebrow">InnovTech</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.05em] text-[#081A3C]">Cette page se met à jour.</h2>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-600">Une version récente du site vient peut-être d’être publiée. Actualisez la page pour retrouver la boutique et les autres contenus.</p>
          <button type="button" onClick={() => window.location.reload()} className="mx-auto mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_26px_rgba(18,103,243,0.22)] transition hover:bg-blue-800 active:scale-[0.97]">
            <RotateCcw size={16} />Actualiser la page
          </button>
          <a href="/" className="mx-auto mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 transition hover:text-blue-900"><Home className="h-4 w-4" />Retour à l’accueil</a>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
