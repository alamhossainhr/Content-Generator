export type TopicCategory =
  | 'workplace_hr'
  | 'remote_work'
  | 'tech_software'
  | 'finance_business'
  | 'marketing_seo'
  | 'health_wellness'
  | 'sustainability_eco'
  | 'education_learning'
  | 'food_hospitality'
  | 'ecommerce_retail'
  | 'general_editorial';

interface TopicImageCollection {
  hero: string[];
  infographic: string[];
  section_break: string[];
}

export const TOPIC_CURATED_IMAGES: Record<TopicCategory, TopicImageCollection> = {
  workplace_hr: {
    hero: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c', // professional team collaborating in modern office around laptop
      'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9', // corporate team in strategic discussion
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf', // diverse colleagues working in bright office
    ],
    infographic: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40', // project roadmap planning document with pens & charts
      'https://images.unsplash.com/photo-1552664730-d307ca884978', // strategy whiteboard session with timeline milestones
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf', // executive business growth plan
    ],
    section_break: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2', // supportive 1-on-1 employee wellness check-in
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d', // teamwork celebration & high morale
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca', // teamwork hands together
    ],
  },
  remote_work: {
    hero: [
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643', // clean modern home office desk with laptop and coffee
      'https://images.unsplash.com/photo-1587614382346-4ec70e388b28', // remote professional working on laptop with morning beverage
      'https://images.unsplash.com/photo-1593062096033-9a26b09da705', // ergonomic home office setup
    ],
    infographic: [
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe', // daily planner notebook and productivity schedule
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b', // checklist notepad and task roadmap
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173', // organized work plan
    ],
    section_break: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd', // warm fresh pour-over coffee morning ritual
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952', // remote team virtual collaboration
      'https://images.unsplash.com/photo-1527689368864-3a821dbccc34', // digital nomad workspace
    ],
  },
  tech_software: {
    hero: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c', // software engineer dual-monitor coding setup
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97', // developer coding in dark mode on laptop
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', // engineering team brainstorming system architecture
    ],
    infographic: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71', // analytics dashboard charts and data metrics
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', // cyber code matrix visualization
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3', // data graphs on screen
    ],
    section_break: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475', // advanced technological motherboard and microprocessor
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1', // futuristic technological interface
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2', // modern laptop and tech gadgets
    ],
  },
  finance_business: {
    hero: [
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d', // strategic investment review and business consulting
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab', // corporate skyscraper finance district
      'https://images.unsplash.com/photo-1450133064473-71024230f91b', // executive financial handshake
    ],
    infographic: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f', // financial revenue growth graphs and marketing charts
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f', // stock market trading charts
      'https://images.unsplash.com/photo-1543286386-713bdd548da4', // business growth charts
    ],
    section_break: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c', // calculator, contracts, and financial documents
      'https://images.unsplash.com/photo-1565372195458-9de0b320ef04', // modern financial office
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3', // financial exchange visual
    ],
  },
  marketing_seo: {
    hero: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0', // creative marketing team planning campaign strategy
      'https://images.unsplash.com/photo-1542744094-3a31f272c490', // SEO and web traffic optimization strategy meeting
      'https://images.unsplash.com/photo-1533750516457-a7f992034fec', // digital marketing analytics
    ],
    infographic: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f', // search visibility ranking chart and conversion funnel
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71', // marketing KPI analytics
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8', // digital design workflow
    ],
    section_break: [
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a', // content creation notes, tablet, and moodboard
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643', // copywriting workspace
      'https://images.unsplash.com/photo-1557804506-e969d7b32a21', // creative brainstorming
    ],
  },
  health_wellness: {
    hero: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b', // morning yoga, mindfulness meditation, and stretching
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773', // mindful meditation in bright peaceful space
      'https://images.unsplash.com/photo-1518611012118-696072aa579a', // active energizing workout
    ],
    infographic: [
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352', // organic wholesome nutrition bowl and meal planning
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061', // colorful balanced healthy diet ingredients
      'https://images.unsplash.com/photo-1494597564530-871f2b93ac55', // nutrition tracker and water bottle
    ],
    section_break: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a', // physical vitality and wellness
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd', // fitness equipment and active routine
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773', // peaceful mental clarity
    ],
  },
  sustainability_eco: {
    hero: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09', // zero-waste reusable lifestyle accessories and plants
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18', // eco-friendly sustainable bamboo and glass materials
      'https://images.unsplash.com/photo-1542224566-6e85f2e6772f', // sustainable green energy and architecture
    ],
    infographic: [
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18', // eco living product flat lay
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b', // recycling and clean materials
      'https://images.unsplash.com/photo-1509391365360-2e959784a276', // solar renewable clean energy
    ],
    section_break: [
      'https://images.unsplash.com/photo-1511497584788-87676104235f', // lush green forest with morning sun rays
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8', // natural woodland path
      'https://images.unsplash.com/photo-1448375240586-882707db888b', // peaceful nature sunlight
    ],
  },
  education_learning: {
    hero: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644', // university study group collaborating around books and laptops
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655', // mentor coaching student in modern learning space
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6', // academic library with books
    ],
    infographic: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173', // structured study notes and learning roadmap
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8', // textbooks and highlighter study plan
      'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e', // online learning laptop
    ],
    section_break: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', // digital e-learning interface
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b', // books and educational knowledge
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8', // study focus
    ],
  },
  food_hospitality: {
    hero: [
      'https://images.unsplash.com/photo-1507133750040-4a8f57021571', // barista crafting specialty artisan espresso
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5', // welcoming modern restaurant dining
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4', // vibrant bistro dining room
    ],
    infographic: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d', // fresh gourmet culinary ingredients in organized flat lay
      'https://images.unsplash.com/photo-1495521821757-a1efb6729352', // baking recipe preparation
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327', // food presentation platter
    ],
    section_break: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24', // cozy neighborhood coffee shop ambiance
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb', // cafe window counter
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31', // coffee roasting process
    ],
  },
  ecommerce_retail: {
    hero: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d', // modern logistics and package fulfillment center
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc', // boutique retail storefront
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8', // clothing retail showroom
    ],
    infographic: [
      'https://images.unsplash.com/photo-1556742049-0a67c5574f73', // mobile commerce payment and digital checkout
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3', // credit card payment security
      'https://images.unsplash.com/photo-1580910051074-3eb694886505', // phone shopping app
    ],
    section_break: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48', // premium branded parcel delivery unboxing
      'https://images.unsplash.com/photo-1526178613552-2b45c6c302f0', // packages ready for dispatch
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d', // warehouse distribution
    ],
  },
  general_editorial: {
    hero: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab', // modern architectural corporate skyline
      'https://images.unsplash.com/photo-1497366216548-37526070297c', // contemporary architectural office building
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174', // clean open-plan corporate headquarters
    ],
    infographic: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40', // strategic workflow planning chart
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf', // corporate roadmap diagram
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71', // analytics dashboard
    ],
    section_break: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4', // creative workspace collaboration
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', // group discussion
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d', // collaborative team
    ],
  },
};

