export default function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="animate-fade-up flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-sm">
      <span className="mt-0.5 shrink-0 text-base">⚠️</span>
      <span className="flex-1 font-body">{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 text-red-400 hover:text-red-200 transition-colors text-lg leading-none"
          aria-label="Dismiss error"
        >
          ×
        </button>
      )}
    </div>
  );
}
