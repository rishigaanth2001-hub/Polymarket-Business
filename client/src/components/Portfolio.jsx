import './Portfolio.css'

function Portfolio({ balance, bets, onCloseBet }) {
  const openBets = bets.filter(b => b.status === 'open')
  const totalStaked = openBets.reduce((sum, b) => sum + b.amount, 0)
  const potentialReturn = openBets.reduce((sum, b) => sum + (b.amount * b.price * 2), 0)

  return (
    <div className="portfolio">
      <div className="portfolio-section balance-card">
        <h3>Portfolio</h3>
        <div className="balance-display">
          <span className="balance-label">Balance</span>
          <span className="balance-amount">${balance.toFixed(2)}</span>
        </div>
        <div className="balance-stats">
          <div className="stat">
            <span className="stat-label">Active Bets</span>
            <span className="stat-value">{openBets.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Total Staked</span>
            <span className="stat-value">${totalStaked.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {openBets.length > 0 && (
        <div className="portfolio-section active-bets">
          <h3>Active Bets</h3>
          <div className="bets-list">
            {openBets.map(bet => (
              <BetCard
                key={bet.id}
                bet={bet}
                onClose={onCloseBet}
              />
            ))}
          </div>
          <div className="potential-return">
            <span>Potential Return</span>
            <span className="return-amount">${potentialReturn.toFixed(2)}</span>
          </div>
        </div>
      )}

      {openBets.length === 0 && (
        <div className="portfolio-section empty-state">
          <p>No active bets yet</p>
          <p className="empty-hint">Place a bet to get started!</p>
        </div>
      )}
    </div>
  )
}

function BetCard({ bet, onClose }) {
  const profit = (bet.amount * bet.price * 2) - bet.amount
  const profitPercent = ((profit / bet.amount) * 100).toFixed(0)

  return (
    <div className="bet-card">
      <div className="bet-header">
        <span className="bet-outcome">{bet.outcome.name}</span>
        <span className="bet-price">{(bet.price * 100).toFixed(1)}%</span>
      </div>
      <p className="bet-question">{bet.question}</p>
      <div className="bet-amount">${bet.amount.toFixed(2)}</div>
      <div className="bet-footer">
        <span className="profit" style={{ color: profit >= 0 ? '#22c55e' : '#ef4444' }}>
          {profit >= 0 ? '+' : ''}{profit.toFixed(2)} ({profitPercent}%)
        </span>
        <button
          className="close-bet-btn"
          onClick={() => onClose(bet.id)}
          title="Close bet and settle"
        >
          ✓
        </button>
      </div>
    </div>
  )
}

export default Portfolio
