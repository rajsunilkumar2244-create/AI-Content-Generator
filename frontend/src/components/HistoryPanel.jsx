export default function HistoryPanel({ history, onClear, onSelect }) {
  if (!history.length) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-display font-semibold text-white/40 uppercase tracking-widest">
          Recent
        </h3>
        <button
          onClick={onClear}
          className="text-xs text-white/25 hover:text-white/50 transition-colors font-body"
        >
          Clear all
        </button>
      </div>
      <div className="space-y-2">
        {history.map((item, i) => (
          <button
            key={i}
            onClick={() => onSelect(item)}
            className="w-full text-left group flex items-start gap-3 p-3 rounded-xl border border-ink-700/50 bg-ink-900/50 hover:bg-ink-800 hover:border-ink-600 transition-all duration-200"
          >
            <span className="text-base mt-0.5 shrink-0">
              {item.content_type === "blog" ? "📝" :
               item.content_type === "caption" ? "📸" :
               item.content_type === "email" ? "✉️" :
               item.content_type === "tweet" ? "🐦" :
               item.content_type === "product_description" ? "🛍️" : "📣"}
            </span>
            <div className="min-w-0">
              <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors font-body truncate">
                {item.topic}
              </p>
              <p className="text-xs text-white/25 font-mono mt-0.5">
                {item.content_type.replace("_", " ")} · {item.tone} · {item.word_count}w
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
