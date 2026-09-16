import React, { useState } from 'react';
import { Smartphone, Monitor, Globe, Check, AlertCircle, Edit2 } from 'lucide-react';

interface SerpPreviewProps {
  title: string;
  metaDescription: string;
  slug: string;
  onUpdateTitle: (title: string) => void;
  onUpdateMetaDescription: (meta: string) => void;
  onUpdateSlug: (slug: string) => void;
}

export const SerpPreview: React.FC<SerpPreviewProps> = ({
  title,
  metaDescription,
  slug,
  onUpdateTitle,
  onUpdateMetaDescription,
  onUpdateSlug,
}) => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isEditing, setIsEditing] = useState(false);

  const titleLength = title.length;
  const metaLength = metaDescription.length;

  const isTitleOptimal = titleLength >= 45 && titleLength <= 65;
  const isMetaOptimal = metaLength >= 140 && metaLength <= 160;

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
            Google Search Snippet (SERP) Simulator
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-neutral-800 rounded-lg p-0.5 border border-neutral-700">
            <button
              onClick={() => setDevice('desktop')}
              className={`px-2.5 py-1 rounded text-xs flex items-center gap-1.5 transition ${
                device === 'desktop'
                  ? 'bg-neutral-700 text-white font-medium shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`px-2.5 py-1 rounded text-xs flex items-center gap-1.5 transition ${
                device === 'mobile'
                  ? 'bg-neutral-700 text-white font-medium shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-2.5 py-1 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-300 text-xs flex items-center gap-1 transition"
          >
            <Edit2 className="w-3 h-3" />
            <span>{isEditing ? 'Done' : 'Edit Meta'}</span>
          </button>
        </div>
      </div>

      {/* Editor inputs when toggle active */}
      {isEditing && (
        <div className="mt-4 p-4 rounded-xl bg-neutral-800/60 border border-neutral-700 space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label className="font-medium text-neutral-300">SEO Title Tag (&lt;title&gt;):</label>
              <span className={isTitleOptimal ? 'text-emerald-400' : 'text-amber-400'}>
                {titleLength} / 60 chars
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => onUpdateTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <label className="font-medium text-neutral-300">URL Slug:</label>
              <span className="text-neutral-500">/blog/{slug}</span>
            </div>
            <input
              type="text"
              value={slug}
              onChange={(e) => onUpdateSlug(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <label className="font-medium text-neutral-300">Automated Meta Description:</label>
              <span className={isMetaOptimal ? 'text-emerald-400' : 'text-amber-400'}>
                {metaLength} / 155 chars
              </span>
            </div>
            <textarea
              rows={2}
              value={metaDescription}
              onChange={(e) => onUpdateMetaDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}

      {/* Visual Google SERP Result Box */}
      <div className="mt-4 p-4 rounded-xl bg-white text-slate-900 shadow-inner font-sans">
        <div className={device === 'mobile' ? 'max-w-sm mx-auto' : 'max-w-2xl'}>
          {/* Breadcrumb / URL */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
            <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-600">
              G
            </div>
            <span className="text-slate-800 font-medium">yourdomain.com</span>
            <span className="text-slate-400">&rsaquo;</span>
            <span className="text-slate-500">blog</span>
            <span className="text-slate-400">&rsaquo;</span>
            <span className="text-slate-500 truncate">{slug || 'seo-guide'}</span>
          </div>

          {/* Title */}
          <h4 className="text-blue-800 hover:underline text-lg font-medium leading-snug cursor-pointer line-clamp-2">
            {title || 'Optimized SEO Blog Title'}
          </h4>

          {/* Meta Description */}
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-normal line-clamp-3">
            {metaDescription || 'Automated high-CTR meta description designed to maximize search engine click-through rates.'}
          </p>
        </div>
      </div>

      {/* Meta Character Optimization Badges */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          {isTitleOptimal ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          )}
          <span className="text-neutral-400">Title Tag:</span>
          <span className={`font-mono ${isTitleOptimal ? 'text-emerald-400' : 'text-amber-400'}`}>
            {titleLength} chars
          </span>
          <span className="text-neutral-500 text-[11px]">(Target: 50-65)</span>
        </div>

        <div className="text-neutral-700">|</div>

        <div className="flex items-center gap-1.5">
          {isMetaOptimal ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          )}
          <span className="text-neutral-400">Meta Description:</span>
          <span className={`font-mono ${isMetaOptimal ? 'text-emerald-400' : 'text-amber-400'}`}>
            {metaLength} chars
          </span>
          <span className="text-neutral-500 text-[11px]">(Target: 145-160)</span>
        </div>
      </div>
    </div>
  );
};
