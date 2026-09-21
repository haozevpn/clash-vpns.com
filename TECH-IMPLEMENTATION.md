# 技术实现参考文档

## 一、推荐技术栈方案

### 方案 A：Next.js + MDX（推荐）

**优势：**
- SEO 优化极佳（SSG/SSR）
- 开发体验好，生态完善
- 支持 MDX，可在 Markdown 中嵌入 React 组件
- Vercel 部署简单，全球 CDN

**技术组成：**
```
Next.js 14+ (App Router)
├── TypeScript
├── Tailwind CSS
├── MDX（文章内容）
├── ContentLayer / next-mdx-remote（内容管理）
└── Vercel（部署）
```

**项目结构：**
```
/app
  /page.tsx                    # 首页
  /airport-reviews
    /page.tsx                  # 测评分类首页
    /[slug]
      /page.tsx                # 单个测评页
  /rankings
    /page.tsx                  # 榜单首页
    /[slug]
      /page.tsx                # 单个榜单页
  /tutorials
    /[slug]
      /page.tsx                # 教程页

/content
  /airports
    /airport-a.mdx             # 测评文章（MDX格式）
    /airport-b.mdx
  /rankings
    /best-overall.mdx
  /tutorials
    /clash-tutorial.mdx

/components
  /AirportCard.tsx             # 机场卡片组件
  /RankingItem.tsx             # 榜单条目组件
  /ComparisonTable.tsx         # 对比表格组件

/lib
  /airports.ts                 # 机场数据处理
  /seo.ts                      # SEO 工具函数

/public
  /images
    /airports                  # 机场相关图片
```

**快速启动：**
```bash
npx create-next-app@latest airport-reviews --typescript --tailwind --app
cd airport-reviews
npm install contentlayer next-contentlayer
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm run dev
```

---

### 方案 B：Astro（最佳性能）

**优势：**
- 性能极致（默认零 JS）
- 专为内容网站设计
- 可混用多框架（React/Vue/Svelte）
- 构建速度快

**技术组成：**
```
Astro 4+
├── TypeScript
├── Tailwind CSS
├── Markdown / MDX
└── Cloudflare Pages / Netlify
```

**项目结构：**
```
/src
  /pages
    /index.astro               # 首页
    /airport-reviews
      /[...slug].astro         # 测评页（动态路由）
    /rankings
      /[...slug].astro

  /content
    /config.ts                 # Content Collection 配置
    /airports
      /airport-a.md
    /rankings
      /best-overall.md

  /components
    /AirportCard.astro
    /RankingItem.astro

  /layouts
    /BaseLayout.astro
    /ArticleLayout.astro
```

**快速启动：**
```bash
npm create astro@latest airport-reviews
cd airport-reviews
npm install
npm run dev
```

---

### 方案 C：Hugo（极简方案）

**优势：**
- 构建速度最快
- 无需 Node.js
- 部署简单
- 适合纯静态内容

**技术组成：**
```
Hugo
├── Markdown
├── Go Templates
└── 任意静态托管
```

**快速启动：**
```bash
brew install hugo  # macOS
hugo new site airport-reviews
cd airport-reviews
hugo server
```

---

## 二、数据结构设计

### 2.1 机场测评数据结构（YAML Frontmatter）

