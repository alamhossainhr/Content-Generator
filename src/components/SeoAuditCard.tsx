import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Info, Clock, BookOpen, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import { SeoAudit } from '../types';

interface SeoAuditCardProps {
  audit: SeoAudit;
  primaryKeyword: string;
}

export const SeoAuditCard: React.FC<SeoAuditCardProps> = ({ audit, primaryKeyword }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 75) return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
    return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  };

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Score & Badge */}
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center font-mono ${getScoreColor(
              audit.score
            )}`}
          >
            <span className="text-xl font-black leading-none">{audit.score}</span>
            <span className="text-[9px] uppercase font-bold tracking-wider opacity-80 mt-0.5">Score</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                SEO Optimization Health
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                Publish-Ready
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Audited against Google Search ranking guidelines and featured snippet best practices.
            </p>
          </div>
        </div>

        {/* Quick Stats Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-neutral-800/80 border border-neutral-700/80 flex items-center gap-1.5 text-neutral-300">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>{audit.wordCount} words</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-neutral-800/80 border border-neutral-700/80 flex items-center gap-1.5 text-neutral-300">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{audit.readingTimeMinutes} min read</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-neutral-800/80 border border-neutral-700/80 flex items-center gap-1.5 text-neutral-300">
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            <span>Density: {audit.keywordDensity}</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-neutral-800/80 border border-neutral-700/80 text-neutral-300 hidden sm:block">
            <span>{audit.readabilityGrade}</span>
          </div>
        </div>
      </div>

      {/* Checklist details toggle */}
      <div className="mt-4 pt-3 border-t border-neutral-800">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-xs text-neutral-400 hover:text-white transition py-1"
        >
          <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>SEO Factors Verification Checklist ({audit.checklist?.length || 0} checks)</span>
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(audit.checklist || []).map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-neutral-800/50 border border-neutral-800 flex items-start gap-2 text-xs"
              >
                {item.status === 'pass' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : item.status === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold text-neutral-200">{item.rule}</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
