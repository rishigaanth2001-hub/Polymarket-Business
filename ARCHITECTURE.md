# Architecture & Live Data Explanation

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (Client)                        │
│                    React App on localhost:5173                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                       App.jsx (Main)                        │ │
│ │  - State: markets[], balance, bets[], selectedMarket      │ │
│ │  - Polling: fetchMarkets() every 5 seconds                │ │
│ │  - localStorage: Persist balance & bets                   │ │
│ ├─────────────────────────────────────────────────────────────┤ │
│ │  MarketList.jsx    │  BettingModal.jsx    │  Portfolio.jsx  │ │
│ │  Display markets   │  Bet placement UI    │  Balance & bets │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                              │                                    │
│        HTTP GET /api/polymarket/top-markets                      │
│        ⇓ (every 5 seconds)                                       │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Node.js Express      │
                    │ Server               │
                    │ localhost:3001       │
                    └──────────────────────┘
                               │
          ┌────────────────────┴────────────────────┐
          │                                         │
          ▼                                         ▼
    ┌──────────────────┐                  ┌─────────────────┐
    │ polymarket.js    │                  │ localStorage    │
    │ (Routes)         │                  │ (Client Side)   │
    └──────────────────┘                  ├─────────────────┤
          │                               │ balance: XXXX   │
          │                               │ bets: [...]     │
          ▼                               └─────────────────┘
    ┌──────────────────┐
    │ polymarketService │
    │ (API Integration)  │
    └──────────────────┘
          │
          ▼
    ┌──────────────────────────┐
    │ Polymarket CLOB API      │
    │ https://clob.polymarket  │
    │ (Live Market Data)       │
    └──────────────────────────┘
```

## Live Data Flow

### 1. Initial Load
```
User opens app (localhost:5173)
    ↓
App.jsx mounts
    ↓
fetchMarkets() called immediately
    ↓
GET /api/polymarket/top-markets
    ↓
Server calls polymarketService.getTopVolumeMarkets()
    ↓
API calls https://clob.polymarket.com/markets
    ↓
Top 10 by volume returned
    ↓
React renders MarketList with fresh data
```

### 2. Polling (Every 5 Seconds)
```
User is on dashboard
    ↓
setInterval(fetchMarkets, 5000) triggers
    ↓
GET /api/polymarket/top-markets (repeat)
    ↓
Polymarket API called for latest data
    ↓
Markets update if volume/odds changed
    ↓
UI re-renders with new data
```

### 3. Virtual Bet Placement
```
User clicks "Place Bet"
    ↓
BettingModal opens
    ↓
User selects outcome + amount
    ↓
Click "Place Bet"
    ↓
onPlaceBet() called in App.jsx
    ↓
New bet object created with current price/odds
    ↓
Added to bets[] array
    ↓
Balance deducted from account
    ↓
Saved to localStorage
    ↓
Portfolio updates in sidebar
```

### 4. Bet Settlement
```
User clicks ✓ on open bet
    ↓
onCloseBet() called
    ↓
Calculate winnings: amount * price * 2
    ↓
Add to balance
    ↓
Mark bet status as 'closed'
    ↓
Save to localStorage
    ↓
Portfolio refreshes
```

## How Live Odds Display Works

### Real-Time Updates
Each market card shows:

```javascript
{
  name: "Yes/No",
  price: 0.65,           // What we display (65%)
  prob: 0.65             // Probability
}
```

Updated from Polymarket API every 5 seconds via polling.

### Visual Representation
- **Outcome Pill**: Shows `name` and `(price * 100).toFixed(1)%`
- **Color Coding**: Higher odds = stronger probability
- **Live Changes**: Red/Green pulse effect (future enhancement)

## Data Persistence

### localStorage Structure
```javascript
// In browser
localStorage = {
  "polymarket_balance": "1000",
  "polymarket_bets": "[{id, marketId, outcome, amount, price, timestamp, status}]"
}
```

### Why localStorage?
- No backend database needed
- Persists across browser refreshes
- Works offline
- Perfect for practice/simulation

## API Response Example

### GET /api/polymarket/top-markets
```json
[
  {
    "id": "123abc",
    "question": "Will Bitcoin reach $100k by Dec 2024?",
    "category": "Crypto",
    "volume": "25000000",
    "outcome": [
      {
        "name": "Yes",
        "price": 0.72,
        "prob": 0.72
      },
      {
        "name": "No",
        "price": 0.28,
        "prob": 0.28
      }
    ]
  },
  ...
]
```

## Performance Optimization

### Polling Strategy
- 5-second interval balances freshness vs API load
- Only when app is visible (could add visibility API)
- Debounced to prevent duplicate requests

### Rendering Efficiency
```javascript
// This only re-renders when markets array changes
useEffect(() => {
  fetchMarkets();
  const interval = setInterval(fetchMarkets, 5000);
  return () => clearInterval(interval);
}, []) // Empty dependency array = once on mount
```

### Virtual Scrolling (Future Enhancement)
For 1000+ markets, implement virtual scrolling:
```javascript
<VirtualList items={markets} renderItem={MarketCard} />
```

## Mock Data Fallback

If Polymarket API is unavailable:

```javascript
// polymarketService.js
catch (error) {
  // Fall back to mock data
  return generateMockMarkets();
}
```

Generates realistic test data with:
- Random volumes
- Random probabilities
- Realistic categories
- Varied market questions

## Extending Live Data

### Add WebSocket Support
```javascript
// For real-time updates instead of polling
const ws = new WebSocket('wss://clob.polymarket.com');
ws.onmessage = (event) => {
  // Update markets immediately
};
```

### Add Historical Data
```javascript
// Track price history
priceHistory: {
  timestamp: [price1, price2, price3...]
}

// Show price charts
<PriceChart market={market} history={priceHistory} />
```

### Add Notifications
```javascript
// Alert when odds shift significantly
if (newPrice - oldPrice > 0.05) {
  notify(`Odds moved! ${(newPrice * 100).toFixed(1)}%`);
}
```

## Testing

### Mock API Responses
```javascript
// In development, use mock data
const USE_MOCK_DATA = process.env.NODE_ENV === 'development';

if (USE_MOCK_DATA) {
  return generateMockMarkets();
}
```

### Stress Testing
```javascript
// Generate 100 markets to test performance
const heavyLoad = Array(100).fill(null).map(generateMockMarkets)[0];
```

## Error Handling

### Network Errors
```javascript
try {
  const data = await polymarketService.getTopVolumeMarkets();
} catch (error) {
  console.error('API Error:', error);
  showErrorNotification('Failed to load markets');
  // Use cached data or mock data
}
```

### Data Validation
```javascript
if (!markets || !Array.isArray(markets)) {
  return [];
}

// Ensure prices are numbers
market.outcomes.forEach(o => {
  o.price = Number(o.price) || 0.5;
});
```

## Future Enhancements

1. **Real-time WebSocket**: Replace polling with websockets
2. **Price History**: Display charts with historical data
3. **Advanced Filtering**: Filter by category, volume, odds
4. **Favorites**: Save watched markets
5. **Analytics**: Portfolio performance dashboard
6. **Notifications**: Alert on significant price movements
7. **Export Data**: Download betting history
8. **Multiplayer**: Leaderboards and group betting

---

**Key Takeaway**: The app uses polling every 5 seconds to fetch market data from Polymarket API, displays it in a responsive grid, and allows risk-free practice betting with virtual money stored locally.
