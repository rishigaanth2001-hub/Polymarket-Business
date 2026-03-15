import './MarketList.css'

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
      {categories.map((category) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="category-markets">
            {markets[category].map((market) => (
              <MarketCard 
                key={market.id} 
                market={market}
                onSelect={onSelectMarket}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function MarketCard({ market, onSelect }) {
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
    <div className="market-card" onClick={() => onSelect(market)}>
      <div className="market-header">
        <span className="market-category">{market.category || 'General'}</span>
        <span className="market-volume">{volumeDisplay}</span>
      </div>

      <h3 className="market-question">{market.question}</h3>

      <div className="market-outcomes">
        {sortedOutcomes.slice(0, 2).map((outcome, idx) => (
          <div key={idx} className="outcome-pill">
            <span className="outcome-name">{outcome.name}</span>
            <span className="outcome-price">
              {(outcome.prob ? outcome.prob * 100 : outcome.price * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      <button className="buy-button">
        Place Bet →
      </button>
    </div>
  )
}

export default MarketList
