import { BlogPostData, VisualAsset } from '../types';

/**
 * Downloads a text file with a given mime type and extension
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates and downloads Markdown (.md) with YAML Frontmatter
 */
export function exportToMarkdown(post: BlogPostData) {
  const frontmatter = `---
title: "${post.title.replace(/"/g, '\\"')}"
description: "${post.metaDescription.replace(/"/g, '\\"')}"
slug: "${post.slug}"
date: "${new Date(post.createdAt).toISOString().split('T')[0]}"
author: "Editorial Team"
brandVoice: "${post.brandVoice}"
primaryKeyword: "${post.primaryKeyword.keyword}"
secondaryKeywords:
${post.secondaryKeywords.map((k) => `  - "${k.keyword}"`).join('\n')}
seoScore: ${post.seoAudit.score}
wordCount: ${post.seoAudit.wordCount}
---

# ${post.title}

> **Meta Description:** ${post.metaDescription}  
> **Target Keyword:** ${post.primaryKeyword.keyword} (${post.primaryKeyword.searchVolumeIndex})

${post.visualAssets.length > 0 ? `![${post.visualAssets[0].altText}](${post.visualAssets[0].imageUrl})\n*${post.visualAssets[0].caption}*\n\n` : ''}

${post.contentMarkdown}

---

## SEO & Internal Linking Meta Reference

### Internal Link Opportunities
${post.internalLinkingSuggestions.map((link, idx) => `${idx + 1}. **Anchor:** "${link.anchorText}" -> \`${link.suggestedUrl}\`  
   - Context: *"${link.contextSentence}"*  
   - Rationale: ${link.seoRationale}`).join('\n\n')}

### Visual Assets Alt-Text Inventory
${post.visualAssets.map((v, idx) => `${idx + 1}. **${v.sectionTitle} (${v.role})**  
   - Alt Text: \`${v.altText}\`  
   - Caption: *${v.caption}*`).join('\n')}
