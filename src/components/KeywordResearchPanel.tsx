import React from 'react';
import { Target, Search, TrendingUp, DollarSign, Activity, CheckCircle2 } from 'lucide-react';
import { KeywordData } from '../types';

interface KeywordResearchPanelProps {
  primaryKeyword: KeywordData;
  secondaryKeywords: KeywordData[];
}

export const KeywordResearchPanel: React.FC<KeywordResearchPanelProps> = ({
  primaryKeyword,
  secondaryKeywords,
}) => {
  const getIntentColor = (intent: string) => {
    switch (intent?.toLowerCase()) {
      case 'informational':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'commercial':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'transactional':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff?.toLowerCase()) {
      case 'low':
      case 'easy':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default:
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    }
  };

  return (
    <div className="space-y-4">
      {/* Primary Keyword Hero Card */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Target className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Primary Target Keyword
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${getIntentColor(
                primaryKeyword.intent
              )}`}
            >
              {primaryKeyword.intent} Intent
            </span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${getDifficultyColor(
                primaryKeyword.difficulty
              )}`}
            >
              {primaryKeyword.difficulty} Competition
            </span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              &ldquo;{primaryKeyword.keyword}&rdquo;
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Topical anchor for title, introductory hook, heading 2, and image alt text.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="px-3 py-2 rounded-lg bg-neutral-800/80 border border-neutral-700">
              <span className="text-neutral-400 block text-[10px] uppercase">Est. Search Volume</span>
              <span className="text-sm font-bold text-neutral-100 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                {primaryKeyword.searchVolumeIndex}
              </span>
            </div>

            <div className="px-3 py-2 rounded-lg bg-neutral-800/80 border border-neutral-700">
              <span className="text-neutral-400 block text-[10px] uppercase">CPC Value</span>
              <span className="text-sm font-bold text-neutral-100 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
                {primaryKeyword.cpc}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary & LSI Semantic Keywords */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-neutral-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Secondary & Semantic (LSI) Keywords ({secondaryKeywords.length})
            </h4>
          </div>
          <span className="text-[11px] text-neutral-400">
            Woven organically into subheadings and paragraphs
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {secondaryKeywords.map((kw, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-neutral-800/60 border border-neutral-800 hover:border-neutral-700 transition"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-neutral-200 line-clamp-1">
                  {kw.keyword}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {kw.searchVolumeIndex}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1.5 text-[11px]">
                <span className={`px-1.5 py-0.2 rounded border text-[10px] ${getIntentColor(kw.intent)}`}>
                  {kw.intent}
                </span>
                <span className="text-neutral-400 truncate">
                  {kw.relevance || 'Contextual LSI'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
