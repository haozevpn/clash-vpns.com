# SEO / GEO 修订记录

修订日期：2026-11-16。生产域名：`https://clash-vpns.com`。

## 本次结果

- 保留首页 Title Tag：`2026年机场推荐：14家稳定高速机场测评 | 真实速度测试与流媒体解锁验证`，保留站点名称与统一导航。
- 更新 32 个页面标题、74 个页面描述。原有 12 个少于 25 字符的标题与 58 个少于 70 字符的描述均已处理。这些长度是本站编辑检查范围，不是 Bing 公布的排名门槛。
- 修复 11 篇被截断的文章，重新撰写稳定机场、便宜机场与 VPN 对比三个主题，沿用原 URL，避免新增重复入口。
- 77 个可索引页面与 77 条 sitemap URL 一致；共有 56 篇知识文章、7 个分类、14 家目录服务、11 家选型清单候选。Edge-X、Lumina 已在目录中，本次更新入口并补充清单，没有将它们重复计入收录数量。
- 同步页面、Open Graph、Twitter 与文章结构化数据的标题和摘要。删除无法在正文找到相同问答的 FAQ 标记，保留可见问答对应的数据。
- 更新实际修改页面的 sitemap `lastmod`。移除不准确的地理位置元标签；GEO 在这里指生成式搜索内容组织，并非给网站填写虚构地址。
- robots 使用统一的公开内容抓取规则。模板以 `noindex, follow` 排除索引，允许抓取模板使搜索引擎能读取该指令；脚本、scratch、Git 和内部文档路径不供常规抓取。
- 补齐实际存在的 `og-image.png`（1200 × 630）与可编辑源文件 `assets/social-card.svg`。
- 统计脚本从服务目录计数，避免首页精选数量影响总收录数；保留现有每日 GitHub Actions，并增加 SEO 静态校验。统计更新不等于每天重新测速，也不自动修改文章日期。

## 搜索意图与承接页面

| 核心词 | 主承接页面 | 页面用途 |
| --- | --- | --- |
| 机场推荐 | `/` | 选购入口与精选服务资料 |
| 梯子推荐 | `/guide/` | 类型、设备、月付与避坑 |
| VPN | `/knowledge/airport-vs-vpn.html` | 技术、服务、客户端与隐私区别 |
| 翻墙工具选购 | `/buying-guide/` | 场景、预算与访问要求 |
| 机场排行 | `/rankings/` | 编辑候选、推荐关系与证据边界 |
| 稳定机场 | `/knowledge/stable-airport-guide.html` | 持续任务、晚高峰与故障恢复 |
| 便宜机场 | `/knowledge/cheap-airport-value.html` | 实际账单、倍率与有效流量 |
| 专线机场 | `/knowledge/iplc-vs-bgp.html` | IPLC、IEPL、BGP与端到端路径 |
| 极连云评测 | `/knowledge/jilianyun-vpn-jichang-guide.html` | 主推品牌专题与套餐、线路核验 |

在首页和相关入口增加可见主题链接，文章通过相关主题互链；各页面各自描述不同需求，不复制同一段关键词落地页。文章摘要、对比表、FAQ 和来源链接均为用户可见内容，不以隐藏文本或结构化数据代替正文。

## 注册入口

| 服务 | 已同步地址 |
| --- | --- |
| 极连云 | `https://ydto01.jlyvipaff.com/#/?code=NRrSjo32` |
| 瞬云 | `https://ddd.jichang.best/#/register?code=o4I4kToe` |
| 云图 | `https://super.yuntujc.cc/#/register?code=qPHQtI9a` |
| Edge-X | `https://edge-invite.net/#/register?code=73ienU2h` |
| Lumina | `https://lumina.yakit.de5.net/#/register?code=dCgHyjFi` |

首个未标品牌的链接按既有推广对象“极连云”处理，规范为带 `/` 的 hash 路由地址。同步首页、服务目录、品牌清单、专题及其他 HTML 内的旧入口，推荐链接增加 `sponsored nofollow noopener noreferrer`。此项校验针对地址和推荐码一致性，不代表完成第三方注册或支付测试。

