# Next.js + MDX 方案示例

## 项目结构

```
airport-reviews/
├── app/
│   ├── layout.tsx                 # 全局布局
│   ├── page.tsx                   # 首页
│   ├── reviews/
│   │   ├── page.tsx              # 测评列表页
│   │   └── [slug]/
│   │       └── page.tsx          # 单个测评页
│   ├── recommendations/
│   │   └── [slug]/
│   │       └── page.tsx          # 榜单页
│   └── tutorials/
│       └── [slug]/
│           └── page.tsx          # 教程页
│
├── content/
│   ├── reviews/
│   │   ├── airport-a.mdx         # 测评文章
│   │   └── airport-b.mdx
│   ├── rankings/
│   │   └── best-overall.mdx      # 榜单文章
│   └── tutorials/
│       └── clash-windows.mdx     # 教程文章
│
├── components/
│   ├── AirportCard.tsx           # 机场卡片组件
│   ├── RankingItem.tsx           # 榜单条目
│   ├── SpeedTestTable.tsx        # 速度测试表格
│   └── StreamingBadges.tsx       # 流媒体标签
│
├── lib/
│   ├── airports.ts               # 数据处理
│   └── mdx.ts                    # MDX配置
│
├── contentlayer.config.ts        # ContentLayer配置
├── next.config.js
└── package.json
```

## 1. ContentLayer 配置 (contentlayer.config.ts)

```typescript
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Review = defineDocumentType(() => ({
  name: 'Review',
  filePathPattern: `reviews/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    publishDate: { type: 'date', required: true },
    updateDate: { type: 'date', required: true },
    
    // 评分
    rating: {
      type: 'nested',
      of: {
        overall: { type: 'number' },
        speed: { type: 'number' },
        stability: { type: 'number' },
      }
    },
    
    // 价格
    pricing: {
      type: 'list',
      of: {
        type: 'nested',
        of: {
          name: { type: 'string' },
          monthlyPrice: { type: 'number' },
          traffic: { type: 'string' },
          recommended: { type: 'boolean' },
        }
      }
    },
    
    // 速度测试
    speedTest: {
      type: 'nested',
      of: {
        testDate: { type: 'string' },
        averageSpeed: { type: 'number' },
        results: {
          type: 'list',
          of: {
            type: 'nested',
            of: {
              node: { type: 'string' },
              download: { type: 'number' },
              upload: { type: 'number' },
              latency: { type: 'number' },
            }
          }
        }
      }
    },
    
    // 流媒体解锁
    streaming: {
      type: 'nested',
      of: {
        testDate: { type: 'string' },
        netflix: { type: 'boolean' },
        disneyPlus: { type: 'boolean' },
        hboMax: { type: 'boolean' },
      }
    },
    
    // AI工具
    aiTools: {
      type: 'nested',
      of: {
        chatgpt: { type: 'boolean' },
        claude: { type: 'boolean' },
        gemini: { type: 'boolean' },
      }
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/reviews/${doc._raw.flattenedPath.replace('reviews/', '')}`,
    },
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('reviews/', ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Review],
})
```

## 2. MDX 测评文章示例 (content/reviews/airport-a.mdx)

```mdx
---
title: "机场A 测评 - 速度/价格/解锁能力完整评测"
description: "机场A真实测评：速度测试45 Mbps、价格¥19/月起、支持Netflix/ChatGPT"
publishDate: "2026-09-02"
updateDate: "2026-09-02"

rating:
  overall: 8.5
  speed: 8.5
  stability: 8.0
  unlock: 9.0
  price: 8.5

pricing:
  - name: "基础版"
    monthlyPrice: 19
    traffic: "100GB"
    recommended: false
  - name: "标准版"
    monthlyPrice: 29
    traffic: "200GB"
    recommended: true

speedTest:
  testDate: "2026-09-02"
  testEnv: "电信100M，北京"
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

streaming:
  testDate: "2026-09-02"
  netflix: true
  disneyPlus: true
  hboMax: false

aiTools:
  chatgpt: true
  claude: true
  gemini: true
---

export const UpdateBadge = () => (
  <div className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
    📅 测试时间：{frontmatter.speedTest.testDate}
  </div>
)

<UpdateBadge />

# {frontmatter.title}

## 快速结论

机场A 是一家运营18个月的中端机场，主打性价比。在我们最新的测试中（2026年9月），
晚高峰平均速度达到 {frontmatter.speedTest.averageSpeed} Mbps，
支持Netflix、Disney+解锁，ChatGPT可用。

**综合评分：** {frontmatter.rating.overall}/10

## 核心数据

<div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
  <div className="bg-gray-50 p-4 rounded-lg text-center">
    <div className="text-3xl font-bold text-orange-600">{frontmatter.rating.overall}</div>
    <div className="text-sm text-gray-600 mt-1">综合评分</div>
  </div>
  <div className="bg-gray-50 p-4 rounded-lg text-center">
    <div className="text-3xl font-bold text-orange-600">{frontmatter.speedTest.averageSpeed}M</div>
    <div className="text-sm text-gray-600 mt-1">平均速度</div>
  </div>
  <div className="bg-gray-50 p-4 rounded-lg text-center">
    <div className="text-3xl font-bold text-orange-600">¥{frontmatter.pricing[0].monthlyPrice}</div>
    <div className="text-sm text-gray-600 mt-1">起步价格</div>
  </div>
  <div className="bg-gray-50 p-4 rounded-lg text-center">
    <div className="text-3xl font-bold text-orange-600">18</div>
    <div className="text-sm text-gray-600 mt-1">运营月数</div>
  </div>
</div>

## 速度测试

<SpeedTestTable data={frontmatter.speedTest.results} />

测试环境：{frontmatter.speedTest.testEnv}

<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
  <p className="font-medium">⚠️ 关于速度测试</p>
  <p className="text-sm mt-2">
    速度测试结果受多种因素影响。以上数据仅代表测试时刻的表现，
    <strong>不代表任何时候都能达到此速度</strong>。
  </p>
</div>

## 流媒体解锁

测试时间：{frontmatter.streaming.testDate}

<StreamingBadges 
  netflix={frontmatter.streaming.netflix}
  disneyPlus={frontmatter.streaming.disneyPlus}
  hboMax={frontmatter.streaming.hboMax}
/>

## 价格套餐

<div className="grid md:grid-cols-2 gap-4 my-6">
  {frontmatter.pricing.map((plan) => (
    <div key={plan.name} className={`border rounded-lg p-6 ${plan.recommended ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
      {plan.recommended && (
        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">推荐</span>
      )}
      <h3 className="text-xl font-bold mt-2">{plan.name}</h3>
      <div className="text-3xl font-bold text-orange-600 my-4">
        ¥{plan.monthlyPrice}<span className="text-base text-gray-600">/月</span>
      </div>
      <p className="text-gray-600">{plan.traffic} 流量/月</p>
    </div>
  ))}
