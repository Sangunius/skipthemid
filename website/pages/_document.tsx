import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="SkipTheMid - Hide junk on Netflix. Automatically filter out low-rated movies and shows based on IMDb scores. Only see the good stuff!" />
        <meta name="keywords" content="Netflix, Chrome extension, IMDb, ratings, filter, streaming, movies, shows" />
        <meta name="author" content="SkipTheMid" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SkipTheMid - Hide Junk on Netflix" />
        <meta property="og:description" content="Automatically hide low-rated movies and shows on Netflix. Only see content with IMDb ratings above your threshold." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skipthemid.com" />
        <meta property="og:image" content="https://skipthemid.com/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SkipTheMid - Hide Junk on Netflix" />
        <meta name="twitter:description" content="Automatically hide low-rated movies and shows on Netflix. Only see content with IMDb ratings above your threshold." />
        <meta name="twitter:image" content="https://skipthemid.com/og-image.png" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
