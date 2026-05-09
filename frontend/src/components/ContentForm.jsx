import { useState } from "react";
import { CONTENT_TYPES, TONES, TOPIC_EXAMPLES } from "../constants/options";

export default function ContentForm({ onGenerate, loading }) {
  const [form, setForm] = useState({
    topic: "",
    content_type: "blog",
    tone: "professional",
    target_audience: "",
    additional_context: "",
  });
  const [showExtras, setShowExtras] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.topic.trim()) return;
    onGenerate(form);
  };

  const fillExample = () => {
    const example = TOPIC_EXAMPLES[Math.floor(Math.random() * TOPIC_EXAMPLES.length)];
    set("topic", example);
  };

  const isReady = form.topic.trim().length >= 3;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Topic */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white/70 font-body">Topic / Idea</label>
          <button
            type="button"
            onClick={fillExample}
            className="text-xs text-ember-400 hover:text-ember-300 transition-colors font-body"
          >
            ✦ Try an example
          </button>
        </div>
        <textarea
          value={form.topic}
          onChange={(e) => set("topic", e.target.value)}
          placeholder="What do you want to write about?"
          rows={3}
          className="input-field resize-none font-body text-sm"
          maxLength={500}
        />
        <p className="text-right text-xs text-white/25 font-mono">{form.topic.length}/500</p>
      </div>

      {/* Content Type */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-white/70 font-body block">Content Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CONTENT_TYPES.map((ct) => (
            <button
              key={ct.value}
              type="button"
              onClick={() => set("content_type", ct.value)}
              className={`option-pill flex-col items-start gap-1 py-3 px-3 ${
                form.content_type === ct.value ? "selected" : ""
              }`}
            >
              <span className="text-lg leading-none">{ct.icon}</span>
              <span className="text-xs font-semibold font-display">{ct.label}</span>
              <span className="text-[10px] text-white/35 font-body leading-tight">{ct.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tone */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-white/70 font-body block">Tone</label>
        <div className="flex flex-wrap gap-2">
          {TONES.map((tone) => (
            <button
              key={tone.value}
              type="button"
              onClick={() => set("tone", tone.value)}
              className={`option-pill ${form.tone === tone.value ? "selected" : ""}`}
            >
              <span>{tone.icon}</span>
              <span className="font-display text-xs font-semibold">{tone.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Optional extras */}
      <div>
        <button
          type="button"
          onClick={() => setShowExtras((v) => !v)}
          className="text-sm text-white/40 hover:text-white/70 transition-colors font-body flex items-center gap-1.5"
        >
          <span className={`transition-transform duration-200 ${showExtras ? "rotate-90" : ""}`}>▶</span>
          {showExtras ? "Hide" : "Add"} optional details
        </button>

        {showExtras && (
          <div className="mt-4 space-y-4 animate-fade-up">
            <div className="space-y-1.5">
              <label className="text-xs text-white/50 font-body">Target Audience</label>
              <input
                type="text"
                value={form.target_audience}
                onChange={(e) => set("target_audience", e.target.value)}
                placeholder="e.g. startup founders, college students, fitness enthusiasts"
                className="input-field text-sm"
                maxLength={200}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/50 font-body">Additional Context</label>
              <input
                type="text"
                value={form.additional_context}
                onChange={(e) => set("additional_context", e.target.value)}
                placeholder="e.g. include statistics, mention competitors, focus on benefits"
                className="input-field text-sm"
                maxLength={500}
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isReady || loading}
        className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4"
      >
        {loading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <span>✦</span>
            Generate Content
          </>
        )}
      </button>
    </form>
  );
}
