# 🌟 Questionnaire App

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ahram-41/curious-about-u)

A beautiful, interactive questionnaire application built with Next.js, React, and Tailwind CSS. This app provides a delightful user experience for collecting personal interests, preferences, and lifestyle information through a multi-step form with a dreamy, modern UI.

## ✨ Features

- **Multi-step Form**: 7-step questionnaire covering various aspects of personal interests
- **Beautiful UI**: Gradient backgrounds, animated elements, and modern design
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Progress**: Visual progress indicator showing completion status
- **Form Validation**: Built-in validation using React Hook Form and Zod
- **Report Generation**: Detailed report view of submitted responses
- **Chinese Language Support**: Interface in Chinese with emoji decorations
- **Smooth Animations**: Engaging animations and transitions throughout

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd questionnaire-app
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework for production
- **[React 19](https://react.dev/)** - JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable components built with Radix UI
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with easy validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit

## 📋 Questionnaire Sections

The questionnaire covers 7 main areas:

1. **Basic Information** - Name, age, gender, occupation
2. **Lifestyle Preferences** - Daily routines, habits, and preferences
3. **Hobbies & Interests** - Entertainment, sports, creative activities
4. **Food & Dining** - Cuisine preferences, dietary habits
5. **Travel & Adventure** - Travel experiences and preferences
6. **Technology & Digital Life** - Device usage, social media habits
7. **Personal Values** - Life goals, values, and aspirations

## 🎨 UI Components

The app uses a comprehensive set of UI components including:

- Cards and layouts
- Form inputs (text, radio, checkbox, select)
- Progress indicators
- Buttons and navigation
- Modals and dialogs
- Badges and separators
- Responsive design elements

## 📱 Screenshots

The app features:
- Gradient backgrounds with animated floating elements
- Step-by-step form progression
- Beautiful success page with celebration elements
- Detailed report view with organized data presentation

## 🔧 Development

### Project Structure

```
questionnaire-app/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── questionnaire-form.tsx
│   ├── report-view.tsx
│   └── theme-provider.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── styles/               # Additional styles
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Customization

You can customize the questionnaire by:

1. **Modifying Questions**: Edit the form steps in `components/questionnaire-form.tsx`
2. **Updating Styles**: Modify Tailwind classes or add custom CSS
3. **Adding Validation**: Update Zod schemas in the form components
4. **Changing Language**: Replace Chinese text with your preferred language
5. **Report Format**: Customize the report layout in `components/report-view.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Next.js](https://nextjs.org/)

## 📧 邮件发送功能

应用支持四种邮件发送方式，特别优化了 Vercel 部署：

### 🔥 1. 邮件客户端发送 (推荐，无需配置)
- 打开系统默认邮件应用（如 Mail、Outlook、Thunderbird 等）
- 无需额外配置，即开即用
- 用户可以在邮件客户端中编辑和发送
- **最可靠的方式，适合所有用户**

### ⚡ 2. Vercel API + Resend (生产环境推荐)
使用 Vercel API 路由 + Resend 服务：

1. 注册 [Resend](https://resend.com/) 账户（免费额度：100封/天）
2. 获取 API 密钥
3. 在 Vercel 中设置环境变量：
   ```
   RESEND_API_KEY=your_resend_api_key
   FROM_EMAIL=noreply@yourdomain.com
   ```
4. 验证域名（可选，提高送达率）

### 🌐 3. EmailJS 客户端发送
使用 EmailJS 服务直接发送邮件：

1. 访问 [EmailJS](https://www.emailjs.com/) 注册免费账户
2. 创建邮件服务和模板
3. 在 Vercel 中设置环境变量：
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

### 👨‍💻 4. 发送给贡献者
直接发送到项目维护者邮箱，用于收集反馈。

## 🚀 Vercel 部署指南

### 快速部署

1. **Fork 此仓库**到您的 GitHub 账户

2. **连接到 Vercel**：
   - 访问 [Vercel](https://vercel.com/)
   - 点击 "New Project"
   - 导入您的 GitHub 仓库

3. **配置环境变量**（可选，用于邮件功能）：
   ```bash
   # Resend 配置（推荐）
   RESEND_API_KEY=re_xxxxxxxxxx
   FROM_EMAIL=noreply@yourdomain.com
   
   # EmailJS 配置（备选）
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   
   # 贡献者邮箱
   NEXT_PUBLIC_CONTRIBUTOR_EMAIL=your-email@example.com
   ```

4. **部署**：
   - Vercel 会自动检测 Next.js 项目
   - 点击 "Deploy" 开始部署
   - 几分钟后即可访问您的应用

### 邮件服务配置详解

#### 方案A: Resend (推荐)
```bash
# 1. 注册 Resend 账户
# 2. 创建 API 密钥
# 3. 在 Vercel 环境变量中添加：
RESEND_API_KEY=re_xxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com  # 使用您的域名
```

#### 方案B: EmailJS (备选)
```bash
# 1. 注册 EmailJS 账户
# 2. 创建邮件服务和模板
# 3. 在 Vercel 环境变量中添加：
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

### 🔄 智能回退机制
- 如果 API 发送失败，自动切换到邮件客户端方式
- 确保用户始终能够发送邮件
- 提供最佳的用户体验

---

Made with ❤️ for collecting beautiful questionnaire data