```yaml
---
# 基本信息
title: "[机场名称] 测评 - 速度/价格/解锁能力完整评测"
slug: "airport-a"
description: "[机场名称]真实测评：速度测试XX Mbps、价格¥XX/月起..."
publishDate: "2026-09-02"
updateDate: "2026-09-02"
author: "测评团队"
category: "airport-reviews"
tags:
  - "高性价比"
  - "流媒体解锁"
  - "ChatGPT可用"

# SEO
metaTitle: "[机场名称] 测评 - 速度/价格/解锁能力完整评测（2026年9月更新）"
metaDescription: "[机场名称]真实测评：速度测试45 Mbps、价格¥19/月起、支持Netflix/ChatGPT。更新时间：2026年9月。"
canonicalUrl: "https://example.com/airport-reviews/airport-a/"

# 评分数据
rating:
  overall: 8.2
  speed: 8.5
  stability: 8.0
  unlock: 9.0
  price: 8.5
  service: 7.5

# 基本信息
info:
  establishedDate: "2025-03-01"
  operationMonths: 18
  paymentMethods:
    - "支付宝"
    - "微信"
    - "USDT"
  nodeCount: 35
  regions:
    - "香港"
    - "台湾"
    - "日本"
    - "新加坡"
    - "美国"
  protocols:
    - "Shadowsocks"
    - "VMess"
    - "Trojan"
  platforms:
    - "Windows"
    - "macOS"
    - "iOS"
    - "Android"
    - "Linux"

# 价格套餐
pricing:
  - name: "基础版"
    monthlyPrice: 19
    annualPrice: 180
    traffic: "100GB"
    devices: 3
    recommended: false
  - name: "标准版"
    monthlyPrice: 29
    annualPrice: 280
    traffic: "200GB"
    devices: 5
    recommended: true
  - name: "高级版"
    monthlyPrice: 49
    annualPrice: 480
    traffic: "500GB"
    devices: 10
    recommended: false

# 速度测试
speedTest:
  testDate: "2026-09-02"
  testTime: "20:00-22:00"
  testEnv: "电信100M宽带，北京地区，晚高峰"
  averageSpeed: 45
  results:
    - node: "香港 IPLC 01"
      download: 52
      upload: 48
      latency: 45
    - node: "日本 BGP 02"
      download: 38
      upload: 35
      latency: 68
    - node: "美国 CN2 03"
      download: 41
      upload: 32
      latency: 165
    - node: "新加坡专线 04"
      download: 47
      upload: 44
      latency: 72

# 流媒体解锁
streaming:
  testDate: "2026-09-02"
  results:
    - platform: "Netflix"
      unlocked: true
      regions: ["香港", "日本", "美国"]
      nodes: ["香港、日本、美国节点"]
    - platform: "Disney+"
      unlocked: true
      regions: ["香港", "新加坡"]
      nodes: ["香港、新加坡节点"]
    - platform: "YouTube Premium"
      unlocked: true
      regions: ["全部"]
      nodes: ["全部节点"]
    - platform: "HBO Max"
      unlocked: false
      regions: []
      nodes: ["美国节点测试失败"]
    - platform: "TikTok"
      unlocked: true
      regions: ["日本", "美国"]
      nodes: ["日本、美国节点"]

# AI 工具测试
aiTools:
  testDate: "2026-09-02"
  chatgpt:
    available: true
    notes: "香港、日本、美国节点均可"
  claude:
    available: true
    notes: "美国节点稳定"
  gemini:
    available: true
    notes: "全部节点"
  midjourney:
    available: true
    notes: "无限制"

# 优缺点
pros:
  - "速度稳定，晚高峰表现优秀"
  - "主流流媒体解锁能力强"
  - "支持主流 AI 工具"
  - "价格适中，性价比不错"
  - "客服响应及时"

cons:
  - "无免费试用，需直接购买"
  - "HBO Max 未能解锁"
  - "部分节点晚高峰拥堵"
  - "无退款政策"
  - "节点更新频率一般"

# 稳定性数据
stability:
  monitoringPeriod: 30
  uptime: 98.5
  peakHourSpeedDrop: "20-30%"
  nodeUpdateFrequency: "每月2-3个节点"
  customerServiceResponse: "工单平均2小时"

# 适用人群
suitableFor:
  recommended:
    - "日常浏览、学习、办公需求的用户"
    - "需要观看 Netflix、Disney+ 的流媒体用户"
    - "使用 ChatGPT、Claude 等 AI 工具的用户"
    - "预算在 ¥20-50/月 的用户"
  notRecommended:
    - "需要超低延迟的游戏玩家"
    - "需要大流量下载的用户"
    - "对 HBO Max 有强需求的用户"
    - "需要7×24小时在线的商业用户"

# 外部链接
officialUrl: "https://example.com"
affiliateUrl: "https://example.com?ref=xxx"

# 特殊标记
featured: true      # 是否为精选推荐
isNew: false        # 是否为新机场（运营<6个月）
hasFreeTrial: false # 是否有免费试用
---

# 文章正文（Markdown）

## 快速结论

[机场名称] 是一家...

## 基本信息

（引用上面的 YAML 数据自动渲染）

...
```

