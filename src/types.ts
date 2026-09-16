export interface KeywordData {
  keyword: string;
  intent: 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';
  difficulty: 'Low' | 'Medium' | 'High';
  searchVolumeIndex: string;
  cpc: string;
  relevance: string;
}

export interface InternalLinkSuggestion {
  anchorText: string;
  targetTopic: string;
  suggestedUrl: string;
  contextSentence: string;
  seoRationale: string;
}

export interface VisualAsset {
  id: string;
  role: 'hero' | 'infographic' | 'section_break';
  sectionTitle: string;
  altText: string;
  caption: string;
  prompt: string;
  aspectRatio: '16:9' | '4:3' | '1:1';
  imageUrl?: string;
  fallbackUrl?: string;
  aiImageUrl?: string;
  sourceType?: 'photo' | 'ai';
  topicCategory?: string;
  isGenerating?: boolean;
}

export interface SeoAuditChecklist {
  rule: string;
  status: 'pass' | 'warning' | 'info';
  note: string;
}

export interface SeoAudit {
  score: number;
  wordCount: number;
  readingTimeMinutes: number;
  keywordDensity: string;
  readabilityGrade: string;
  checklist: SeoAuditChecklist[];
}

export interface BlogPostData {
  id: string;
  createdAt: string;
  promptSentence: string;
  brandVoice: string;
  title: string;
  slug: string;
  metaDescription: string;
  primaryKeyword: KeywordData;
  secondaryKeywords: KeywordData[];
  headingOutline: Array<{
    level: 'h2' | 'h3';
    text: string;
    seoPurpose: string;
  }>;
  contentMarkdown: string;
  internalLinkingSuggestions: InternalLinkSuggestion[];
  visualAssets: VisualAsset[];
  seoAudit: SeoAudit;
  schemaMarkup?: {
    type: string;
    jsonLd: string;
  };
}

export type BrandVoicePreset = 
  | 'Authoritative & Expert'
  | 'Engaging & Conversational'
  | 'Inspiring & Story-driven'
  | 'Tactical & How-To Guide'
  | 'Minimalist & Direct';

export type ExportFormat = 'markdown' | 'pdf' | 'word';
