import React, { useState } from 'react';
import { Sparkles, ArrowRight, Wand2, Compass, Layers, ShieldCheck, Loader2 } from 'lucide-react';
import { BrandVoicePreset } from '../types';

interface SentenceInputFormProps {
  onGenerate: (sentence: string, brandVoice: BrandVoicePreset, targetAudience: string) => Promise<void>;
  isLoading: boolean;
  loadingStage: string;
}

const SAMPLE_SENTENCES = [
  "Eco-friendly zero-waste morning routines for busy urban professionals looking to reduce plastic.",
  "How autonomous AI agents are revolutionizing B2B customer support workflows in 2026.",
  "The ultimate beginner's guide to container vegetable gardening on small apartment balconies.",
  "Smart high-yield dividend investing strategies for tech workers seeking early financial independence.",
  "Post-workout recovery techniques to accelerate muscle repair and prevent sports injuries naturally.",
];

const BRAND_VOICES: Array<{ id: BrandVoicePreset; label: string; desc: string }> = [
  { id: 'Authoritative & Expert', label: 'Authoritative & Expert', desc: 'Data-driven, industry benchmark tone' },
  { id: 'Engaging & Conversational', label: 'Engaging & Conversational', desc: 'Warm, relatable, and reader-first' },
  { id: 'Tactical & How-To Guide', label: 'Tactical & How-To Guide', desc: 'Step-by-step, actionable, and practical' },
  { id: 'Inspiring & Story-driven', label: 'Inspiring & Story-driven', desc: 'Narrative hooks with emotional resonance' },
  { id: 'Minimalist & Direct', label: 'Minimalist & Direct', desc: 'Punchy, high-density, no fluff' },
];

export const SentenceInputForm: React.FC<SentenceInputFormProps> = ({
  onGenerate,
  isLoading,
  loadingStage,
}) => {
  const [sentence, setSentence] = useState('');
  const [brandVoice, setBrandVoice] = useState<BrandVoicePreset>('Authoritative & Expert');
  const [targetAudience, setTargetAudience] = useState('Digital Professionals & General Audience');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sentence.trim() || isLoading) return;
    onGenerate(sentence.trim(), brandVoice, targetAudience);
  };

  const handleSelectSample = (sample: string) => {
    setSentence(sample);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-800/80 to-neutral-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* Glow accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-indigo-500/15 blur-3xl pointer-events-none rounded-full" />

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-3">
            <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Single-Sentence Input &rarr; Full SEO Post</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            What is your article topic sentence?
          </h1>
          <p className="text-neutral-400 text-sm mt-1 max-w-xl mx-auto">
            Provide a single core sentence. Our engine automatically performs keyword research, creates meta descriptions, structures headings, crafts content, plans internal links, and generates visuals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Main sentence input */}
          <div className="relative">
            <textarea
              id="sentence-input"
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              placeholder="e.g., Eco-friendly zero-waste morning routines for busy urban professionals..."
              rows={3}
              disabled={isLoading}
              className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base resize-none transition shadow-inner disabled:opacity-50"
            />
            <div className="absolute bottom-3 right-3 text-xs text-neutral-500 font-mono">
              {sentence.length} chars
            </div>
          </div>

          {/* Quick inspiration sample pills */}
          <div>
            <div className="text-xs font-semibold text-neutral-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Or try an example topic:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_SENTENCES.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  disabled={isLoading}
                  className="text-left text-xs px-3 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 hover:border-indigo-500/40 text-neutral-300 hover:text-white transition cursor-pointer disabled:opacity-50"
                >
                  &ldquo;{sample.length > 55 ? sample.slice(0, 55) + '...' : sample}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Brand Voice & Options Row */}
          <div className="pt-2 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Editorial Brand Voice
              </span>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs text-indigo-400 hover:text-indigo-300 transition"
              >
                {showAdvanced ? 'Hide options' : 'Custom audience'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {BRAND_VOICES.map((voice) => {
                const isSelected = brandVoice === voice.id;
                return (
                  <button
                    key={voice.id}
                    type="button"
                    onClick={() => setBrandVoice(voice.id)}
                    disabled={isLoading}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/10 text-white ring-1 ring-indigo-500/50'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    <span className="text-xs font-bold leading-tight line-clamp-1">{voice.label}</span>
                    <span className="text-[10px] text-neutral-400 line-clamp-1 mt-1">{voice.desc}</span>
                  </button>
                );
              })}
            </div>

            {showAdvanced && (
              <div className="mt-4 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
                <label className="block text-xs font-medium text-neutral-300">
                  Target Reader Profile / Audience Persona:
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Early-stage startup founders, marketing directors, busy college students..."
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            )}
          </div>

          {/* Submit button & Loading stage */}
          <div className="pt-2">
            <button
              id="generate-blog-btn"
              type="submit"
              disabled={!sentence.trim() || isLoading}
              className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 transition shadow-lg ${
                !sentence.trim() || isLoading
                  ? 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 text-white shadow-indigo-600/30 cursor-pointer'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>{loadingStage || 'Generating SEO Blog Content...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Complete SEO Blog Post & Assets</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
