# 🚀 Quick Start Guide

## Installation (Already Done!)

✅ Dependencies installed for both server and client.

## Running the Application

### Option 1: Run Everything Together (Recommended)

```bash
cd /workspaces/Polymarket-Business
npm run dev
```

This starts:
- **Backend Server**: http://localhost:3001
- **Frontend App**: http://localhost:5173

Open `http://localhost:5173` in your browser.

### Option 2: Run Separately in Different Terminals

**Terminal 1 - Start Backend:**
```bash
cd /workspaces/Polymarket-Business
npm run dev:server
```

**Terminal 2 - Start Frontend:**
```bash
cd /workspaces/Polymarket-Business
npm run dev:client
```

## 💰 Virtual Betting System

- **Starting Balance**: $1,000 (virtual)
- **Persistence**: Your balance and bets are saved to browser storage
- **Practice**: Risk-free testing of trading strategies

## 📊 Key Features Implemented

### 1. Live Data Fetching ✅
- Fetches real or mock market data
- Auto-updates every 5 seconds
- Polymarket API integration ready

### 2. Top 10 High-Volume Events ✅
- Sorted by trading volume
- Cross-category display
- Real-time volume tracking

### 3. Modern UI ✅
- Clean, Polymarket-like design
- Responsive grid layout
- Gradient theme (purple-blue)
- Mobile-friendly

### 4. Virtual Betting ✅
- Click "Place Bet" on any market
- Select outcome
- Enter stake amount
- See potential returns
- Click ✓ to close bets

### 5. Portfolio Tracking ✅
- Real-time balance display
- Active bets list with odds
- Profit/loss calculations
- Potential return summary

### 6. Odds Visualization ✅
- Probability percentages on each outcome
- Price/probability display
- Visual odds cards
- Live updates

## 🎛️ Interface Walkthrough

```
┌─────────────────────────────────────────────────────┐
│  📊 Polymarket Dashboard                            │
│  Balance: $XXXX    Active Bets: X    Last: 12:34    │
├──────────────────────────────────────┬──────────────┤
│                                      │              │
│   Top 10 Events                      │  Portfolio   │
│   ┌────────────────┐ ┌────────────┐ │ ┌──────────┐ │
│   │ [Card 1]       │ │ [Card 2]   │ │ │ Balance  │ │
│   │ Category: Pol  │ │ Category:  │ │ │ $XXXX    │ │
│   │ Vol: $5.2M     │ │ Vol: $4.8M │ │ │          │ │
│   │ Yes: 65%       │ │ Yes: 42%   │ │ │ Active:  │ │
│   │ No:  35%       │ │ No:  58%   │ │ │ 3 bets   │ │
│   │ [Place Bet]    │ │ [Place Bet]│ │ │          │ │
│   └────────────────┘ └────────────┘ │ │ [Bets]   │ │
│   ... more cards ...                 │ └──────────┘ │
│                                      │              │
└──────────────────────────────────────┴──────────────┘
```

## 🎮 Placing Your First Bet

1. **See Markets**: Check Top 10 events on the left
2. **Choose Market**: Click "Place Bet →" on any card
3. **Select Outcome**: Click "Yes" or "No"
4. **Set Amount**: Enter how much to bet (max = your balance)
5. **Review**: See potential return calculation
6. **Execute**: Click "Place Bet"
7. **Track**: Watch it appear in Portfolio sidebar
8. **Settle**: Click ✓ to close the bet (simulates outcome)

## 📈 Understanding the Display

### Market Card
- **Category Tag**: Color-coded market type
- **Volume**: $X.XM = Total trading volume
- **Question**: The prediction being asked
- **Outcome Pills**: Yes/No with current odds
- **Place Bet Button**: Click to trade

### Portfolio Card
- **Balance**: Your available cash
- **Active Bets**: Number of open positions
- **Bet List**: All open bets with:
  - Outcome selected
  - Stake amount
  - Current odds
  - Potential profit/loss
  - Close button (✓)

## 🔄 Real-Time Updates

- **Auto-Refresh**: Every 5 seconds
- **Manual Refresh**: Click ⟳ Refresh button
- **Live Odds**: Update across all cards
- **Volume Changes**: Tracked in real-time

## 💾 Data Storage

Your data is saved locally:
- Balance persists across refreshes
- Betting history saved in browser
- No server-side storage needed for practice

## ⚙️ Customization

Want to change something? Edit these files:

- **Starting Balance**: `/client/src/App.jsx` (line ~21)
- **Refresh Rate**: `/client/src/App.jsx` (line ~40)
- **Colors/Theme**: `/client/src/components/*.css`
- **API URL**: `.env` file

## 🐛 Troubleshooting

**Port 3001 busy?**
```bash
lsof -ti:3001 | xargs kill -9
```

**Port 5173 busy?**
```bash
lsof -ti:5173 | xargs kill -9
```

**Modules not found?**
```bash
npm install
cd client && npm install && cd ..
```

**Development server won't start?**
- Check your Node.js version is 18+
- Delete `node_modules` and reinstall
- Clear npm cache: `npm cache clean --force`

## 🎯 Next Steps

1. Run `npm run dev`
2. Open http://localhost:5173
3. Place some virtual bets
4. Monitor your portfolio
5. Close bets to practice settling
6. Try different strategies!

## 📚 File Locations

- **Backend API**: `server/`
- **Frontend App**: `client/src/`
- **Components**: `client/src/components/`
- **Styles**: `client/src/components/*.css`
- **Environment**: `.env`

Happy trading! 🚀
