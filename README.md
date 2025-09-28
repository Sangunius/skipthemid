# SkipTheMid - Hide Junk on Netflix

A Chrome extension that automatically hides low-rated movies and shows on Netflix based on IMDb scores, helping you find only the good content.

## Features

### Free Version
- Hide shows/movies with IMDb rating below 6.0
- Display IMDb scores on hover
- Basic settings interface
- Real-time filtering as you scroll

### Pro Version ($1/month or $12 lifetime)
- Custom rating threshold (5.0 - 10.0)
- Genre-based filtering
- Rotten Tomatoes & Metacritic support
- AI-powered smart filtering
- Shareable filtered lists
- Priority support

## Installation

1. Download the extension files
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder
5. Visit Netflix and start filtering!

## Setup

### OMDb API Key (Required)
1. Get a free API key from [OMDb API](http://www.omdbapi.com/apikey.aspx)
2. Open the extension popup
3. Enter your API key in settings
4. Start filtering!

## Usage

1. **Install & Enable**: The extension automatically activates on Netflix
2. **Set Threshold**: Use the slider to set your minimum IMDb rating
3. **Browse**: Low-rated content will be blurred/hidden automatically
4. **Hover**: See IMDb scores on hover for all visible titles
5. **Customize**: Adjust settings via the extension popup

## Technical Details

- **Manifest Version**: 3
- **Permissions**: storage, activeTab, host permissions for Netflix and OMDb
- **API**: OMDb API for IMDb ratings
- **Storage**: Chrome sync storage for settings, local storage for cache
- **Performance**: Caches ratings for 24 hours, batch API calls

## Development

### File Structure
```
skip-the-mid/
├── manifest.json          # Extension manifest
├── popup.html             # Settings popup UI
├── popup.css              # Popup styles
├── popup.js               # Popup functionality
├── content.js             # Netflix page script
├── styles.css             # Netflix page styles
├── icons/                 # Extension icons
└── README.md              # This file
```

### Key Components

1. **Content Script** (`content.js`): Main logic for Netflix integration
2. **Popup** (`popup.html/js/css`): Settings and controls interface
3. **Styles** (`styles.css`): Visual effects for hiding and rating display
4. **Manifest** (`manifest.json`): Extension configuration

### API Integration

The extension uses the OMDb API to fetch IMDb ratings:
- Free tier: 1,000 requests/day
- Paid tier: 100,000+ requests/day
- Caching reduces API calls significantly

## Monetization

- **Free**: Basic filtering at 6.0 threshold
- **Pro Monthly**: $1/month for full features
- **Pro Lifetime**: $12 one-time payment
- **Revenue Target**: $1k MRR in 6 months

## Marketing Strategy

1. **Reddit**: r/netflix, r/chrome_extensions, r/unpopularopinion
2. **TikTok**: Before/after demos, Netflix hacks
3. **Product Hunt**: Launch with viral potential
4. **SEO**: Target "hide bad Netflix shows", "filter Netflix by rating"

## Future Features

- Support for Disney+, Prime Video, Hulu
- Social features (friend ratings)
- Mood-based filtering
- Weekly digest of new high-rated content
- Mobile app version

## Legal & Compliance

- No personal data collection
- GDPR compliant (EU users)
- Respects Netflix Terms of Service
- User-side enhancement only (no scraping)

## Support

- Email: support@skipthemid.com
- GitHub Issues: For bug reports
- Reddit: r/skipthemid for community

## License

MIT License - See LICENSE file for details

---

**Built with ❤️ for frustrated Netflix users everywhere**
