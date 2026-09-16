import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SentenceInputForm } from './components/SentenceInputForm';
import { KeywordResearchPanel } from './components/KeywordResearchPanel';
import { SerpPreview } from './components/SerpPreview';
import { SeoAuditCard } from './components/SeoAuditCard';
import { ContentEditorView } from './components/ContentEditorView';
import { VisualAssetsGallery } from './components/VisualAssetsGallery';
import { InternalLinkingMap } from './components/InternalLinkingMap';
import { DownloadModal } from './components/DownloadModal';
import { HistoryModal } from './components/HistoryModal';
import { BlogPostData, BrandVoicePreset, VisualAsset } from './types';
import { AlertCircle, Download, Sparkles, RefreshCw, Layers, ArrowUp } from 'lucide-react';

const STORAGE_KEY = 'seo_blog_content_engine_history';

export default function App() {
  const [currentPost, setCurrentPost] = useState<BlogPostData | null>(null);
  const [history, setHistory] = useState<BlogPostData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Load history from localStorage on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHistory(parsed);
          // Auto-load most recent post
          setCurrentPost(parsed[0]);
        }
      }
    } catch (e) {
      console.warn('Failed to load history from localStorage', e);
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (newPost: BlogPostData) => {
    setHistory((prev) => {
      const filtered = prev.filter((p) => p.id !== newPost.id);
      const updated = [newPost, ...filtered].slice(0, 20); // Keep last 20
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to persist history', e);
      }
      return updated;
    });
  };

  const handleDeleteHistoryPost = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to persist updated history', e);
      }
      return updated;
    });
    if (currentPost?.id === id) {
      setCurrentPost(history.find((p) => p.id !== id) || null);
    }
  };

  const handleGenerate = async (
    sentence: string,
    brandVoice: BrandVoicePreset,
    targetAudience: string
  ) => {
    setIsLoading(true);
    setError(null);
    setLoadingStage('Analyzing topic & search intent...');

    const stageTimer1 = setTimeout(() => {
      setLoadingStage('Conducting keyword research & volume estimates...');
    }, 2000);

    const stageTimer2 = setTimeout(() => {
      setLoadingStage('Formulating high-CTR meta description & H1-H3 structure...');
    }, 5000);

    const stageTimer3 = setTimeout(() => {
      setLoadingStage('Drafting long-form publishing-ready content...');
    }, 9000);

    const stageTimer4 = setTimeout(() => {
      setLoadingStage('Generating visual asset blueprints & internal link map...');
    }, 14000);

    try {
      const response = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence, brandVoice, targetAudience }),
      });

      const contentType = response.headers.get('content-type') || '';

      if (!response.ok) {
        let errorMsg = `Server responded with status ${response.status}`;
        if (contentType.includes('application/json')) {
          const errData = await response.json().catch(() => null);
          if (errData?.error) errorMsg = errData.error;
        } else {
          const text = await response.text().catch(() => '');
          if (text.includes('<!doctype') || text.includes('<html')) {
            errorMsg = `Server gateway timeout or temporary network interruption (${response.status}). Please click Generate again.`;
          } else if (text.trim().length > 0 && text.trim().length < 200) {
            errorMsg = text.trim();
          }
        }
        throw new Error(errorMsg);
      }

      if (!contentType.includes('application/json')) {
        const text = await response.text().catch(() => '');
        if (text.includes('<!doctype') || text.includes('<html')) {
          throw new Error('The application server is warming up. Please click Generate to proceed.');
        }
        throw new Error(`Expected JSON but received ${contentType || 'non-JSON response'}`);
      }

      const postData: BlogPostData = await response.json();
      setCurrentPost(postData);
      saveToHistory(postData);

      // Scroll smoothly down to results
      setTimeout(() => {
        const el = document.getElementById('generated-content-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Generation failed:', err);
      let message = err?.message || 'Failed to generate SEO blog post.';
      if (typeof message === 'string' && (message.includes('503') || message.includes('UNAVAILABLE') || message.includes('high demand'))) {
        message = 'The AI model is experiencing high demand. Please click "Generate Full SEO Package" again to utilize our high-throughput fast channel.';
      }
      setError(message);
    } finally {
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      clearTimeout(stageTimer3);
      clearTimeout(stageTimer4);
      setIsLoading(false);
      setLoadingStage('');
    }
  };

  // Editable fields updates
  const handleUpdateTitle = (newTitle: string) => {
    if (!currentPost) return;
    const updated = { ...currentPost, title: newTitle };
    setCurrentPost(updated);
    saveToHistory(updated);
  };

  const handleUpdateMetaDescription = (newMeta: string) => {
    if (!currentPost) return;
    const updated = { ...currentPost, metaDescription: newMeta };
    setCurrentPost(updated);
    saveToHistory(updated);
  };

  const handleUpdateSlug = (newSlug: string) => {
    if (!currentPost) return;
    const updated = { ...currentPost, slug: newSlug };
    setCurrentPost(updated);
    saveToHistory(updated);
  };

  const handleUpdateAsset = (assetId: string, updatedFields: Partial<VisualAsset>) => {
    if (!currentPost) return;
    const updatedVisuals = currentPost.visualAssets.map((asset) => {
      if (asset.id === assetId) {
        return { ...asset, ...updatedFields };
      }
      return asset;
    });
    const updated: BlogPostData = { ...currentPost, visualAssets: updatedVisuals };
    setCurrentPost(updated);
    saveToHistory(updated);
  };

  const handleUpdateContentMarkdown = (newContent: string) => {
    if (!currentPost) return;
    const wordCount = newContent.trim().split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const updated: BlogPostData = {
      ...currentPost,
      contentMarkdown: newContent,
      seoAudit: {
        ...currentPost.seoAudit,
        wordCount,
        readingTimeMinutes: readingTime,
      },
    };
    setCurrentPost(updated);
    saveToHistory(updated);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navigation */}
      <Header
        currentPost={currentPost}
        onOpenDownload={() => setIsDownloadModalOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        onNewPost={() => {
          scrollToTop();
        }}
        historyCount={history.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Error notification banner if any */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start justify-between gap-3 text-sm">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Generation Issue</p>
                <p className="text-xs text-rose-300/80 mt-0.5">{error}</p>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs text-rose-400 hover:text-rose-200 underline font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Hero Sentence Input Form */}
        <SentenceInputForm
          onGenerate={handleGenerate}
          isLoading={isLoading}
          loadingStage={loadingStage}
        />

        {/* Generated Post Content Dashboard */}
        {currentPost && (
          <div id="generated-content-section" className="space-y-8 pt-6 border-t border-neutral-800">
            {/* Action & Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <span className="text-xs text-neutral-400">Generated for topic sentence:</span>
                  <p className="text-xs sm:text-sm font-semibold text-white line-clamp-1">
                    &ldquo;{currentPost.promptSentence}&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-400 hidden sm:inline">
                  Voice: <strong className="text-indigo-300">{currentPost.brandVoice}</strong>
                </span>

                <button
                  id="primary-download-action-btn"
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Options (Markdown, PDF, Word)</span>
                </button>
              </div>
            </div>

            {/* SEO Health Audit Card */}
            <SeoAuditCard
              audit={currentPost.seoAudit}
              primaryKeyword={currentPost.primaryKeyword.keyword}
            />

            {/* Keyword Research Panel */}
            <KeywordResearchPanel
              primaryKeyword={currentPost.primaryKeyword}
              secondaryKeywords={currentPost.secondaryKeywords}
            />

            {/* Google SERP Simulator (Desktop & Mobile preview + editable meta) */}
            <SerpPreview
              title={currentPost.title}
              metaDescription={currentPost.metaDescription}
              slug={currentPost.slug}
              onUpdateTitle={handleUpdateTitle}
              onUpdateMetaDescription={handleUpdateMetaDescription}
              onUpdateSlug={handleUpdateSlug}
            />

            {/* Visual Assets Gallery */}
            <VisualAssetsGallery
              assets={currentPost.visualAssets}
              onUpdateAsset={handleUpdateAsset}
            />

            {/* Main Content Viewer & Markdown Editor */}
            <ContentEditorView
              post={currentPost}
              onUpdateContent={handleUpdateContentMarkdown}
            />

            {/* Internal Linking Architecture Map */}
            <InternalLinkingMap
              suggestions={currentPost.internalLinkingSuggestions}
            />

            {/* Floating back-to-top / quick download bar on mobile */}
            <div className="flex justify-between items-center pt-4 text-xs text-neutral-500">
              <span>SEO Content Engine &bull; Ready for publishing</span>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 hover:text-white transition"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Download Options Modal (Markdown, PDF, Word, Visual Assets) */}
      {currentPost && (
        <DownloadModal
          post={currentPost}
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
        />
      )}

      {/* Drafts History Drawer/Modal */}
      <HistoryModal
        posts={history}
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        onSelectPost={(post) => setCurrentPost(post)}
        onDeletePost={handleDeleteHistoryPost}
      />
    </div>
  );
}
