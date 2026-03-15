import './MarketList.css'

// Color scheme for each category
const CATEGORY_COLORS = {
  Sports: { bg: '#FFF3E0', border: '#FF6F00', text: '#E65100', badge: 'linear-gradient(135deg, #FF6F00 0%, #FF9100 100%)' },
  Crypto: { bg: '#F3E5F5', border: '#7B1FA2', text: '#4A148C', badge: 'linear-gradient(135deg, #7B1FA2 0%, #9C27B0 100%)' },
  Politics: { bg: '#E3F2FD', border: '#1565C0', text: '#0D47A1', badge: 'linear-gradient(135deg, #1565C0 0%, #1976D2 100%)' },
  Entertainment: { bg: '#FCE4EC', border: '#C2185B', text: '#880E4F', badge: 'linear-gradient(135deg, #C2185B 0%, #E91E63 100%)' },
  Science: { bg: '#E0F2F1', border: '#00796B', text: '#004D40', badge: 'linear-gradient(135deg, #00796B 0%, #009688 100%)' },
  Weather: { bg: '#E1F5FE', border: '#01579B', text: '#0D47A1', badge: 'linear-gradient(135deg, #01579B 0%, #0277BD 100%)' },
  General: { bg: '#F5F5F5', border: '#757575', text: '#424242', badge: 'linear-gradient(135deg, #757575 0%, #9E9E9E 100%)' }
}

function MarketList({ markets, onSelectMarket, loading }) {
  if (loading && Object.keys(markets || {}).length === 0) {
    return (
      <div className="market-list-loading">
        <div className="spinner"></div>
        <p>Loading markets...</p>
      </div>
    )
  }

  if (!markets || Object.keys(markets).length === 0) {
    return (
      <div className="market-list-empty">
        <p>No markets available</p>
      </div>
    )
  }

  // Convert object to array of categories for rendering
  const categories = Object.keys(markets).sort()

  return (
    <div className="market-list">
      {categories.map((category) => {
        const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.General
        return (
          <div key={category} className="category-section" style={{ '--category-bg': colors.bg, '--category-border': colors.border }}>
            <h2 className="category-title" style={{ color: colors.text, borderBottomColor: colors.border }}>
              {category}
            </h2>
            <div className="category-markets">
              {markets[category].map((market) => (
                <MarketCard 
                  key={market.id} 
                  market={market}
                  category={category}
                  colors={colors}
                  onSelect={onSelectMarket}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function MarketCard({ market, category, colors, onSelect }) {
  const volume = parseFloat(market.volume || 0)
  const volumeDisplay = volume >= 1000000 
    ? `$${(volume / 1000000).toFixed(1)}M`
    : volume >= 1000
    ? `$${(volume / 1000).toFixed(1)}K`
    : `$${volume.toFixed(0)}`

  const sortedOutcomes = [...(market.outcomes || [])].sort((a, b) => {
    const probA = a.prob || 0.5
    const probB = b.prob || 0.5
    return probB - probA
  })

  return (
    <div className="market-card" style={{ backgroundColor: colors.bg, borderColor: colors.border, borderWidth: '2px' }} onClick={() => onSelect(market)}>
      <div className="market-header">
        <span className="market-category" style={{ background: colors.badge }}>{category}</span>
        <span className="market-volume" style={{ color: colors.text }}>{volumeDisplay}</span>
      </div>

      <h3 className="market-question" style={{ color: colors.text }}>{market.question}</h3>

      <div className="market-outcomes">
        {sortedOutcomes.slice(0, 2).map((outcome, idx) => (
          <div key={idx} className="outcome-pill" style={{ borderColor: colors.border }}>
            <span className="outcome-name">{outcome.name}</span>
            <span className="outcome-price" style={{ color: colors.text }}>
              {(outcome.prob ? outcome.prob * 100 : outcome.price * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      <button className="buy-button" style={{ background: colors.badge }}>
        Place Bet →
      </button>
    </div>
  )
}

export default MarketList
