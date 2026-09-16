import React, { useState } from 'react';
import { X, FileText, FileDown, Download, Image as ImageIcon, Copy, Check, Sparkles, ExternalLink, Printer } from 'lucide-react';
import { BlogPostData } from '../types';
import { exportToMarkdown, exportToWord, exportToPdf, downloadImage } from '../utils/exportUtils';

interface DownloadModalProps {
  post: BlogPostData;
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ post, isOpen, onClose }) => {
  const [downloadingImageId, setDownloadingImageId] = useState<string | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, formatName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatName);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownloadAllImages = async () => {
    for (const asset of post.visualAssets) {
      if (asset.imageUrl) {
        await downloadImage(asset.imageUrl, `${asset.role}-${asset.id}.jpg`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/80">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-indigo-400" />
              <span>Download Publishing Package</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Select your preferred export format or save individual visual assets.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Section 1: Document Formats */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
              1. Choose Article Content Format
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option 1: Markdown */}
              <button
                onClick={() => {
                  exportToMarkdown(post);
                }}
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-800/40 hover:bg-neutral-800 hover:border-indigo-500/60 transition text-left group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <FileCodeIcon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-white group-hover:text-indigo-300">
                    Markdown (.md)
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    With YAML frontmatter, metadata headers, and link anchors.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                  <span>Download .md</span>
                  <Download className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Option 2: PDF */}
              <button
                onClick={() => {
                  exportToPdf(post);
                }}
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-800/40 hover:bg-neutral-800 hover:border-emerald-500/60 transition text-left group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <Printer className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-white group-hover:text-emerald-300">
                    PDF Document (.pdf)
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Styled print-ready PDF with metadata summary and images.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                  <span>Download / Print</span>
                  <Download className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Option 3: Word Document */}
              <button
                onClick={() => {
                  exportToWord(post);
                }}
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-800/40 hover:bg-neutral-800 hover:border-blue-500/60 transition text-left group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-white group-hover:text-blue-300">
                    Microsoft Word (.doc)
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Native Word & Google Docs formatting with tables and headings.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-blue-400 font-semibold">
                  <span>Download .doc</span>
                  <Download className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Visual Assets Download Options */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                2. Visual Asset Downloads ({post.visualAssets.length})
              </span>
              <button
                onClick={handleDownloadAllImages}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save All Images</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {post.visualAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-14 h-10 rounded-lg overflow-hidden bg-neutral-800 shrink-0 border border-neutral-700">
                      {asset.imageUrl ? (
                        <img
                          src={asset.imageUrl}
                          alt={asset.altText}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-4 h-4 m-auto text-neutral-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white truncate">
                          {asset.sectionTitle}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400 uppercase font-mono">
                          {asset.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                        Alt: {asset.altText}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      if (!asset.imageUrl) return;
                      setDownloadingImageId(asset.id);
                      try {
                        await downloadImage(asset.imageUrl, `${asset.role}-${asset.id}.jpg`);
                      } finally {
                        setDownloadingImageId(null);
                      }
                    }}
                    disabled={!asset.imageUrl || downloadingImageId === asset.id}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium flex items-center gap-1.5 shrink-0 transition cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-3 h-3 text-emerald-400" />
                    <span>
                      {downloadingImageId === asset.id ? 'Saving...' : 'Download JPG'}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Quick Clipboard Copy for CMS */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              3. Quick Copy for WordPress / Ghost / Webflow
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCopy(post.contentMarkdown, 'markdown')}
                className="px-3 py-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 text-xs text-neutral-200 flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedFormat === 'markdown' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                )}
                <span>Copy Raw Markdown</span>
              </button>

              <button
                onClick={() => handleCopy(post.metaDescription, 'meta')}
                className="px-3 py-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 text-xs text-neutral-200 flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedFormat === 'meta' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                )}
                <span>Copy Meta Description</span>
              </button>

              <button
                onClick={() => handleCopy(post.title, 'title')}
                className="px-3 py-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 text-xs text-neutral-200 flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedFormat === 'title' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                )}
                <span>Copy Title</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            Export includes SEO tags, images, and internal link suggestions.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

function FileCodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m10 13-2 2 2 2" />
      <path d="m14 17 2-2-2-2" />
    </svg>
  );
}