/**
 * Accurately detects the primary topical vertical from user input text or keywords
 */
export function detectTopicCategory(text: string): TopicCategory {
  const lower = (text || '').toLowerCase();

  // 1. Workplace / HR / Employee / Attendance / Absenteeism / Management
  if (
    lower.includes('absentee') ||
    lower.includes('attendance') ||
    lower.includes('employee') ||
    lower.includes('staff') ||
    lower.includes('morale') ||
    lower.includes('turnover') ||
    lower.includes('human resource') ||
    lower.includes('hr ') ||
    lower.includes('retention') ||
    lower.includes('manager') ||
    lower.includes('management') ||
    lower.includes('leadership') ||
    lower.includes('workplace') ||
    lower.includes('coworker') ||
    lower.includes('team dynamic') ||
    lower.includes('burnout')
  ) {
    return 'workplace_hr';
  }

  // 2. Remote Work / WFH / Home Office / Morning Routine
  if (
    lower.includes('remote work') ||
    lower.includes('work from home') ||
    lower.includes('wfh') ||
    lower.includes('home office') ||
    lower.includes('digital nomad') ||
    lower.includes('morning routine') ||
    lower.includes('hybrid work') ||
    lower.includes('telecommut')
  ) {
    return 'remote_work';
  }

  // 3. Sustainability / Zero Waste / Eco / Green
  if (
    lower.includes('zero waste') ||
    lower.includes('sustainab') ||
    lower.includes('eco-friendly') ||
    lower.includes('eco friendly') ||
    lower.includes('climate') ||
    lower.includes('green living') ||
    lower.includes('plastic free') ||
    lower.includes('reusable') ||
    lower.includes('carbon footprint')
  ) {
    return 'sustainability_eco';
  }

  // 4. Technology / Software / Coding / AI
  if (
    lower.includes('software') ||
    lower.includes('develop') ||
    lower.includes('coding') ||
    lower.includes('programming') ||
    lower.includes('artificial intelligence') ||
    lower.includes(' ai ') ||
    lower.includes('ai-') ||
    lower.includes('cyber') ||
    lower.includes('cloud') ||
    lower.includes('machine learning') ||
    lower.includes('kubernetes') ||
    lower.includes('microservice') ||
    lower.includes('devops') ||
    lower.includes('docker') ||
    lower.includes('database') ||
    lower.includes('frontend') ||
    lower.includes('backend') ||
    lower.includes('full stack') ||
    lower.includes('python') ||
    lower.includes('javascript') ||
    lower.includes('typescript') ||
    lower.includes('data sci') ||
    lower.includes('algorithm') ||
    lower.includes('tech')
  ) {
    return 'tech_software';
  }

  // 5. Marketing / SEO / Social Media
  if (
    lower.includes('seo') ||
    lower.includes('marketing') ||
    lower.includes('search engine') ||
    lower.includes('social media') ||
    lower.includes('content strateg') ||
    lower.includes('copywriting') ||
    lower.includes('branding') ||
    lower.includes('advertising') ||
    lower.includes('growth hack')
  ) {
    return 'marketing_seo';
  }

  // 6. Finance / Investing / Wealth / Crypto
  if (
    lower.includes('finance') ||
    lower.includes('invest') ||
    lower.includes('money') ||
    lower.includes('crypto') ||
    lower.includes('bitcoin') ||
    lower.includes('stock market') ||
    lower.includes('budget') ||
    lower.includes('wealth') ||
    lower.includes('revenue') ||
    lower.includes('profit') ||
    lower.includes('real estate')
  ) {
    return 'finance_business';
  }

  // 7. Health / Wellness / Fitness / Nutrition
  if (
    lower.includes('health') ||
    lower.includes('fitness') ||
    lower.includes('diet') ||
    lower.includes('nutrition') ||
    lower.includes('wellness') ||
    lower.includes('workout') ||
    lower.includes('exercise') ||
    lower.includes('mental health') ||
    lower.includes('meditation') ||
    lower.includes('yoga') ||
    lower.includes('sleep')
  ) {
    return 'health_wellness';
  }

  // 8. Education / Learning / Students
  if (
    lower.includes('educat') ||
    lower.includes('learn') ||
    lower.includes('student') ||
    lower.includes('course') ||
    lower.includes('university') ||
    lower.includes('college') ||
    lower.includes('school') ||
    lower.includes('study') ||
    lower.includes('teach')
  ) {
    return 'education_learning';
  }

  // 9. Food / Cooking / Restaurant / Coffee
  if (
    lower.includes('food') ||
    lower.includes('cook') ||
    lower.includes('recipe') ||
    lower.includes('restaurant') ||
    lower.includes('coffee') ||
    lower.includes('baking') ||
    lower.includes('culinary') ||
    lower.includes('cafe') ||
    lower.includes('barista')
  ) {
    return 'food_hospitality';
  }

  // 10. E-commerce / Retail / Shopping
  if (
    lower.includes('ecommerce') ||
    lower.includes('e-commerce') ||
    lower.includes('retail') ||
    lower.includes('shopify') ||
    lower.includes('shopping') ||
    lower.includes('store') ||
    lower.includes('fulfillment')
  ) {
    return 'ecommerce_retail';
  }

  return 'general_editorial';
}

