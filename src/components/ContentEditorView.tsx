import React, { useState } from 'react';
import { Eye, Code, ListTree, FileCode, Copy, Check, Sparkles, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BlogPostData } from '../types';

interface ContentEditorViewProps {
  post: BlogPostData;
  onUpdateContent: (newContent: string) => void;
}

type TabType = 'preview' | 'markdown' | 'headings' | 'schema';

export const ContentEditorView: React.FC<ContentEditorViewProps> = ({ post, onUpdateContent }) => {
  const [activeTab, setActiveTab] = useState<TabType>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 overflow-hidden shadow-lg">
      {/* Tab Navigation Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-900/60">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              activeTab === 'preview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Article Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('markdown')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              activeTab === 'markdown'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Raw Markdown</span>
          </button>

          <button
            onClick={() => setActiveTab('headings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              activeTab === 'headings'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <ListTree className="w-3.5 h-3.5" />
            <span>Headings Outline ({post.headingOutline.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              activeTab === 'schema'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>JSON-LD Schema</span>
          </button>
        </div>

        {/* Quick action: Copy active content */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (activeTab === 'schema') {
                handleCopy(post.schemaMarkup?.jsonLd || '');
              } else {
                handleCopy(post.contentMarkdown);
              }
            }}
            className="px-2.5 py-1.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-neutral-400" />
                <span>{activeTab === 'schema' ? 'Copy JSON-LD' : 'Copy Content'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="p-6">
        {/* TAB 1: ARTICLE PREVIEW */}
        {activeTab === 'preview' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* H1 Title */}
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-indigo-400 block mb-1">
                Optimized H1 Headline
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {post.title}
              </h1>
            </div>

            {/* Featured Image */}
            {post.visualAssets.length > 0 && post.visualAssets[0].imageUrl && (
              <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                <img
                  src={post.visualAssets[0].imageUrl}
                  alt={post.visualAssets[0].altText}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[380px] object-cover"
                />
                <div className="p-2.5 bg-neutral-950/90 text-center text-xs text-neutral-400 italic border-t border-neutral-900">
                  {post.visualAssets[0].caption}
                </div>
              </div>
            )}

            {/* Rendered Markdown Body with custom styling */}
            <div className="space-y-4 text-neutral-300 leading-relaxed text-base font-sans">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3 pt-4 border-t border-neutral-800 flex items-center gap-2">
                      <span className="text-indigo-400">#</span>
                      <span>{children}</span>
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-semibold text-neutral-100 mt-6 mb-2 text-indigo-200">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-neutral-300 leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-1.5 text-neutral-300 ml-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-1.5 text-neutral-300 ml-2">
                      {children}
                    </ol>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 my-4 italic text-neutral-300 bg-neutral-800/40 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">{children}</strong>
                  ),
                  code: ({ children }) => (
                    <code className="px-1.5 py-0.5 rounded bg-neutral-800 text-indigo-300 font-mono text-xs">
                      {children}
                    </code>
                  ),
                }}
              >
                {post.contentMarkdown}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* TAB 2: RAW MARKDOWN EDITOR */}
        {activeTab === 'markdown' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-neutral-400">
              <span>Edit markdown directly before exporting:</span>
              <span className="font-mono">{post.contentMarkdown.length} characters</span>
            </div>
            <textarea
              rows={24}
              value={post.contentMarkdown}
              onChange={(e) => onUpdateContent(e.target.value)}
              className="w-full p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-sm text-neutral-200 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y"
            />
          </div>
        )}

        {/* TAB 3: HEADINGS OUTLINE */}
        {activeTab === 'headings' && (
          <div className="space-y-3 max-w-3xl mx-auto">
            <p className="text-xs text-neutral-400 mb-4">
              Carefully engineered heading hierarchy ensuring optimal crawlability and featured snippet targeting.
            </p>

            {/* H1 */}
            <div className="p-3.5 rounded-xl bg-neutral-800/80 border border-neutral-700 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded bg-indigo-500 text-white font-mono font-bold text-xs">
                H1
              </span>
              <div>
                <h4 className="font-bold text-white text-sm">{post.title}</h4>
                <span className="text-[11px] text-neutral-400 mt-0.5 block">
                  Primary target keyword placement upfront with brand positioning.
                </span>
              </div>
            </div>

            {/* Subheadings */}
            {post.headingOutline.map((heading, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition ${
                  heading.level === 'h2'
                    ? 'bg-neutral-900 border-neutral-700 ml-3'
                    : 'bg-neutral-900/60 border-neutral-800 ml-8'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={`px-1.5 py-0.5 rounded font-mono font-bold text-xs uppercase ${
                      heading.level === 'h2'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {heading.level}
                  </span>
                  <div>
                    <p className="font-medium text-sm text-neutral-200">{heading.text}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      <span className="font-semibold text-neutral-400">SEO Target:</span>{' '}
                      {heading.seoPurpose}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: JSON-LD SCHEMA */}
        {activeTab === 'schema' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-neutral-400">
              <span>Ready-to-publish Schema.org structured data (BlogPosting & FAQPage):</span>
              <span className="text-emerald-400 font-semibold">Search Engine Rich Results Compliant</span>
            </div>
            <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto leading-relaxed">
              {post.schemaMarkup?.jsonLd || JSON.stringify(
                {
                  '@context': 'https://schema.org',
                  '@type': 'BlogPosting',
                  headline: post.title,
                  description: post.metaDescription,
                  keywords: [post.primaryKeyword.keyword, ...post.secondaryKeywords.map((k) => k.keyword)],
                  datePublished: new Date(post.createdAt).toISOString(),
                  author: {
                    '@type': 'Organization',
                    name: 'Editorial Team',
                  },
                },
                null,
                2
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
