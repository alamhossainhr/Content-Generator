import React from 'react';
import { Sparkles, Download, History, PlusCircle, Globe, FileText } from 'lucide-react';
import { BlogPostData } from '../types';

interface HeaderProps {
  currentPost: BlogPostData | null;
  onOpenDownload: () => void;
  onOpenHistory: () => void;
  onNewPost: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPost,
  onOpenDownload,
  onOpenHistory,
  onNewPost,
  historyCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">SEO Content Engine</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                AI Pro
              </span>
            </div>
            <p className="text-xs text-neutral-400 hidden sm:block">
              Single-sentence to publishing-ready SEO blog content
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {historyCount > 0 && (
            <button
              id="history-toggle-btn"
              onClick={onOpenHistory}
              className="px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
              title="Saved Drafts History"
            >
              <History className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Saved Drafts</span>
              <span className="px-1.5 py-0.2 bg-neutral-700 text-neutral-200 rounded-full text-[10px]">
                {historyCount}
              </span>
            </button>
          )}

          {currentPost && (
            <>
              <button
                id="new-post-btn"
                onClick={onNewPost}
                className="px-3 py-1.5 rounded-lg border border-neutral-700 hover:border-neutral-600 bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5 text-neutral-400" />
                <span className="hidden sm:inline">New Post</span>
              </button>

              <button
                id="header-download-btn"
                onClick={onOpenDownload}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Post</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