</div>

## 相关推荐

- [2026年机场综合推荐榜单](/recommendations/best-overall)
- [高性价比机场推荐](/recommendations/budget)
- [Clash使用教程](/tutorials/clash)
```

## 3. 测评页面组件 (app/reviews/[slug]/page.tsx)

```typescript
import { allReviews } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { Metadata } from 'next'

// 自定义MDX组件
import { SpeedTestTable } from '@/components/SpeedTestTable'
import { StreamingBadges } from '@/components/StreamingBadges'

const mdxComponents = {
  SpeedTestTable,
  StreamingBadges,
}

type Props = {
  params: { slug: string }
}

// 生成元数据（SEO）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const review = allReviews.find((r) => r.slug === params.slug)
  
  if (!review) return {}

  return {
    title: review.title,
    description: review.description,
    openGraph: {
      title: review.title,
      description: review.description,
      type: 'article',
      publishedTime: review.publishDate,
      modifiedTime: review.updateDate,
    },
  }
}

// 生成静态路径
export async function generateStaticParams() {
  return allReviews.map((review) => ({
    slug: review.slug,
  }))
}

export default function ReviewPage({ params }: Props) {
  const review = allReviews.find((r) => r.slug === params.slug)

  if (!review) notFound()

  const MDXContent = useMDXComponent(review.body.code)

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* 面包屑导航 */}
      <nav className="text-sm text-gray-600 mb-8">
        <a href="/" className="hover:text-orange-600">首页</a>
        <span className="mx-2">/</span>
        <a href="/reviews" className="hover:text-orange-600">机场测评</a>
        <span className="mx-2">/</span>
        <span>{review.title}</span>
      </nav>

      {/* 渲染MDX内容 */}
      <div className="prose prose-lg max-w-none">
        <MDXContent components={mdxComponents} frontmatter={review} />
      </div>

      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Review',
            itemReviewed: {
              '@type': 'Product',
              name: review.title,
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: review.rating.overall,
              bestRating: 10,
            },
            datePublished: review.publishDate,
            dateModified: review.updateDate,
          }),
        }}
      />
    </article>
  )
}
```

## 4. 可复用组件示例

### SpeedTestTable 组件 (components/SpeedTestTable.tsx)

```typescript
type SpeedTestResult = {
  node: string
  download: number
  upload: number
  latency: number
}