---

### 2.2 榜单数据结构

```yaml
---
title: "2026年9月机场推荐榜单 - 综合性价比排名"
slug: "best-overall-2026-09"
description: "2026年9月更新：基于真实测试的机场推荐榜单..."
publishDate: "2026-09-01"
updateDate: "2026-09-01"
category: "rankings"
rankingType: "best-overall"

# SEO
metaTitle: "2026年9月机场推荐榜单 - 综合性价比排名 | 机场测评"
metaDescription: "2026年9月更新：基于真实测试的机场推荐榜单，包含速度、价格、流媒体解锁、AI工具适配等多维度对比。"

# 榜单条目
rankings:
  - rank: 1
    airportSlug: "airport-a"    # 关联到测评文章
    airportName: "机场A"
    subtitle: "全能型选手，各方面表现均衡"
    overallScore: 8.6
    avgSpeed: 48
    recommendedPrice: 29
    streamingScore: "9/10"
    operationMonths: 18
    highlights:
      - "ChatGPT"
      - "Netflix"
      - "Disney+"
      - "稳定性高"
    reason: "[机场A] 是一家运营超过1年半的老牌机场，在我们的长期监测中表现稳定..."

  - rank: 2
    airportSlug: "airport-b"
    airportName: "机场B"
    subtitle: "性价比之王，适合预算有限用户"
    overallScore: 8.3
    avgSpeed: 42
    recommendedPrice: 19
    streamingScore: "7/10"
    operationMonths: 14
    highlights:
      - "ChatGPT"
      - "Netflix"
      - "性价比高"
    reason: "[机场B] 以高性价比著称..."

# 评分方法说明
methodology:
  speed: 30
  stability: 25
  unlock: 20
  price: 15
  service: 10
---

# 榜单正文
...
```

---

## 三、组件示例代码

### 3.1 机场卡片组件（React/Next.js）

```tsx
// components/AirportCard.tsx
import Link from 'next/link';
import type { Airport } from '@/types';

interface AirportCardProps {
  airport: Airport;
  showUpdateBadge?: boolean;
}

export function AirportCard({ airport, showUpdateBadge }: AirportCardProps) {
  return (
    <div className="relative bg-white border border-[#E7E1D7] rounded-xl p-8 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-[#C4612F]">
      {showUpdateBadge && (
        <span className="absolute top-4 right-4 bg-[#F2E3D6] text-[#C4612F] text-xs font-medium px-3 py-1 rounded-full">
          {airport.updateDate}更新
        </span>
      )}

      <h3 className="text-2xl font-medium mb-3">
        <Link 
          href={`/airport-reviews/${airport.slug}`}
          className="text-[#1F2421] hover:text-[#C4612F] transition-colors"
        >
          {airport.info.name}
        </Link>
      </h3>

      <div className="flex flex-wrap gap-3 mb-4">
        <MetaChip 
          icon="⚡" 
          label={`均速 ${airport.speedTest.averageSpeed} Mbps`} 
        />
        <MetaChip 
          icon="💰" 
          label={`¥${airport.pricing.find(p => p.recommended)?.monthlyPrice}/月起`} 
        />
        <MetaChip 
          icon="⭐" 
          label={`${airport.rating.overall}分`} 
        />
      </div>

      <p className="text-[#5C635D] text-sm leading-relaxed mb-4">
        {airport.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {airport.aiTools.chatgpt.available && (
          <Tag variant="green">✓ ChatGPT</Tag>
        )}
        {airport.streaming.results.find(s => s.platform === 'Netflix')?.unlocked && (
          <Tag variant="green">✓ Netflix</Tag>
        )}
        {airport.pricing.some(p => p.monthlyPrice > 0) && (
          <Tag>支持月付</Tag>
        )}
      </div>

      <Link 
        href={`/airport-reviews/${airport.slug}`}
        className="text-[#C4612F] font-medium text-sm hover:text-[#A94E22] inline-flex items-center gap-1"
      >
        查看完整测评 →
      </Link>
    </div>
  );
}

function MetaChip({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 bg-[#FBF9F5] px-3 py-2 rounded-full text-sm text-[#5C635D]">
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
}

function Tag({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'green' }) {
  const bgColor = variant === 'green' ? 'bg-[#D1FAE5] text-[#047857]' : 'bg-[#F2E3D6] text-[#C4612F]';
  
  return (
    <span className={`${bgColor} px-3 py-1 rounded-full text-xs font-medium`}>
      {children}
    </span>
  );
}
```

