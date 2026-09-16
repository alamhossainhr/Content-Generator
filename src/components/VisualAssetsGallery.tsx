import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Download,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  Eye,
  Camera,
  Layers,
  Wand2,
  Settings2,
} from 'lucide-react';
import { VisualAsset } from '../types';
import { downloadImage } from '../utils/exportUtils';
import {
  detectTopicCategory,
  getTopicCuratedImage,
  getAiGeneratedImageUrl,
  TOPIC_CURATED_IMAGES,
  TopicCategory,
} from '../utils/imageTopicMatcher';

interface VisualAssetsGalleryProps {
  assets: VisualAsset[];
  onUpdateAsset?: (assetId: string, updatedFields: Partial<VisualAsset>) => void;
}

export const VisualAssetsGallery: React.FC<VisualAssetsGalleryProps> = ({
  assets,
  onUpdateAsset,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<VisualAsset | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);
  const [customPromptText, setCustomPromptText] = useState<string>('');
  const [loadingAssets, setLoadingAssets] = useState<Record<string, boolean>>({});

  const handleCopyAlt = (id: string, altText: string) => {
    navigator.clipboard.writeText(altText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadSingle = async (asset: VisualAsset) => {
    if (!asset.imageUrl) return;
    setDownloadingId(asset.id);
    const filename = `${asset.role}-${asset.id}.jpg`;
    try {
      await downloadImage(asset.imageUrl, filename);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadAll = async () => {
    for (const asset of assets) {
      if (asset.imageUrl) {
        await downloadImage(asset.imageUrl, `${asset.role}-${asset.id}.jpg`);
      }
    }
  };

  // Switch between curated photo and AI bespoke illustration
  const handleToggleSourceType = (asset: VisualAsset, type: 'photo' | 'ai') => {
    if (!onUpdateAsset) return;
    const category = (asset.topicCategory as TopicCategory) || 'general_editorial';

    if (type === 'ai') {
      const aiUrl =
        asset.aiImageUrl ||
        getAiGeneratedImageUrl(asset.prompt || asset.altText, asset.aspectRatio, Math.floor(Math.random() * 1000));
      onUpdateAsset(asset.id, {
        imageUrl: aiUrl,
        sourceType: 'ai',
      });
    } else {
      const { imageUrl: photoUrl, fallbackUrl } = getTopicCuratedImage(
        category,
        asset.role,
        0,
        asset.aspectRatio
      );
      onUpdateAsset(asset.id, {
        imageUrl: photoUrl,
        fallbackUrl,
        sourceType: 'photo',
      });
    }
  };

  // Cycle through alternative topic photos
  const handleNextPhotoVariation = (asset: VisualAsset) => {
    if (!onUpdateAsset) return;
    const category = (asset.topicCategory as TopicCategory) || 'general_editorial';
    const collection = TOPIC_CURATED_IMAGES[category] || TOPIC_CURATED_IMAGES.general_editorial;
    const list = collection[asset.role] || collection.hero;

    // Find current index in list
    const currentBase = (asset.imageUrl || '').split('?')[0];
    const currentIndex = list.findIndex((url) => currentBase.startsWith(url));
    const nextIndex = (currentIndex + 1) % list.length;

    const { imageUrl: nextUrl, fallbackUrl } = getTopicCuratedImage(
      category,
      asset.role,
      nextIndex,
      asset.aspectRatio
    );

    onUpdateAsset(asset.id, {
      imageUrl: nextUrl,
      fallbackUrl,
      sourceType: 'photo',
    });
  };

  // Re-generate bespoke AI visual with custom prompt or new seed
  const handleRegenerateAi = (asset: VisualAsset, customPrompt?: string) => {
    if (!onUpdateAsset) return;
    setLoadingAssets((prev) => ({ ...prev, [asset.id]: true }));

    const promptToUse = customPrompt || asset.prompt || asset.altText;
    const seed = Math.floor(Math.random() * 90000) + 1000;
    const newAiUrl = getAiGeneratedImageUrl(promptToUse, asset.aspectRatio, seed);

    onUpdateAsset(asset.id, {
      imageUrl: newAiUrl,
      aiImageUrl: newAiUrl,
      prompt: promptToUse,
      sourceType: 'ai',
    });

    setEditingPromptId(null);
    setTimeout(() => {
      setLoadingAssets((prev) => ({ ...prev, [asset.id]: false }));
    }, 1200);
  };

  const getTopicDisplay = (cat?: string) => {
    switch (cat) {
      case 'workplace_hr':
        return 'Workplace & HR';
      case 'remote_work':
        return 'Remote Work & WFH';
      case 'tech_software':
        return 'Tech & Software';
      case 'finance_business':
        return 'Finance & Business';
      case 'marketing_seo':
        return 'Marketing & SEO';
      case 'health_wellness':
        return 'Health & Wellness';
      case 'sustainability_eco':
        return 'Sustainability & Eco';
      case 'education_learning':
        return 'Education & Learning';
      case 'food_hospitality':
        return 'Culinary & Hospitality';
      case 'ecommerce_retail':
        return 'E-Commerce & Retail';
      default:
        return 'Editorial & Strategy';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                Content-Matched Visual Assets ({assets.length})
                {assets[0]?.topicCategory && (
                  <span className="text-[10px] font-medium tracking-normal normal-case px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-indigo-300">
                    Topic: {getTopicDisplay(assets[0].topicCategory)}
                  </span>
                )}
              </h3>
              <p className="text-xs text-neutral-400">
                100% content-aligned visuals tailored to your topic, with SEO-optimized alt tags and one-click download.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadAll}
            className="px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-1.5 transition shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download All Images</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assets.map((asset) => {
          const isPhoto = asset.sourceType !== 'ai';
          const isLoading = loadingAssets[asset.id];

          return (
            <div
              key={asset.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden flex flex-col justify-between group hover:border-neutral-700 transition shadow-lg"
            >
              {/* Image Preview & Badges */}
              <div className="relative bg-neutral-950 aspect-video overflow-hidden">
                {asset.imageUrl ? (
                  <img
                    src={asset.imageUrl}
                    alt={asset.altText}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (asset.fallbackUrl && e.currentTarget.src !== asset.fallbackUrl) {
                        e.currentTarget.src = asset.fallbackUrl;
                      }
                    }}
                    className={`w-full h-full object-cover transition duration-500 group-hover:scale-105 ${
                      isLoading ? 'opacity-40 blur-sm' : 'opacity-100'
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600">
                    <ImageIcon className="w-8 h-8 mb-2 animate-pulse" />
                    <span className="text-xs">Loading visual asset...</span>
                  </div>
                )}

                {/* Loading overlay */}
                {isLoading && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white text-xs gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>Synthesizing AI graphic...</span>
                  </div>
                )}

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-white border border-white/20">
                    {asset.role === 'hero' ? 'Featured Hero' : asset.role === 'infographic' ? 'Infographic' : 'Section Break'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-black/65 backdrop-blur-md text-neutral-300 font-mono">
                    {asset.aspectRatio}
                  </span>
                </div>

                {/* Top-Right Quick Actions */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  {asset.imageUrl && (
                    <button
                      onClick={() => setSelectedImage(asset)}
                      className="p-1.5 rounded-lg bg-black/75 hover:bg-black text-white text-xs backdrop-blur-sm transition cursor-pointer"
                      title="View Full Size"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Style Switcher Bar in Image Bottom */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1 p-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[10px]">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleSourceType(asset, 'photo')}
                      className={`px-2 py-0.5 rounded-md font-medium flex items-center gap-1 transition cursor-pointer ${
                        isPhoto
                          ? 'bg-neutral-700 text-white shadow-xs'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                      title="Topic-Curated HD Photo"
                    >
                      <Camera className="w-3 h-3 text-emerald-400" />
                      <span>HD Photo</span>
                    </button>

                    <button
                      onClick={() => handleToggleSourceType(asset, 'ai')}
                      className={`px-2 py-0.5 rounded-md font-medium flex items-center gap-1 transition cursor-pointer ${
                        !isPhoto
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                      title="Bespoke AI Synthesized Graphic"
                    >
                      <Wand2 className="w-3 h-3 text-indigo-300" />
                      <span>AI Bespoke</span>
                    </button>
                  </div>

                  {isPhoto ? (
                    <button
                      onClick={() => handleNextPhotoVariation(asset)}
                      className="px-2 py-0.5 text-neutral-300 hover:text-white flex items-center gap-1 hover:bg-white/10 rounded transition cursor-pointer"
                      title="Cycle alternative topic photo"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Next Angle</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegenerateAi(asset)}
                      className="px-2 py-0.5 text-neutral-300 hover:text-white flex items-center gap-1 hover:bg-white/10 rounded transition cursor-pointer"
                      title="Re-roll AI image"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Re-roll</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Content Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm text-white line-clamp-1">
                      {asset.sectionTitle || 'Section Visual Asset'}
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-400 italic mt-0.5 line-clamp-2">
                    &ldquo;{asset.caption}&rdquo;
                  </p>
                </div>

                {/* SEO Alt-Text Box with 1-click copy */}
                <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-1">
                    <span className="font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                      <span>SEO Alt Text</span>
                    </span>
                    <button
                      onClick={() => handleCopyAlt(asset.id, asset.altText)}
                      className="flex items-center gap-1 text-neutral-400 hover:text-white transition cursor-pointer"
                      title="Copy Alt Text"
                    >
                      {copiedId === asset.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-neutral-300 font-mono line-clamp-2 leading-relaxed">
                    {asset.altText}
                  </p>
                </div>

                {/* Custom AI Prompt Editor (expandable) */}
                {editingPromptId === asset.id ? (
                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-indigo-500/40 space-y-2">
                    <label className="text-[10px] font-semibold text-indigo-300 uppercase tracking-wider">
                      Custom Visual Prompt:
                    </label>
                    <textarea
                      value={customPromptText}
                      onChange={(e) => setCustomPromptText(e.target.value)}
                      rows={2}
                      className="w-full text-xs bg-neutral-900 border border-neutral-700 rounded p-1.5 text-white focus:outline-hidden focus:border-indigo-500 resize-none font-mono"
                      placeholder="Describe what to generate..."
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingPromptId(null)}
                        className="px-2 py-1 text-[10px] text-neutral-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleRegenerateAi(asset, customPromptText)}
                        className="px-2.5 py-1 text-[10px] font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded flex items-center gap-1 cursor-pointer"
                      >
                        <Wand2 className="w-3 h-3" />
                        <span>Generate</span>
                      </button>
                    </div>
                  </div>
                ) : null}

                {/* Card Footer: Status & Download */}
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setEditingPromptId(asset.id);
                      setCustomPromptText(asset.prompt || asset.altText);
                    }}
                    className="text-[10px] text-neutral-400 hover:text-indigo-300 flex items-center gap-1 transition cursor-pointer"
                    title="Customize visual generation prompt"
                  >
                    <Settings2 className="w-3 h-3" />
                    <span>Edit Prompt</span>
                  </button>

                  <button
                    onClick={() => handleDownloadSingle(asset)}
                    disabled={!asset.imageUrl || downloadingId === asset.id}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {downloadingId === asset.id ? 'Saving...' : 'Download Image'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-w-4xl w-full bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-black flex items-center justify-center">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.altText}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (selectedImage.fallbackUrl && e.currentTarget.src !== selectedImage.fallbackUrl) {
                    e.currentTarget.src = selectedImage.fallbackUrl;
                  }
                }}
                className="max-h-[72vh] w-auto object-contain"
              />
            </div>
            <div className="p-4 flex items-center justify-between bg-neutral-900 border-t border-neutral-800">
              <div className="max-w-xl">
                <h4 className="font-bold text-white text-sm">{selectedImage.sectionTitle}</h4>
                <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{selectedImage.altText}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadSingle(selectedImage)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Quality</span>
                </button>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
