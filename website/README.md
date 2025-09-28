# SkipTheMid Website

Beautiful landing page for the SkipTheMid Chrome extension, built with Next.js and deployed on Vercel.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Fast loading with Next.js optimization
- 📱 Mobile-first responsive design
- 🎭 Smooth animations with Framer Motion
- 🚀 Optimized for SEO and performance
- 📊 Analytics ready (Google Analytics)

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel
- **TypeScript**: Full type safety

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The site is automatically deployed to Vercel when pushed to the main branch.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Vercel:
```bash
vercel --prod
```

## Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your primary colors
  },
  secondary: {
    // Your secondary colors
  }
}
```

### Content
Edit the main content in `pages/index.tsx`:
- Hero section
- Features
- Pricing
- Call-to-action

### Analytics
Add your Google Analytics ID in `pages/_document.tsx`:
```javascript
gtag('config', 'YOUR_GA_ID');
```

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1

## SEO

- Meta tags optimized for search engines
- Open Graph tags for social sharing
- Structured data for rich snippets
- Sitemap and robots.txt included

## License

MIT License - see LICENSE file for details.
