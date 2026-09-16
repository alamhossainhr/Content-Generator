import React from 'react';
import { X, Clock, Trash2, ArrowRight, BookOpen, Target, Sparkles } from 'lucide-react';
import { BlogPostData } from '../types';

interface HistoryModalProps {
  posts: BlogPostData[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPost: (post: BlogPostData) => void;
  onDeletePost: (id: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  posts,
  isOpen,
  onClose,
  onSelectPost,
  onDeletePost,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/80">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Saved Drafts History</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-3">
          {posts.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No saved drafts yet.</p>
              <p className="text-xs text-neutral-500 mt-1">
                Posts generated will automatically be saved here.
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 transition flex items-start justify-between gap-4 group"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectPost(post);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 mb-1">
                    <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>&bull;</span>
                    <span className="text-indigo-400 font-medium">{post.brandVoice}</span>
                    <span>&bull;</span>
                    <span className="text-emerald-400 font-semibold">SEO: {post.seoAudit.score}/100</span>
                  </div>

                  <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition line-clamp-1">
                    {post.title}
                  </h4>

                  <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                    Prompt: &ldquo;{post.promptSentence}&rdquo;
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-[11px] text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3 text-indigo-400" />
                      {post.primaryKeyword.keyword}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-neutral-400" />
                      {post.seoAudit.wordCount} words
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 pt-1">
                  <button
                    onClick={() => {
                      onSelectPost(post);
                      onClose();
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium flex items-center gap-1 transition"
                  >
                    <span>Load</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onDeletePost(post.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-500/20 text-neutral-500 hover:text-rose-400 transition"
                    title="Delete Draft"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