`;

  const filename = `${post.slug || 'seo-blog-post'}.md`;
  downloadFile(frontmatter, filename, 'text/markdown;charset=utf-8');
}

/**
 * Generates and downloads a styled Microsoft Word compatible document (.doc)
 * Uses standard Word HTML markup which opens natively in Microsoft Word, Google Docs, and LibreOffice with full styling, headings, and images.
 */
export function exportToWord(post: BlogPostData) {
  // Convert simple markdown to basic HTML for Word document styling
  const lines = post.contentMarkdown.split('\n');
  let bodyHtml = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('### ')) {
      bodyHtml += `<h3 style="font-family: Arial, sans-serif; color: #334155; font-size: 14pt; margin-top: 16pt; margin-bottom: 6pt;">${escapeHtml(trimmed.replace('### ', ''))}</h3>`;
    } else if (trimmed.startsWith('## ')) {
      bodyHtml += `<h2 style="font-family: Arial, sans-serif; color: #1e293b; font-size: 17pt; margin-top: 22pt; margin-bottom: 8pt; border-bottom: 1px solid #e2e8f0; padding-bottom: 4pt;">${escapeHtml(trimmed.replace('## ', ''))}</h2>`;
    } else if (trimmed.startsWith('# ')) {
      bodyHtml += `<h1 style="font-family: Arial, sans-serif; color: #0f172a; font-size: 22pt; margin-bottom: 12pt;">${escapeHtml(trimmed.replace('# ', ''))}</h1>`;
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      bodyHtml += `<li style="font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.6; color: #334155; margin-left: 20pt;">${escapeHtml(trimmed.replace(/^[-*]\s+/, ''))}</li>`;
    } else if (trimmed.startsWith('> ')) {
      bodyHtml += `<blockquote style="font-family: Arial, sans-serif; font-size: 11pt; border-left: 3pt solid #6366f1; padding-left: 10pt; color: #475569; font-style: italic; margin: 12pt 0;">${escapeHtml(trimmed.replace('> ', ''))}</blockquote>`;
    } else if (trimmed.length > 0) {
      bodyHtml += `<p style="font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.65; color: #1e293b; margin-bottom: 10pt;">${escapeHtml(trimmed)}</p>`;
    }
  }

  const wordHtml = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(post.title)}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      margin: 1.0in 1.0in 1.0in 1.0in;
      size: letter portrait;
    }
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1e293b;
    }
    .meta-box {
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 12pt;
      margin-bottom: 20pt;
      border-radius: 6pt;
    }
    .table-custom {
      width: 100%;
      border-collapse: collapse;
      margin: 14pt 0;
    }
    .table-custom th, .table-custom td {
      border: 1px solid #cbd5e1;
      padding: 6pt 10pt;
      text-align: left;
    }
    .table-custom th {
      background-color: #f1f5f9;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="meta-box">
    <p style="margin: 0 0 4pt 0; font-size: 10pt; color: #64748b;">SEO Publishing Specification</p>
    <p style="margin: 0 0 4pt 0;"><strong>Meta Title:</strong> ${escapeHtml(post.title)}</p>
    <p style="margin: 0 0 4pt 0;"><strong>Meta Description:</strong> ${escapeHtml(post.metaDescription)}</p>
    <p style="margin: 0 0 4pt 0;"><strong>Target Keyword:</strong> ${escapeHtml(post.primaryKeyword.keyword)} | <strong>Search Volume:</strong> ${escapeHtml(post.primaryKeyword.searchVolumeIndex)} | <strong>Difficulty:</strong> ${escapeHtml(post.primaryKeyword.difficulty)}</p>
    <p style="margin: 0;"><strong>URL Slug:</strong> /blog/${escapeHtml(post.slug)}</p>
  </div>

  <h1 style="font-family: Arial, sans-serif; color: #0f172a; font-size: 24pt; margin-bottom: 12pt;">${escapeHtml(post.title)}</h1>

  ${post.visualAssets.length > 0 && post.visualAssets[0].imageUrl ? `
  <div style="margin: 16pt 0; text-align: center;">
    <img src="${post.visualAssets[0].imageUrl}" alt="${escapeHtml(post.visualAssets[0].altText)}" style="max-width: 100%; height: auto; border-radius: 6pt;" />
    <p style="font-size: 9.5pt; color: #64748b; font-style: italic; margin-top: 4pt;">${escapeHtml(post.visualAssets[0].caption)}</p>
  </div>
  ` : ''}

  ${bodyHtml}

  <div style="margin-top: 30pt; padding-top: 15pt; border-top: 2px solid #e2e8f0;">
    <h2 style="font-family: Arial, sans-serif; font-size: 16pt; color: #1e293b;">SEO Strategy & Internal Linking Map</h2>
    <table class="table-custom">
      <thead>
        <tr>
          <th>Target Anchor Text</th>
          <th>Destination Topic / URL</th>
          <th>SEO Rationale</th>
        </tr>
      </thead>
      <tbody>
        ${post.internalLinkingSuggestions.map(link => `
          <tr>
            <td><strong>${escapeHtml(link.anchorText)}</strong></td>
            <td><code>${escapeHtml(link.suggestedUrl)}</code></td>
            <td>${escapeHtml(link.seoRationale)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>`;

  const filename = `${post.slug || 'seo-blog-post'}.doc`;
  downloadFile(wordHtml, filename, 'application/msword;charset=utf-8');
}

/**
 * Triggers clean PDF generation / print view with high-contrast formatting
 */
export function exportToPdf(post: BlogPostData) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to generate and download the PDF.');
    return;
  }

  const lines = post.contentMarkdown.split('\n');
  let bodyHtml = '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('### ')) {
      bodyHtml += `<h3 class="text-xl font-bold text-slate-800 mt-6 mb-2">${escapeHtml(trimmed.replace('### ', ''))}</h3>`;
    } else if (trimmed.startsWith('## ')) {
      bodyHtml += `<h2 class="text-2xl font-bold text-slate-900 mt-8 mb-3 pb-2 border-b border-slate-200">${escapeHtml(trimmed.replace('## ', ''))}</h2>`;
    } else if (trimmed.startsWith('# ')) {
      bodyHtml += `<h1 class="text-3xl font-extrabold text-slate-950 mb-4">${escapeHtml(trimmed.replace('# ', ''))}</h1>`;
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      bodyHtml += `<li class="text-slate-700 ml-6 list-disc mb-1 leading-relaxed">${escapeHtml(trimmed.replace(/^[-*]\s+/, ''))}</li>`;
    } else if (trimmed.startsWith('> ')) {
      bodyHtml += `<blockquote class="border-l-4 border-indigo-500 pl-4 py-2 italic text-slate-600 my-4 bg-slate-50 rounded-r">${escapeHtml(trimmed.replace('> ', ''))}</blockquote>`;
    } else if (trimmed.length > 0) {
      bodyHtml += `<p class="text-slate-800 mb-4 text-base leading-relaxed">${escapeHtml(trimmed)}</p>`;
    }
  }

  printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(post.title)} - SEO Export</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      @page { margin: 1.5cm; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
    }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  </style>
</head>
<body class="bg-white text-slate-900 p-8 max-w-4xl mx-auto">
  <div class="no-print mb-8 p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between">
    <div>
      <h2 class="font-bold text-indigo-900">PDF Print & Download Preview</h2>
      <p class="text-sm text-indigo-700">Click the button on the right to trigger print / "Save as PDF".</p>
    </div>
    <button onclick="window.print()" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm">
      Print / Save as PDF
    </button>
  </div>

  <div class="border border-slate-200 rounded-xl p-6 bg-slate-50/50 mb-8">
    <div class="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
      <span class="text-xs font-bold uppercase tracking-wider text-slate-500">SEO Content Specification</span>
      <span class="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">SEO Score: ${post.seoAudit.score}/100</span>
    </div>
    <div class="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p class="text-slate-500 text-xs">Primary Keyword</p>
        <p class="font-semibold text-slate-900">${escapeHtml(post.primaryKeyword.keyword)} <span class="text-xs text-slate-500">(${post.primaryKeyword.searchVolumeIndex})</span></p>
      </div>
      <div>
        <p class="text-slate-500 text-xs">Search Intent</p>
        <p class="font-semibold text-slate-900">${escapeHtml(post.primaryKeyword.intent)} (${post.primaryKeyword.difficulty} Difficulty)</p>
      </div>
      <div class="col-span-2">
        <p class="text-slate-500 text-xs">Meta Description</p>
        <p class="text-slate-700">${escapeHtml(post.metaDescription)}</p>
      </div>
    </div>
  </div>

  <h1 class="text-4xl font-extrabold text-slate-950 mb-4 tracking-tight">${escapeHtml(post.title)}</h1>

  ${post.visualAssets.length > 0 && post.visualAssets[0].imageUrl ? `
  <div class="my-6 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
    <img src="${post.visualAssets[0].imageUrl}" alt="${escapeHtml(post.visualAssets[0].altText)}" class="w-full object-cover max-h-[420px]" />
    <p class="p-2.5 text-center text-xs text-slate-500 italic bg-slate-50">${escapeHtml(post.visualAssets[0].caption)}</p>
  </div>
  ` : ''}

  <div class="prose max-w-none">
    ${bodyHtml}
  </div>

  <div class="mt-12 pt-8 border-t border-slate-200">
    <h3 class="text-xl font-bold text-slate-900 mb-4">Internal Linking Strategy</h3>
    <div class="space-y-3">
      ${post.internalLinkingSuggestions.map((link) => `
        <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm">
          <p class="font-semibold text-indigo-700">Anchor: "${escapeHtml(link.anchorText)}" &rarr; <code class="text-slate-600">${escapeHtml(link.suggestedUrl)}</code></p>
          <p class="text-xs text-slate-500 mt-1">${escapeHtml(link.seoRationale)}</p>
        </div>
      `).join('')}
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`);
  printWindow.document.close();
}

/**
 * Direct file download for visual image assets
 */
export async function downloadImage(imageUrl: string, filename: string) {
  try {
    if (imageUrl.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
        return;
      }
    } catch (corsErr) {
      console.warn('Direct fetch prevented, using canvas or direct link fallback:', corsErr);
    }

    // Canvas conversion fallback
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 1200;
        canvas.height = img.naturalHeight || 675;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        }
      } catch {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = filename;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
    img.onerror = () => {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    img.src = imageUrl;
  } catch (err) {
    console.error('Image download error:', err);
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
