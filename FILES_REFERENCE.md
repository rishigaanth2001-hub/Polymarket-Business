# 📁 Project Files Reference

## Project Structure

```
/workspaces/Polymarket-Business/
├── 📄 README.md                           # Full documentation
├── 📄 QUICKSTART.md                       # Quick start guide
├── 📄 ARCHITECTURE.md                     # Technical deep dive
├── 📄 package.json                        # Root dependencies
├── 📄 .env                                # Environment config
├── 📄 .gitignore                          # Git ignore rules
│
├── 📁 server/                             # Backend
│   ├── 📄 index.js                        # Express server
│   ├── 📁 routes/
│   │   └── 📄 polymarket.js               # API routes
│   └── 📁 services/
│       └── 📄 polymarketService.js        # API integration
│
└── 📁 client/                             # Frontend
    ├── 📄 package.json                    # Frontend dependencies
    ├── 📄 vite.config.js                  # Vite config
    ├── 📄 index.html                      # HTML entry
    ├── 📁 src/
    │   ├── 📄 main.jsx                    # React entry point
    │   ├── 📄 index.css                   # Global styles
    │   ├── 📄 App.jsx                     # Main component
    │   ├── 📄 App.css                     # App styles
    │   └── 📁 components/
    │       ├── 📄 MarketList.jsx          # Markets display
    │       ├── 📄 MarketList.css
    │       ├── 📄 BettingModal.jsx        # Betting interface
    │       ├── 📄 BettingModal.css
    │       ├── 📄 Portfolio.jsx           # Balance & bets
    │       └── 📄 Portfolio.css
    └── 📁 node_modules/                   # (installed packages)
```

## Key Files Explained

### Backend Files

| File | Purpose |
|------|---------|
| `server/index.js` | Express server setup, middleware, routes |
| `server/routes/polymarket.js` | API endpoints for markets data |
| `server/services/polymarketService.js` | Polymarket API integration |

### Frontend Files

| File | Purpose |
|------|---------|
| `client/src/App.jsx` | Main React app, state management, polling |
| `client/src/components/MarketList.jsx` | Market cards grid display |
| `client/src/components/BettingModal.jsx` | Bet placement interface |
| `client/src/components/Portfolio.jsx` | Balance and active bets |

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Root dependencies & scripts |
| `client/package.json` | Frontend dependencies |
| `client/vite.config.js` | Vite dev server config |
| `.env` | Environment variables |
| `.gitignore` | Git ignore rules |

## Running the Application

### Start Everything
```bash
npm run dev
```

### Start Backend Only
```bash
npm run dev:server
```

### Start Frontend Only
```bash
npm run dev:client
```

### Build for Production
```bash
npm run build
```

## Technologies & Versions

```
Backend:
- Node.js: 18+
- Express: 4.18.2
- Axios: 1.6.2
- CORS: 2.8.5

Frontend:
- React: 18.2.0
- Vite: 5.0.1
- Axios: 1.6.2

Styling:
- CSS3 with gradients
- No CSS framework (vanilla CSS)
- Responsive grid layout
```

## Data Flow Summary

1. **App Mount** → Fetch markets from backend
2. **Display** → Show top 10 in grid
3. **Polling** → Refresh every 5 seconds
4. **User Bets** → Save to state & localStorage
5. **Portfolio** → Track bets & balance
6. **Settlement** → Close bets and update balance

## Component Hierarchy

```
App
├── MarketList
│   └── MarketCard (×10)
├── BettingModal
│   ├── Market Summary
│   ├── Outcomes Selector
│   ├── Amount Input
│   └── Estimated Returns
└── Portfolio
    ├── Balance Card
    ├── Active Bets List
    │   └── BetCard (×N)
    └── Potential Return
```

## State Management

### App.jsx State
```javascript
- markets: [] // From API
- loading: false // Loading state
- selectedMarket: null // For betting modal
- showBettingModal: false // Modal visibility
- balance: 1000 // Virtual money
- bets: [] // Array of placed bets
- lastUpdate: Date // Last refresh time
```

### localStorage
```javascript
- polymarket_balance: "1000"
- polymarket_bets: "[{...}, {...}]"
```

## API Endpoints

### Server Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/health` | GET | Health check |
| `/api/polymarket/top-markets` | GET | Top 10 markets |
| `/api/polymarket/market/:id` | GET | Market details |

## CSS Classes Reference

### App.css
- `.app` - Main container
- `.header` - Top header bar
- `.main-content` - Main content area
- `.markets-section` - Markets grid container
- `.sidebar` - Right sidebar

### MarketList.css
- `.market-list` - Grid container
- `.market-card` - Individual market card
- `.outcome-pill` - Outcome badge
- `.buy-button` - CTA button

### BettingModal.css
- `.modal-overlay` - Backdrop
- `.modal-content` - Modal box
- `.outcome-button` - Outcome selector
- `.amount-input-wrapper` - Bet amount input

### Portfolio.css
- `.portfolio` - Portfolio container
- `.balance-card` - Balance display
- `.bet-card` - Individual bet card
- `.potential-return` - Return summary

## Environment Variables

```env
PORT=3001                          # Server port
VITE_API_URL=http://localhost:3001 # Frontend API URL
NODE_ENV=development               # Environment
```

## Scripts

```json
{
  "dev": "npm run dev:server && npm run dev:client concurrently",
  "dev:server": "node --watch server/index.js",
  "dev:client": "cd client && npm run dev",
  "build": "cd client && npm run build",
  "preview": "cd client && npm run preview",
  "start": "node server/index.js"
}
```

## Features Overview

✅ **Live Data** - Real-time market data from Polymarket  
✅ **Top 10 Display** - Highest volume markets across categories  
✅ **Responsive UI** - Mobile, tablet, and desktop layouts  
✅ **Clean Design** - Modern gradient theme  
✅ **Virtual Betting** - Risk-free practice trading  
✅ **Portfolio Tracking** - Balance and bet management  
✅ **Real-time Updates** - 5-second polling  
✅ **Data Persistence** - localStorage for balance & bets  
✅ **Odds Visualization** - Live probability display  
✅ **Error Handling** - Fallback to mock data  

## Common Customizations

### Change Starting Balance
→ Edit `client/src/App.jsx` line 21

### Change Refresh Rate
→ Edit `client/src/App.jsx` line 40 (set interval)

### Change Colors
→ Edit `client/src/components/*.css` (modify gradients)

### Change API URL
→ Edit `.env` file

### Add New Component
1. Create `client/src/components/NewComponent.jsx`
2. Create `client/src/components/NewComponent.css`
3. Import in `App.jsx`
4. Use in JSX

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| Port 3001 in use | `lsof -ti:3001 \| xargs kill -9` |
| Port 5173 in use | `lsof -ti:5173 \| xargs kill -9` |
| Dependencies missing | `npm install && cd client && npm install && cd ..` |
| Modules not found | Delete `node_modules`, run `npm install` again |
| API not responding | Check Polymarket API is online |
| Data not loading | Check browser console for errors |

## Performance Metrics

- **Initial Load**: ~2-3 seconds
- **Data Refresh**: 5 seconds interval
- **Market Cards**: Render 10 cards with smooth animation
- **Bet Placement**: Instant with localStorage save
- **Mobile Responsiveness**: Full adaptation at <768px

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## Future Enhancement Ideas

1. WebSocket for real-time updates
2. Price history charts
3. Advanced filtering (category, volume, odds)
4. Favorites/watchlist
5. Portfolio analytics
6. Push notifications
7. Bet history export
8. Leaderboard

---

**Ready to trade?** Run `npm run dev` and open http://localhost:5173 🚀
