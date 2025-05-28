# 🚀 Vercel 部署指南

## 🎯 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ahram-41/want-to-know-you-better)

## 📝 手动部署步骤

### 1. Fork 仓库
1. 访问项目 GitHub 页面
2. 点击右上角 "Fork" 按钮
3. 选择您的账户

### 2. 连接 Vercel
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 选择您 fork 的仓库

### 3. 配置项目
```bash
# 项目设置
Framework Preset: Next.js
Root Directory: ./
Build Command: pnpm build
Output Directory: .next
Install Command: pnpm install
Development Command: pnpm dev
```

### 4. 环境变量配置

#### 基础配置
```bash
NEXT_PUBLIC_CONTRIBUTOR_EMAIL=your-email@example.com
```

#### Resend 配置（推荐）
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
```

### 5. 部署
1. 点击 "Deploy" 按钮
2. 等待构建完成（通常 2-3 分钟）
3. 获取部署 URL

## 🔧 邮件服务详细配置

### Resend 配置步骤

1. **注册账户**
   - 访问 [resend.com](https://resend.com/)
   - 使用 GitHub 账户快速注册

2. **获取 API 密钥**
   - 进入 Dashboard
   - 点击 "API Keys"
   - 创建新的 API 密钥
   - 复制密钥（以 `re_` 开头）

3. **配置域名**（可选，提高送达率）
   - 点击 "Domains"
   - 添加您的域名
   - 按照指引配置 DNS 记录

4. **在 Vercel 中设置**
   ```bash
   RESEND_API_KEY=re_your_actual_api_key_here
   FROM_EMAIL=noreply@yourdomain.com
   ```

## 🔍 部署后验证

### 1. 功能测试
- ✅ 访问部署的 URL
- ✅ 完成问卷填写
- ✅ 查看报告页面
- ✅ 测试邮件发送功能

### 2. 邮件测试
1. 选择 "📧 邮件客户端发送" - 应该打开邮件应用
2. 选择 "🚀 服务器直接发送" - 测试 API 发送
3. 检查邮件是否成功发送和接收

### 3. 性能检查
- 使用 [PageSpeed Insights](https://pagespeed.web.dev/) 检查性能
- 确保加载速度良好

## 🛠️ 故障排除

### 常见问题

#### 1. 构建失败
```bash
# 检查依赖版本兼容性
pnpm install
pnpm build
```

#### 2. 邮件发送失败
- 检查环境变量是否正确设置
- 验证 API 密钥是否有效
- 查看 Vercel 函数日志

#### 3. 环境变量不生效
- 确保变量名拼写正确
- 重新部署项目
- 检查变量是否在正确的环境中设置

### 调试技巧

1. **查看构建日志**
   - 在 Vercel Dashboard 中查看部署日志
   - 检查是否有错误信息

2. **查看函数日志**
   - 进入 Functions 页面
   - 查看 API 路由的执行日志

3. **本地测试**
   ```bash
   # 使用生产环境变量本地测试
   vercel env pull .env.local
   pnpm dev
   ```

## 📈 优化建议

### 1. 性能优化
- 启用 Vercel Analytics
- 配置 CDN 缓存
- 优化图片资源

### 2. 安全优化
- 设置适当的 CORS 策略
- 限制 API 调用频率
- 验证用户输入

### 3. 监控设置
- 配置错误监控
- 设置邮件发送统计
- 监控应用性能指标

## 🎉 部署完成

恭喜！您的梦幻问卷调查应用已成功部署到 Vercel！

- 🌐 **访问地址**: https://your-app.vercel.app
- 📧 **邮件功能**: 已配置并可用
- 🔄 **自动部署**: 推送代码自动更新

享受您的梦幻问卷应用吧！✨💕 