## 修复的截断文章

`chatgpt-proxy`、`clash-rules`、`game-acceleration`、`ios-clash`、`iplc-vs-bgp`、`netflix-unlock`、`privacy-security`、`shadowsocks-trojan`、`tls-fingerprint`、`v2ray-guide`、`youtube-premium`。

以上文章保留 `.html` 路径，补齐 H1、摘要、分节正文、常见问答和相关阅读；技术说明采用官方项目文档或平台帮助作为参考。

## Bing“优质入站链接不足”的后续工作

代码修改不能产生真实的第三方引用。本次没有购买链接、批量投递外链或伪造推荐来源。可执行的内容建设顺序如下：

1. 发布可复用的测试记录模板：日期、城市、运营商、设备、节点、任务、样本数量与失败原因。对外公开记录前删除订阅令牌和账号信息。
2. 有真实采样后发布晚高峰连续测试与版本变更记录，保留原始证据。任何可用率都同时列出观察窗口、分母与限制，不把几次测试推成全年保证。
3. 编写能被客户端社区引用的独立故障排查文章；纠正文档问题或分享实测方法时，再由相关站点自行决定是否引用。推广关系在文章中说明。
4. 在 Bing Webmaster Tools 中按月查看新增引用域名、各主承接页的展示、点击和实际搜索词；根据真实数据改进内容，不用无关目录链接补数量。

以上是待执行的编辑工作，没有在外部平台发送消息或代发链接。

## 数据与发布边界

- 极连云是本站主推候选。旧卡片存在套餐混用，已撤回专题中的错误具体报价，不把错误旧资料称为官方历史报价。
- 其余历史品牌卡片和参数表仍属于旧资料，不能推定为当前价格、独立测速或完整解锁结果。未来补测时应逐项替换为有日期的记录。
- 没有原始证据时，不添加 99.9% 可用率、固定延迟、全平台秒开、即时工单或虚构五星得分。
- 首页标题按用户要求保留，其中“真实速度测试”等措辞的佐证仍需要实际测试材料。正文已说明资料边界。
- 目前为本地文件修订。没有执行本次 Git 推送、生产部署或 IndexNow 提交。上线后还需核验生产站的 HTTP 状态、响应头、实际 robots 与 sitemap，再根据实际更新 URL 提交 IndexNow；本地校验不代表已被收录或获得特定排名。

## 验证与维护

运行：

```text
node scripts/update-site-stats.mjs
node scripts/seo-audit.mjs
git diff --check
```

静态校验覆盖单一 Title/description/H1、描述唯一性、canonical、社交摘要、JSON-LD、可见 FAQ、导航目标一致性、首页可达性、本地资源/锚点、旧注册链接、推荐码、目录统计及 sitemap 覆盖。

本次另用 Edge 无头浏览器检查全部 77 页，在 1440px 与 390px 下核对导航几何位置、页面横向溢出、H1 与图片加载。截图和临时迁移脚本位于忽略的 `scratch/`。`scripts/generate-keyword-articles.mjs` 是历史批量生成器，会覆盖内容；不要为刷新统计重新运行它。新增或改稿后运行审计，人工核对正文与来源。

## 官方依据

- Bing Webmaster Blog：[Does Duplicate Content Hurt SEO and AI Search Visibility?](https://blogs.bing.com/webmaster/2025/12/Does-Duplicate-Content-Hurt-SEO-and-AI-Search-Visibility/)
- Bing Webmaster Blog：[Keeping Content Discoverable with Sitemaps in AI Powered Search](https://blogs.bing.com/webmaster/2025/7/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search/)
- [Sitemaps XML protocol](https://www.sitemaps.org/protocol.html)
- [IndexNow protocol](https://www.indexnow.org/documentation)

这些资料用于内容组织、规范 URL 和真实更新日期的实现参考，不构成 Bing 排名或 Copilot 引用保证。
