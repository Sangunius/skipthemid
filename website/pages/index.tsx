import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { 
  Chrome, 
  Star, 
  Filter, 
  Zap, 
  Shield, 
  Download,
  CheckCircle,
  ArrowRight,
  Play,
  Users,
  TrendingUp,
  Heart
} from 'lucide-react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: <Filter className="w-8 h-8" />,
      title: "Smart Filtering",
      description: "Automatically hide shows with IMDb ratings below your threshold"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Hover Ratings",
      description: "See IMDb scores instantly when you hover over any title"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Updates",
      description: "Filters apply instantly as you scroll through Netflix"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "No personal data collected. All ratings cached locally"
    }
  ]

  const proFeatures = [
    "Custom rating thresholds (5.0 - 10.0)",
    "Genre-based filtering",
    "Rotten Tomatoes & Metacritic support",
    "AI-powered smart filtering",
    "Shareable filtered lists",
    "Priority support"
  ]

  const stats = [
    { number: "10K+", label: "Downloads" },
    { number: "4.8★", label: "Rating" },
    { number: "95%", label: "Satisfaction" },
    { number: "24/7", label: "Support" }
  ]

  return (
    <>
      <Head>
        <title>SkipTheMid - Hide Junk on Netflix | Chrome Extension</title>
        <meta name="description" content="Automatically hide low-rated movies and shows on Netflix. Only see content with IMDb ratings above your threshold. Free Chrome extension." />
        <link rel="canonical" href="https://skipthemid.com" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🎬</span>
                </div>
                <span className="text-xl font-bold gradient-text">SkipTheMid</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">Pricing</a>
                <a href="#download" className="btn-primary">Download Free</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="gradient-text">Hide Junk</span>
                <br />
                <span className="text-gray-900">on Netflix</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Automatically filter out low-rated movies and shows. Only see content with IMDb ratings above your threshold.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <a href="#download" className="btn-primary text-lg px-8 py-4">
                  <Chrome className="w-6 h-6 mr-2 inline" />
                  Download Free
                </a>
                <button className="btn-secondary text-lg px-8 py-4">
                  <Play className="w-6 h-6 mr-2 inline" />
                  Watch Demo
                </button>
              </div>
              <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Free to use
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  No registration
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Works instantly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why <span className="gradient-text">SkipTheMid</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stop wasting time scrolling through mediocre content. SkipTheMid automatically filters Netflix to show only the good stuff.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding bg-white/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                How It <span className="gradient-text">Works</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get started in under 2 minutes. No complex setup required.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Install Extension",
                  description: "Download SkipTheMid from the Chrome Web Store. One-click install, no registration required."
                },
                {
                  step: "2",
                  title: "Set Your Threshold",
                  description: "Choose your minimum IMDb rating (default 8.0). Free users get 6.0, Pro users get full control."
                },
                {
                  step: "3",
                  title: "Enjoy Filtered Netflix",
                  description: "Visit Netflix and watch as low-rated content disappears. Hover to see ratings instantly."
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Simple <span className="gradient-text">Pricing</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Start free, upgrade when you need more power.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                transition={{ duration: 0.6 }}
                className="card"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Free</h3>
                  <div className="text-4xl font-bold gradient-text mb-2">$0</div>
                  <p className="text-gray-600">Perfect for getting started</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    IMDb rating threshold (6.0)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Hover rating display
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Basic filtering
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Community support
                  </li>
                </ul>
                <a href="#download" className="btn-secondary w-full text-center block">
                  Get Started Free
                </a>
              </motion.div>

              {/* Pro Plan */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6 }}
                className="card relative border-2 border-primary-200"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Pro</h3>
                  <div className="text-4xl font-bold gradient-text mb-2">$1<span className="text-lg text-gray-600">/month</span></div>
                  <p className="text-gray-600">For power users</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {proFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="https://gumroad.com/skipthemid" className="btn-primary w-full text-center block">
                  Upgrade to Pro
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="download" className="section-padding bg-gradient-to-r from-primary-500 to-secondary-500">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Skip the Mid?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of users who've transformed their Netflix experience. Download SkipTheMid today and never waste time on bad content again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="https://chrome.google.com/webstore/detail/skipthemid/your-extension-id" 
                  className="bg-white text-primary-600 font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg"
                >
                  <Chrome className="w-6 h-6 mr-2 inline" />
                  Download from Chrome Store
                </a>
                <a 
                  href="https://github.com/skipthemid/chrome-extension" 
                  className="bg-white/20 text-white font-semibold py-4 px-8 rounded-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-200 text-lg"
                >
                  View on GitHub
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">🎬</span>
                  </div>
                  <span className="text-xl font-bold">SkipTheMid</span>
                </div>
                <p className="text-gray-400">
                  Hide junk on Netflix. Only see the good stuff.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#download" className="hover:text-white transition-colors">Download</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Community</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="https://reddit.com/r/skipthemid" className="hover:text-white transition-colors">Reddit</a></li>
                  <li><a href="https://github.com/skipthemid" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="https://twitter.com/skipthemid" className="hover:text-white transition-colors">Twitter</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 SkipTheMid. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