export function SpeedTestTable({ data }: { data: SpeedTestResult[] }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">节点</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">下载速度</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">上传速度</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">延迟</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((result, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{result.node}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{result.download} Mbps</td>
              <td className="px-6 py-4 text-sm text-gray-900">{result.upload} Mbps</td>
              <td className="px-6 py-4 text-sm text-gray-900">{result.latency}ms</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

### StreamingBadges 组件 (components/StreamingBadges.tsx)

```typescript
type StreamingBadgesProps = {
  netflix: boolean
  disneyPlus: boolean
  hboMax: boolean
}

export function StreamingBadges({ netflix, disneyPlus, hboMax }: StreamingBadgesProps) {
  const services = [
    { name: 'Netflix', unlocked: netflix },
    { name: 'Disney+', unlocked: disneyPlus },
    { name: 'HBO Max', unlocked: hboMax },
  ]

  return (
    <div className="flex flex-wrap gap-3 my-6">
      {services.map((service) => (
        <span
          key={service.name}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            service.unlocked
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {service.unlocked ? '✓' : '✗'} {service.name}
        </span>
      ))}
    </div>
  )
}
```

## 5. 首页示例 (app/page.tsx)

```typescript
import { allReviews } from 'contentlayer/generated'
import { AirportCard } from '@/components/AirportCard'

export default function HomePage() {
  // 获取最新的3篇测评
  const latestReviews = allReviews
    .sort((a, b) => new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime())
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero区域 */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
          每月更新 · 真实测试
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          找到<span className="text-orange-600">稳定可靠</span>的
          <br />代理服务
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          客观测评、透明数据、无夸张推荐。
          我们帮助你从数十家机场中，找到真正适合你的那一个。
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/recommendations/best-overall"
            className="bg-orange-600 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-700 transition"
          >
            查看综合推荐
          </a>
          <a
            href="/tutorials/beginners-guide"
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium border border-gray-300 hover:border-orange-600 transition"
          >
            新手入门指南
          </a>
        </div>
      </section>

      {/* 最新测评 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            最新<span className="text-orange-600">测评</span>
          </h2>
          <p className="text-gray-600">基于真实网络环境的速度测试、流媒体解锁验证和价格对比</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestReviews.map((review) => (
            <AirportCard key={review.slug} review={review} />
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/reviews"
            className="text-orange-600 font-medium hover:text-orange-700"
          >
            查看全部测评 →
          </a>
        </div>
      </section>

      {/* 按需求查找 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            按需求<span className="text-orange-600">查找</span>
          </h2>
          <p className="text-gray-600">根据你的实际使用场景，快速找到合适的机场</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: '高性价比', icon: '💰', href: '/reviews/budget' },
            { name: '高速专线', icon: '⚡', href: '/reviews/high-speed' },
            { name: '流媒体', icon: '📺', href: '/reviews/streaming' },
            { name: 'AI工具', icon: '🤖', href: '/reviews/ai-tools' },
          ].map((category) => (
            <a
              key={category.name}
              href={category.href}
              className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-orange-600 hover:shadow-lg transition"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-medium text-gray-900">{category.name}</h3>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
```

## 6. package.json

```json
{
  "name": "airport-reviews",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "contentlayer build && next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "contentlayer": "^0.3.4",
    "next-contentlayer": "^0.3.4"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

## 使用流程

### 1. 创建新测评文章

只需在 `content/reviews/` 创建一个新的 `.mdx` 文件：

```bash
# 创建新文章
touch content/reviews/airport-b.mdx

# 填写frontmatter和内容
# 文章会自动被ContentLayer处理
# 自动生成路由 /reviews/airport-b
```

### 2. 本地开发

```bash
npm run dev
# 访问 http://localhost:3000
```

### 3. 部署到Vercel

```bash
# 推送到GitHub
git push origin main

# Vercel会自动部署
# 或手动部署
vercel
```

## 优势总结

✅ **类型安全** - TypeScript + ContentLayer提供完整类型提示  
✅ **自动路由** - 基于文件系统自动生成路由  
✅ **SEO优化** - 自动生成metadata和结构化数据  
✅ **开发体验** - 热更新、MDX支持  
✅ **部署简单** - Vercel一键部署  
✅ **性能优秀** - SSG预渲染，加载速度快