/**
 * Returns a high-resolution, content-aligned editorial photo URL with fallback
 */
export function getTopicCuratedImage(
  category: TopicCategory,
  role: 'hero' | 'infographic' | 'section_break',
  index: number,
  aspectRatio: '16:9' | '4:3' | '1:1' = '16:9'
): { imageUrl: string; fallbackUrl: string } {
  const collection = TOPIC_CURATED_IMAGES[category] || TOPIC_CURATED_IMAGES.general_editorial;
  const list = collection[role] || collection.hero;

  const basePrimary = list[index % list.length];
  const baseFallback = list[(index + 1) % list.length];

  let width = 1200;
  let height = 675; // 16:9
  if (aspectRatio === '4:3') {
    width = 1000;
    height = 750;
  } else if (aspectRatio === '1:1') {
    width = 800;
    height = 800;
  }

  const imageUrl = `${basePrimary}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
  const fallbackUrl = `${baseFallback}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;

  return { imageUrl, fallbackUrl };
}

/**
 * Returns a bespoke AI-generated visual asset via Pollinations API matching the exact prompt
 */
export function getAiGeneratedImageUrl(
  prompt: string,
  aspectRatio: '16:9' | '4:3' | '1:1' = '16:9',
  seed: number = 42
): string {
  let width = 1200;
  let height = 675;
  if (aspectRatio === '4:3') {
    width = 1000;
    height = 750;
  } else if (aspectRatio === '1:1') {
    width = 800;
    height = 800;
  }

  const cleanPrompt = encodeURIComponent(
    prompt.replace(/["']/g, '').trim() || 'high-end editorial photography in modern office'
  );

  return `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&nologo=true&seed=${seed}`;
}
