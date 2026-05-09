import { useState } from "react";
import ContentForm from "./components/ContentForm";
import ContentResult from "./components/ContentResult";
import ErrorBanner from "./components/ErrorBanner";
import LoadingSkeleton from "./components/LoadingSkeleton";
import HistoryPanel from "./components/HistoryPanel";
import { useContentGenerator } from "./hooks/useContentGenerator";

export default function App() {
  const { result, loading, error, history, generate, clearResult, clearHistory } =
    useContentGenerator();
  const [selectedHistory, setSelectedHistory] = useState(null);

  const displayResult = selectedHistory || result;

  const handleSelect = (item) => {
    setSelectedHistory(item);
  };

  const handleClear = () => {
    clearResult();
    setSelectedHistory(null);
  };

  const handleGenerate = (formData) => {
    setSelectedHistory(null);
    generate(formData);
  };

  return (
    <div className="min-h-screen bg-ink-950 noise-bg">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 10%, rgba(240,78,26,0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 80% 80%, rgba(56,189,248,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-ink-700/40 bg-ink-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-ember-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path
                  d="M6 18 L12 6 L15 12 L18 9"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="6" r="1.5" fill="white" />
              </svg>
            </div>
            <span className="font-display font-semibold text-white text-lg tracking-tight">
              Quill <span className="text-gradient">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-mono text-white/20 bg-ink-800 border border-ink-700 px-2.5 py-1 rounded-lg">
              gpt-4o
            </span>
            <a
              href="https://platform.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-body text-white/30 hover:text-white/60 transition-colors"
            >
              Docs ↗
            </a>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8">
          {/* Left — Form */}
          <aside className="space-y-8">
            {/* Hero text */}
            <div className="space-y-2">
              <h1 className="font-display font-semibold text-2xl sm:text-3xl text-white leading-tight">
                Write anything,
                <br />
                <span className="text-gradient">instantly.</span>
              </h1>
              <p className="text-sm text-white/40 font-body leading-relaxed">
                Blog posts, captions, emails — powered by GPT-4o with expert-level prompts.
              </p>
            </div>

            {/* Form card */}
            <div className="card p-6">
              <ContentForm onGenerate={handleGenerate} loading={loading} />
            </div>

            {/* History */}
            <HistoryPanel
              history={history}
              onClear={clearHistory}
              onSelect={handleSelect}
            />
          </aside>

          {/* Right — Result */}
          <section className="min-h-[400px]">
            {error && (
              <ErrorBanner message={error} onDismiss={handleClear} />
            )}

            {loading && !error && <LoadingSkeleton />}

            {!loading && !error && displayResult && (
              <ContentResult result={displayResult} onClear={handleClear} />
            )}

            {!loading && !error && !displayResult && (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white/20">
                    <path
                      d="M12 4 L12 20 M4 12 L20 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="space-y-1.5">
                  <p className="font-display font-medium text-white/30 text-sm">
                    Your content will appear here
                  </p>
                  <p className="text-xs text-white/20 font-body max-w-xs">
                    Fill in a topic, pick a content type and tone, then hit Generate.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  {["Blog Post", "Tweet Thread", "Ad Copy"].map((t) => (
                    <span
                      key={t}
                      className="text-xs font-body text-white/20 border border-ink-700 bg-ink-900 px-3 py-1.5 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-ink-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/20 font-body">
            Quill AI — Production-ready content generator
          </p>
          <p className="text-xs text-white/15 font-mono">
            FastAPI + React + OpenAI
          </p>
        </div>
      </footer>
    </div>
  );
}
