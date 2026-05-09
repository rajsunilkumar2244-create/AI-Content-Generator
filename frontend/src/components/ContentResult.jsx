import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ContentResult({ result, onClear }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const typeLabel = result.content_type.replace("_", " ").toUpperCase();

  return (
    <div className="animate-fade-up space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-ember-400 bg-ember-500/10 border border-ember-500/20 px-2.5 py-1 rounded-lg">
            {typeLabel}
          </span>
          <span className="text-xs font-mono text-white/30">
            {result.word_count} words · {result.model_used}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-body text-white/50 hover:text-white transition-colors bg-ink-800 hover:bg-ink-700 border border-ink-600 px-3 py-1.5 rounded-lg"
          >
            {copied ? (
              <><span className="text-sage-400">✓</span> Copied!</>
            ) : (
              <><span>⎘</span> Copy</>
            )}
          </button>
          <button
            onClick={onClear}
            className="text-xs font-body text-white/30 hover:text-white/60 transition-colors bg-ink-800 hover:bg-ink-700 border border-ink-600 px-3 py-1.5 rounded-lg"
          >
            ✕ Clear
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="card p-6 prose prose-invert prose-sm max-w-none
        prose-headings:font-display prose-headings:text-white
        prose-p:text-white/75 prose-p:leading-relaxed
        prose-li:text-white/70
        prose-strong:text-white
        prose-code:text-ember-400 prose-code:bg-ember-500/10 prose-code:px-1 prose-code:rounded
        prose-a:text-arctic-400">
        <ReactMarkdown>{result.content}</ReactMarkdown>
      </div>

      {/* Topic chip */}
      <p className="text-xs text-white/25 font-body text-right">
        Topic: <span className="text-white/40 italic">"{result.topic}"</span>
      </p>
    </div>
  );
}
