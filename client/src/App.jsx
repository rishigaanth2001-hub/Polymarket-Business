import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import MarketList from './components/MarketList'
import BettingModal from './components/BettingModal'
import Portfolio from './components/Portfolio'

function App() {
  const [markets, setMarkets] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedMarket, setSelectedMarket] = useState(null)
  const [showBettingModal, setShowBettingModal] = useState(false)
  const [balance, setBalance] = useState(1000)
  const [bets, setBets] = useState([])
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Load saved data from localStorage
  useEffect(() => {
    const savedBalance = localStorage.getItem('polymarket_balance')
    const savedBets = localStorage.getItem('polymarket_bets')
    if (savedBalance) setBalance(parseFloat(savedBalance))
    if (savedBets) setBets(JSON.parse(savedBets))
  }, [])

  // Save balance to localStorage
  useEffect(() => {
    localStorage.setItem('polymarket_balance', balance.toString())
  }, [balance])

  // Save bets to localStorage
  useEffect(() => {
    localStorage.setItem('polymarket_bets', JSON.stringify(bets))
  }, [bets])

  // Fetch markets on component mount and set up polling
  useEffect(() => {
    fetchMarkets()
    const interval = setInterval(fetchMarkets, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchMarkets = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/polymarket/top-markets')
      // Data is now an object with categories as keys
      setMarkets(response.data)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Error fetching markets:', error)
      // Use mock data if API fails
      setMarkets(generateMockMarkets())
    } finally {
      setLoading(false)
    }
  }

  const generateMockMarkets = () => {
    const categories = ['Politics', 'Sports', 'Crypto', 'Weather', 'Science']
    const questions = [
      'Will [Entity] happen before [Date]?',
      'Will [Entity] reach [Value]?',
      'Who will win [Event]?',
      'Will [Condition] occur?',
      'Is [Statement] true?'
    ]

    const mockData = {}
    categories.forEach(category => {
      mockData[category] = Array.from({ length: 10 }, (_, i) => ({
        id: `market-${category}-${i}`,
        question: questions[i % questions.length].replace('[Entity]', `Event ${i + 1}`),
        category: category,
        volume: Math.random() * 10000000,
        volume24hr: Math.random() * 10000000,
        creationTime: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        outcomes: [
          { name: 'Yes', price: 0.3 + Math.random() * 0.7, prob: Math.random() },
          { name: 'No', price: 0.3 + Math.random() * 0.7, prob: Math.random() }
        ]
      }))
    })
    return mockData
  }

  const handlePlaceBet = (outcome, amount) => {
    if (amount > balance) {
      alert('Insufficient balance!')
      return
    }

    const newBet = {
      id: Date.now(),
      marketId: selectedMarket.id,
      question: selectedMarket.question,
      outcome,
      amount,
      price: outcome.price,
      timestamp: new Date(),
      status: 'open'
    }

    setBets([...bets, newBet])
    setBalance(balance - amount)
    setShowBettingModal(false)

    alert(`Bet placed: $${amount} on "${outcome.name}" at ${(outcome.price * 100).toFixed(1)}%`)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>📊 Polymarket Dashboard</h1>
          <div className="header-stats">
            <span className="stat">Balance: <strong>${balance.toFixed(2)}</strong></span>
            <span className="stat">Active Bets: <strong>{bets.filter(b => b.status === 'open').length}</strong></span>
            <span className="stat">Last Update: <strong>{lastUpdate.toLocaleTimeString()}</strong></span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="content-wrapper">
          <div className="markets-section">
            <div className="section-header">
              <h2>Top 10 High Volume Events</h2>
              <button 
                className="refresh-btn"
                onClick={fetchMarkets}
                disabled={loading}
              >
                {loading ? '⟳ Updating...' : '⟳ Refresh'}
              </button>
            </div>
            <MarketList 
              markets={markets}
              onSelectMarket={(market) => {
                setSelectedMarket(market)
                setShowBettingModal(true)
              }}
              loading={loading}
            />
          </div>

          <aside className="sidebar">
            <Portfolio 
              balance={balance}
              bets={bets}
              onCloseBet={(betId) => {
                const bet = bets.find(b => b.id === betId)
                if (bet) {
                  // Calculate winnings based on current price
                  const winnings = bet.amount * bet.price * 2
                  setBalance(balance + winnings)
                  setBets(bets.map(b => 
                    b.id === betId ? { ...b, status: 'closed' } : b
                  ))
                  alert(`Bet closed! Winnings: $${winnings.toFixed(2)}`)
                }
              }}
            />
          </aside>
        </div>
      </main>

      {showBettingModal && selectedMarket && (
        <BettingModal
          market={selectedMarket}
          balance={balance}
          onPlaceBet={handlePlaceBet}
          onClose={() => setShowBettingModal(false)}
        />
      )}
    </div>
  )
}

export default App