### 3.2 数据对比表格组件

```tsx
// components/ComparisonTable.tsx
import type { Airport } from '@/types';

interface ComparisonTableProps {
  airports: Airport[];
}

export function ComparisonTable({ airports }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white border border-[#E7E1D7] rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#FBF9F5]">
            <th className="text-left p-4 font-medium text-sm text-[#1F2421]">机场名称</th>
            <th className="text-left p-4 font-medium text-sm text-[#1F2421]">综合评分</th>
            <th className="text-left p-4 font-medium text-sm text-[#1F2421]">平均速度</th>
            <th className="text-left p-4 font-medium text-sm text-[#1F2421]">推荐价格</th>
            <th className="text-left p-4 font-medium text-sm text-[#1F2421]">流媒体</th>
            <th className="text-left p-4 font-medium text-sm text-[#1F2421]">AI工具</th>
          </tr>
        </thead>
        <tbody>
          {airports.map((airport, index) => (
            <tr 
              key={airport.slug}
              className={`border-t border-[#E7E1D7] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FBF9F5]/30'}`}
            >
              <td className="p-4">
                <Link 
                  href={`/airport-reviews/${airport.slug}`}
                  className="font-medium text-[#C4612F] hover:text-[#A94E22]"
                >
                  {airport.info.name}
                </Link>
              </td>
              <td className="p-4 text-sm">{airport.rating.overall}</td>
              <td className="p-4 text-sm">{airport.speedTest.averageSpeed} Mbps</td>
              <td className="p-4 text-sm">
                ¥{airport.pricing.find(p => p.recommended)?.monthlyPrice}/月
              </td>
              <td className="p-4 text-sm">
                {airport.streaming.results.filter(s => s.unlocked).length}/
                {airport.streaming.results.length}
              </td>
              <td className="p-4 text-sm">
                {airport.aiTools.chatgpt.available && '✓ '}
                {airport.aiTools.claude.available && '✓ '}
                {airport.aiTools.gemini.available && '✓ '}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 四、SEO 优化实现

### 4.1 Next.js Metadata API

```tsx
// app/airport-reviews/[slug]/page.tsx
import { Metadata } from 'next';
import { getAirportBySlug } from '@/lib/airports';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const airport = await getAirportBySlug(params.slug);
  
  if (!airport) {
    return {
      title: '机场测评 | 未找到页面',
    };
  }

  return {
    title: airport.metaTitle,
    description: airport.metaDescription,
    openGraph: {
      title: airport.metaTitle,
      description: airport.metaDescription,
      type: 'article',
      publishedTime: airport.publishDate,
      modifiedTime: airport.updateDate,
      authors: [airport.author],
      url: airport.canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: airport.metaTitle,
      description: airport.metaDescription,
    },
    alternates: {
      canonical: airport.canonicalUrl,
    },
  };
}
```

### 4.2 结构化数据（JSON-LD）

```tsx
// components/ReviewSchema.tsx
import type { Airport } from '@/types';

export function ReviewSchema({ airport }: { airport: Airport }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: airport.info.name,
      description: airport.description,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: airport.rating.overall,
      bestRating: 10,
    },
    author: {
      '@type': 'Organization',
      name: '机场测评',
    },
    datePublished: airport.publishDate,
    dateModified: airport.updateDate,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 4.3 Sitemap 生成

```tsx
// app/sitemap.ts
import { getAllAirports } from '@/lib/airports';
import { getAllRankings } from '@/lib/rankings';

export default async function sitemap() {
  const airports = await getAllAirports();
  const rankings = await getAllRankings();
  
  const airportUrls = airports.map((airport) => ({
    url: `https://example.com/airport-reviews/${airport.slug}`,
    lastModified: airport.updateDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const rankingUrls = rankings.map((ranking) => ({
    url: `https://example.com/rankings/${ranking.slug}`,
    lastModified: ranking.updateDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...airportUrls,
    ...rankingUrls,
  ];
}
```

---

## 五、性能优化建议

### 5.1 图片优化

```tsx
// 使用 Next.js Image 组件
import Image from 'next/image';

<Image
  src="/images/airports/airport-a.jpg"
  alt="机场A速度测试截图"
  width={800}
  height={450}
  loading="lazy"
  placeholder="blur"
/>
```

### 5.2 字体优化

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const fraunces = localFont({
  src: '../public/fonts/Fraunces-Variable.woff2',
  display: 'swap',
  variable: '--font-fraunces',
});
```

### 5.3 代码分割

```tsx
// 动态导入重型组件
import dynamic from 'next/dynamic';

const ComparisonTool = dynamic(() => import('@/components/ComparisonTool'), {
  loading: () => <p>加载中...</p>,
  ssr: false, // 仅客户端渲染
});
```

---

## 六、部署配置

### 6.1 Vercel 配置（vercel.json）

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/vpn-reviews/:slug",
      "destination": "/airport-reviews/:slug",
      "permanent": true
    }
  ]
}
```

### 6.2 环境变量

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_SITE_NAME=机场测评

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 如果使用 CMS
CMS_API_KEY=your_api_key_here
```

---

## 七、内容管理工作流

### 7.1 Git 工作流

```bash
# 1. 创建新测评文章
git checkout -b review/airport-x

# 2. 创建文章文件
touch content/airports/airport-x.mdx

# 3. 填写测评数据（使用模板）
# 4. 本地预览
npm run dev

# 5. 提交
git add .
git commit -m "feat: 新增 机场X 测评"
git push origin review/airport-x

# 6. 合并到主分支后自动部署
```

### 7.2 每月更新流程

```bash
# 1. 重新测试头部10家机场
# 2. 更新 MDX 文件中的数据
# 3. 修改 updateDate 字段
# 4. 更新榜单文章
# 5. 提交并部署
```

---

## 八、监测与分析

### 8.1 Google Analytics 4 设置

```tsx
// app/layout.tsx
import Script from 'next/script';

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
</Script>
```

### 8.2 事件追踪

```tsx
// 追踪外链点击
function trackAffiliateClick(airportName: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'affiliate_click', {
      event_category: 'outbound',
      event_label: airportName,
    });
  }
}

<a 
  href={airport.affiliateUrl}
  onClick={() => trackAffiliateClick(airport.info.name)}
  target="_blank"
  rel="nofollow noopener noreferrer"
>
  访问官网
</a>
```

---

**文档版本：** 1.0  
**最后更新：** 2026年9月4日