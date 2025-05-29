# 🌟 Curious About U Questionnaire

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ahram-41/curious-about-u)

A beautiful, interactive personal interest questionnaire application built with Next.js, React, and Tailwind CSS. This app provides a delightful user experience for collecting comprehensive personal preferences, lifestyle habits, and personality insights through a multi-step form with a dreamy, modern UI.

## ✨ Features

- **8-Step Comprehensive Questionnaire**: Detailed exploration of personal characteristics and preferences
- **Beautiful Dreamy UI**: Gradient backgrounds, floating animations, and modern pastel design
- **Fully Responsive**: Seamless experience across desktop, tablet, and mobile devices
- **Visual Progress Tracking**: Interactive progress indicator with step navigation
- **Smart Form Management**: Real-time data persistence and validation
- **Rich Report Generation**: Beautiful visual reports with organized data presentation
- **Multiple Export Options**: Download as text (.txt), high-quality image (.png), or PDF document
- **Advanced Email Sharing**: Send reports via email with automatic image attachments
- **Chinese Interface**: Thoughtfully designed Chinese UI with emoji decorations
- **Smooth Animations**: Engaging micro-interactions and transitions throughout
- **Privacy-First**: All data processing happens client-side, no server storage

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd curious-about-u
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
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit
- **[html2canvas](https://html2canvas.hertzen.com/)** - Screenshots for report generation
- **[jsPDF](https://github.com/parallax/jsPDF)** - PDF generation
- **[Pica](https://github.com/nodeca/pica)** - High-quality image resizing
- **[Resend](https://resend.com/)** - Email delivery service

## 📋 Questionnaire Structure

The questionnaire covers 8 comprehensive sections:

1. **💕 Basic Information** - Personal details, physical characteristics, birthday
2. **🌸 Appearance Features** - Hair, skin, style preferences
3. **💜 Personality & Psychology** - MBTI, personality traits, relationships, family
4. **🎀 Lifestyle Preferences** - Daily habits, food preferences, time patterns
5. **🌺 Hobbies & Interests** - Entertainment, music, books, sports, favorites
6. **🎈 Life Habits** - Sleep patterns, quirks, personal routines
7. **✨ Detailed Characteristics** - Behavioral traits, social interactions, personal habits
8. **💖 Personal Thoughts** - Values, future plans, preferences, inner thoughts

## 🎨 Key Features

### Report Generation
- **Visual Reports**: Beautifully formatted reports with gradient backgrounds and organized sections
- **Export Options**: 
  - 📄 Plain text (.txt) for maximum compatibility
  - 🖼️ High-quality PNG images for sharing
  - 📑 Professional PDF documents for printing
- **Email Sharing**: Send reports with automatic image compression and attachment

### Email Functionality
The app supports multiple email sending methods:

1. **🔥 Email Client (Recommended)** - Opens default mail app, no configuration needed
2. **⚡ Server-side via Resend** - Direct sending through Vercel API routes
3. **🌐 Web-based Clients** - Gmail, Outlook, Yahoo Mail integration
4. **👨‍💻 Contributor Feedback** - Direct feedback to project maintainers

### Smart Features
- **Auto-save Progress**: Never lose your answers while filling out the form
- **Image Compression**: Intelligent image optimization for email attachments
- **Responsive Design**: Optimized for all device sizes
- **Privacy Protection**: All data stays in your browser

## 🔧 Development

### Project Structure

```
curious-about-u/
├── app/                    # Next.js app directory
│   ├── api/               # API routes for email functionality
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main questionnaire page
├── components/            # React components
│   ├── ui/               # shadcn/ui base components
│   ├── questionnaire-form.tsx  # Multi-step form component
│   ├── report-view.tsx         # Report generation and display
│   └── theme-provider.tsx      # Theme management
├── types/                # TypeScript definitions
│   └── questionnaire.ts       # Form data types
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Additional styles
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript checks

### Customization

You can easily customize the questionnaire:

1. **Add/Remove Questions**: Modify form steps in `components/questionnaire-form.tsx`
2. **Update Styling**: Customize Tailwind classes or add new gradient themes
3. **Change Language**: Replace Chinese text (or add i18n support)
4. **Modify Report Layout**: Update `components/report-view.tsx` for different formats
5. **Add New Fields**: Update TypeScript types in `types/questionnaire.ts`

## 📧 Email Configuration

### Quick Setup (No Configuration Required)
The app works out-of-the-box with email client integration. Users can always send emails through their default mail app.

### Optional: Enhanced Email Features

#### Option 1: Resend (Recommended for Production)
```bash
# Set in Vercel environment variables:
RESEND_API_KEY=re_xxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
```

#### Option 2: Contributor Email
```bash
# For feedback collection:
NEXT_PUBLIC_CONTRIBUTOR_EMAIL=your-email@example.com
```

## 🚀 Deployment

### One-Click Deployment to Vercel

1. **Fork this repository** to your GitHub account

2. **Deploy to Vercel**:
   - Visit [Vercel](https://vercel.com/)
   - Click "New Project" and import your forked repository
   - Vercel will automatically detect Next.js settings

3. **Optional: Configure Email** (for enhanced features):
   ```bash
   RESEND_API_KEY=your_resend_api_key
   FROM_EMAIL=noreply@yourdomain.com
   NEXT_PUBLIC_CONTRIBUTOR_EMAIL=your-email@example.com
   ```

4. **Deploy**: Your app will be live in minutes!

### Manual Deployment
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🎯 Use Cases

- **Personal Reflection**: Deep self-discovery questionnaire
- **Relationship Building**: Share detailed personal preferences with partners
- **Social Ice Breakers**: Fun way to learn about friends and family
- **Data Collection**: Comprehensive personal preference research
- **Gift Planning**: Understand someone's preferences for thoughtful gifts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Beautiful UI components by [shadcn/ui](https://ui.shadcn.com/)
- Icons provided by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Next.js](https://nextjs.org/) and [Vercel](https://vercel.com/)
- Email delivery by [Resend](https://resend.com/)

---

Made with ❤️ for meaningful personal connections and self-discovery