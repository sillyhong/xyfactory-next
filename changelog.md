### 2025.7.23

1. **[Major] 联系我们页面现代化重构**
   - 完全重构 Contactus 组件，去除 Bootstrap 依赖
   - 采用 Framer Motion + React Intersection Observer 实现高性能动画
   - 新增 Hero 区域，包含统计数据展示（24/7支持、50+国家、1000+客户）
   - 重构联系方式展示，支持 Tab 切换（WhatsApp、Facebook、WeChat）
   - 优化 QR 码展示和联系卡片设计
   - 智能表单系统：实时验证、加载状态、成功/错误提示
   - 完整响应式设计，支持 5 个断点适配
   - 深色模式和无障碍设计支持

2. **[Complete] 联系我们页面多语言翻译补全**
   - 为 4 种语言（英语、中文、西班牙语、阿拉伯语）添加完整翻译
   - 新增 22 个翻译键，涵盖 Hero 区域、联系方式、表单字段、验证提示等
   - 本地化适配：每种语言都体现相应文化的表达特色
   - 完善表单验证和错误提示的多语言支持
   - 优化用户体验文案，提升专业性和亲和力

3. **[Enhancement] 设计系统统一**
   - 与首页、产品详情页保持完全一致的设计风格
   - 统一卡片系统：白色背景、圆角、阴影、悬停效果
   - 渐变色彩体系：主色调 #5365AF，完整中性色搭配
   - 现代化交互：3D 悬停效果、平滑动画过渡
   - CSS Grid + Flexbox 现代布局系统

4. **[Technical] 技术架构升级**
   - TypeScript 完整类型定义，提升代码质量
   - CSS Modules 模块化样式管理
   - 动画性能优化：GPU 加速、will-change 属性
   - 移动端优化：触摸友好、垂直布局适配
   - 表单状态管理：useState + 自定义验证逻辑

### 2023.11.5

1. 修复切换语言后，默认会跳转到语言环境，比如 /home 预期：/zh/home， 实际 /home

### 2023.9.19

1. 页面增加 title，支持多语言
2. 修复 Image alt
3. 修复阿拉伯语言下页面报错，是富文本有空格符号 text_homepage_about_us

### 2023.8.14

1. 新增 `hrelang`等 seo 优化
2. contact us 新增 h1

### 2023.8.13

1. 新增 `title` `meta`等 seo 优化
2. 新增 sitemap.xml 和 robots.txt 文件增加 seo, 刷新 sitemap: https://google.com/ping?sitemap=https://www.xyglassaccessories.com/sitemap.xml
3. 新增百度 meta seo 标签

### 2023.5.4

1.[Update]网站图片在访问的时候会自动转换为 webp，如果浏览器支持 webp，会优先展示 webp, 所以无需压缩图片 2.[Update]logo.png 回退为 logo.svg

### 2023.2.19

1. [Update]替换网站 favicon
2. [update]压缩 logo.png
3. [Add]contact us 跳转外部连接逻辑

### 2023.1.17

1. 修复 footer 文字居中
2. 修复语种切换按钮热区问题

### 2023.1.08

1.自动识别语种，并且根据语种更新地址

### 2022.11.27

1.add XY-S330H、XY-D027H and XY-E001
