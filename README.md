# Polymarket Dashboard

A real-time Polymarket events dashboard with live data streaming, top 10 high-volume events display, and a virtual betting system for practice trading.

## 🎯 Features

- **Live Market Data**: Real-time integration with Polymarket API
- **Top 10 Events**: Display highest volume markets across all categories
- **Live Odds Updates**: Real-time probability and price tracking with visual indicators
- **Virtual Betting**: Practice betting with virtual $1000 starting balance
- **Portfolio Tracking**: Monitor active bets, balance, and potential returns
- **Clean UI**: Modern, responsive design similar to Polymarket
- **Real-time Updates**: Auto-refresh every 5 seconds for latest market data

## 📋 Project Structure

```
├── server/                    # Express backend
│   ├── index.js              # Server entry point
│   ├── routes/
│   │   └── polymarket.js     # API routes
│   └── services/
│       └── polymarketService.js  # Polymarket API integration
├── client/                    # React frontend
│   ├── src/
│   │   ├── App.jsx           # Main app component
│   │   ├── components/       # React components
│   │   │   ├── MarketList.jsx
│   │   │   ├── BettingModal.jsx
│   │   │   └── Portfolio.jsx
│   │   └── index.css         # Global styles
│   └── index.html            # HTML entry point
├── package.json              # Root dependencies
└── .env                       # Environment variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
```bash
npm install
cd client && npm install && cd ..
```

2. **Set up environment**
The `.env` file is already configured with default values:
```
PORT=3001
VITE_API_URL=http://localhost:3001
NODE_ENV=development
```

### Development

Run both server and client with hot reload:

```bash
npm run dev
```

This will:
- Start the Express server on `http://localhost:3001`
- Start the React dev server on `http://localhost:5173`

**Separate terminals:**
- Terminal 1 - Server: `npm run dev:server`
- Terminal 2 - Client: `npm run dev:client`

### Build & Production

```bash
# Build client
npm run build

# Start production server
npm start
```

## 🎮 Using the Dashboard

### Dashboard Overview
1. **Header**: Shows your balance, active bets count, and last update time
2. **Markets Grid**: Top 10 high-volume events in a responsive grid layout
3. **Portfolio Sidebar**: Displays your balance and active bets

### Placing a Virtual Bet

1. Click **"Place Bet →"** on any market card
2. Select an outcome (Yes/No or other options)
3. Enter your stake amount or use quick amount buttons ($5, $10, $25, $50, $100)
4. View potential return calculation
5. Click **"Place Bet"** to execute

### Monitoring Bets

- View all active bets in the Portfolio sidebar
- See stake amount, odds, and potential profit/loss
- Click **✓** button to close a bet and settle (simulated outcome)

### Live Updates

- Market data automatically refreshes every 5 seconds
- Click **⟳ Refresh** button to manually update
- Odds and volumes update in real-time

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- 🖥️ Desktop (1024px+)
- 💻 Tablet (768px - 1024px)
- 📱 Mobile (< 768px)

## 🔄 How Live Data Works

### Real-time Updates
1. **Polling**: Markets refresh every 5 seconds via `/api/polymarket/top-markets`
2. **State Management**: React hooks manage market data and bets
3. **localStorage**: Persists balance and betting history

### API Endpoints

#### GET `/api/polymarket/top-markets`
Returns top 10 markets by volume with current prices:
```json
[
  {
    "id": "market-id",
    "question": "Will X happen?",
    "category": "Politics",
    "volume": 5000000,
    "outcomes": [
      { "name": "Yes", "price": 0.65, "prob": 0.65 },
      { "name": "No", "price": 0.35, "prob": 0.35 }
    ]
  }
]
```

#### GET `/api/polymarket/market/:marketId`
Returns detailed market information

## 💾 Data Persistence

- **Balance**: Saved to localStorage, persists across sessions
- **Bet History**: All bets saved to localStorage
- **Real-time Data**: Fetched fresh from Polymarket API on each update

## 🎨 Design Features

- **Gradient Theme**: Modern purple-blue gradient design
- **Clean Typography**: System fonts for optimal readability
- **Smooth Animations**: Transitions and micro-interactions
- **Visual Feedback**: Hover states and active indicators
- **Color Indicators**: Green for profits, red for losses, blue for odds

## 🔧 Configuration

### Change Refresh Rate
Edit `App.jsx`:
```javascript
const interval = setInterval(fetchMarkets, 5000) // Change 5000ms as needed
```

### Modify Starting Balance
Edit `App.jsx`:
```javascript
const [balance, setBalance] = useState(1000) // Change to desired amount
```

### API Base URL
Edit `.env`:
```
VITE_API_URL=http://localhost:3001
```

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

**CORS Issues:**
- Ensure backend is running on `http://localhost:3001`
- Check proxy configuration in `client/vite.config.js`

**Data not loading:**
- Check browser console for errors
- Verify Polymarket API is accessible
- Check network tab for failed requests

## 📚 Technologies Used

- **Frontend**: React 18, Vite, CSS3
- **Backend**: Express, Axios, CORS
- **Data**: Polymarket CLOB API
- **Storage**: localStorage for persistence

## 🌐 Live Data Simulation

Currently, the dashboard includes mock data generation when the Polymarket API is unavailable. To use real data:

1. Ensure internet connection
2. Polymarket API is available at `https://clob.polymarket.com`
3. Check server logs for API responses

## 📝 Example Market Data Display

Each market shows:
- **Category**: Color-coded tag (Politics, Sports, Crypto, etc.)
- **Volume**: 24h trading volume
- **Question**: The prediction market question
- **Odds**: Real-time probability for each outcome
- **Action Button**: Quick access to place bets

## 🚦 Performance Optimization

- Lazy loading of market data
- Efficient re-renders using React hooks
- Debounced API calls
- Responsive image optimization

## 📖 Additional Resources

- [Polymarket API Docs](https://docs.polymarket.com)
- [React Documentation](https://react.dev)
- [Express Guide](https://expressjs.com)

## 💡 Tips for Virtual Trading

1. Start with smaller bets to understand the system
2. Track the P&L of your active bets
3. Use the volume indicator to identify popular markets
4. Monitor odds changes to time your bets
5. Practice different strategies risk-free

## 🚀 Deployment

### Frontend - GitHub Pages
The frontend is deployed to GitHub Pages automatically via GitHub Actions.

**Quick Deploy:**
```bash
cd client
npm run build
npm run deploy
```

Live: https://rishigaanth2001-hub.github.io/Polymarket-Business/

### Backend - Choose Your Platform

The backend needs to be deployed separately to a service like:
- **Railway** (recommended - easiest setup)
- **Vercel**
- **Render**
- **Fly.io**

See `QUICK_DEPLOY.md` for step-by-step instructions.

**Full Deployment Guide**: See `DEPLOYMENT.md` for detailed configurations and troubleshooting.

---

## 🤝 Contributing

This is a practice/learning project. Feel free to extend features like:
- Historical chart data
- Favorites/watchlist
- Advanced filtering
- Portfolio analytics
- Bet history export

## 📄 License

MIT

---

**Disclaimer**: This is a practice/simulation dashboard for educational purposes. Virtual bets do not involve real money or actual trading on Polymarket.