export default function LoadingSkeleton() {
  return (
    <div className="animate-fade-in space-y-4">
      <div className="flex items-center gap-3">
        <div className="shimmer-bg h-6 w-20 rounded-lg" />
        <div className="shimmer-bg h-4 w-36 rounded-lg" />
      </div>
      <div className="card p-6 space-y-3">
        <div className="shimmer-bg h-7 w-3/4 rounded-lg" />
        <div className="shimmer-bg h-4 w-full rounded-lg" />
        <div className="shimmer-bg h-4 w-5/6 rounded-lg" />
        <div className="shimmer-bg h-4 w-4/5 rounded-lg" />
        <div className="mt-4 shimmer-bg h-5 w-1/2 rounded-lg" />
        <div className="shimmer-bg h-4 w-full rounded-lg" />
        <div className="shimmer-bg h-4 w-11/12 rounded-lg" />
        <div className="shimmer-bg h-4 w-3/4 rounded-lg" />
        <div className="mt-4 shimmer-bg h-5 w-2/5 rounded-lg" />
        <div className="shimmer-bg h-4 w-full rounded-lg" />
        <div className="shimmer-bg h-4 w-5/6 rounded-lg" />
      </div>
      <div className="flex justify-center">
        <div className="flex items-center gap-2 text-xs text-white/30 font-body">
          <span className="inline-block w-3 h-3 border-2 border-white/20 border-t-ember-400 rounded-full animate-spin" />
          Writing your content…
        </div>
      </div>
    </div>
  );
}
