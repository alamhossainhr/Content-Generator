import React, { useState } from 'react';
import { Link2, ExternalLink, Copy, Check, Info, Network, ArrowRight } from 'lucide-react';
import { InternalLinkSuggestion } from '../types';

interface InternalLinkingMapProps {
  suggestions: InternalLinkSuggestion[];
}

export const InternalLinkingMap: React.FC<InternalLinkingMapProps> = ({ suggestions }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyMarkdown = (link: InternalLinkSuggestion, idx: number) => {
    const md = `[${link.anchorText}](${link.suggestedUrl})`;
    navigator.clipboard.writeText(md);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
            <Network className="w-4 h-4 text-indigo-400" />
            <span>Internal Linking Architecture ({suggestions.length})</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Suggested contextual cross-links to construct topical authority clusters and distribute search equity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {suggestions.map((link, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-4 flex flex-col justify-between space-y-3 hover:border-neutral-700 transition shadow-sm"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center border border-indigo-500/30">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-sm text-indigo-300">
                    &ldquo;{link.anchorText}&rdquo;
                  </span>
                </div>

                <button
                  onClick={() => handleCopyMarkdown(link, idx)}
                  className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-[11px] text-neutral-300 flex items-center gap-1 transition"
                  title="Copy as Markdown Link"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-neutral-400" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

              {/* Destination URL */}
              <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-400 font-mono bg-neutral-950/60 px-2.5 py-1.5 rounded-lg border border-neutral-800">
                <Link2 className="w-3 h-3 text-neutral-500 shrink-0" />
                <span className="truncate">{link.suggestedUrl}</span>
              </div>

              {/* Context in Article */}
              <div className="mt-2.5 text-xs text-neutral-300">
                <span className="text-neutral-500 block text-[10px] uppercase font-semibold mb-0.5">
                  Contextual Placement Sentence:
                </span>
                <p className="italic bg-neutral-800/40 p-2 rounded-lg border-l-2 border-indigo-500 text-neutral-300">
                  &ldquo;{link.contextSentence}&rdquo;
                </p>
              </div>
            </div>

            {/* SEO Rationale */}
            <div className="pt-2 border-t border-neutral-800/80 flex items-start gap-1.5 text-[11px] text-neutral-400">
              <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
              <span>{link.seoRationale}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
