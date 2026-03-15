import { useState } from 'react'
import './BettingModal.css'

function BettingModal({ market, balance, onPlaceBet, onClose }) {
  const [selectedOutcome, setSelectedOutcome] = useState(null)
  const [amount, setAmount] = useState(10)
  const [potentialReturn, setPotentialReturn] = useState(0)

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0
    setAmount(Math.max(0, Math.min(value, balance)))
    updatePotentialReturn(value, selectedOutcome)
  }

  const updatePotentialReturn = (amt, outcome) => {
    if (outcome) {
      const price = outcome.price || 0.5
      setPotentialReturn(amt / price)
    }
  }

  const handleOutcomeSelect = (outcome) => {
    setSelectedOutcome(outcome)
    updatePotentialReturn(amount, outcome)
  }

  const handlePlaceBet = () => {
    if (!selectedOutcome) {
      alert('Please select an outcome')
      return
    }
    if (amount <= 0 || amount > balance) {
      alert('Invalid amount')
      return
    }
    onPlaceBet(selectedOutcome, amount)
  }

  const sortedOutcomes = [...(market.outcomes || [])].sort((a, b) => {
    const probA = a.prob || 0.5
    const probB = b.prob || 0.5
    return probB - probA
  })

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Place a Bet</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="market-summary">
            <p className="market-category">{market.category || 'General'}</p>
            <h3>{market.question}</h3>
          </div>

          <div className="outcomes-selector">
            <label>Select Outcome:</label>
            <div className="outcomes-grid">
              {sortedOutcomes.map((outcome, idx) => (
                <button
                  key={idx}
                  className={`outcome-button ${selectedOutcome?.name === outcome.name ? 'selected' : ''}`}
                  onClick={() => handleOutcomeSelect(outcome)}
                >
                  <span className="outcome-name">{outcome.name}</span>
                  <span className="outcome-price">
                    {((outcome.prob || outcome.price) * 100).toFixed(1)}%
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="amount-section">
            <div className="amount-input-group">
              <label>Amount to Stake:</label>
              <div className="amount-input-wrapper">
                <span className="currency">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  min="0"
                  max={balance}
                  step="1"
                  placeholder="0"
                />
              </div>
              <div className="balance-info">
                Available: <strong>${balance.toFixed(2)}</strong>
              </div>
            </div>

            <div className="quick-amounts">
              {[5, 10, 25, 50, 100].map(amt => (
                <button
                  key={amt}
                  className="quick-amount-btn"
                  onClick={() => {
                    const newAmount = Math.min(amt, balance)
                    setAmount(newAmount)
                    updatePotentialReturn(newAmount, selectedOutcome)
                  }}
                  disabled={amt > balance}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {selectedOutcome && amount > 0 && (
            <div className="estimated-return">
              <div className="return-row">
                <span>Stake:</span>
                <strong>${amount.toFixed(2)}</strong>
              </div>
              <div className="return-row">
                <span>Odds:</span>
                <strong>{((selectedOutcome.prob || selectedOutcome.price) * 100).toFixed(1)}%</strong>
              </div>
              <div className="return-row highlight">
                <span>Potential Return:</span>
                <strong>${potentialReturn.toFixed(2)}</strong>
              </div>
              <div className="return-row highlight">
                <span>Profit:</span>
                <strong>${(potentialReturn - amount).toFixed(2)}</strong>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button
            className="place-bet-btn"
            onClick={handlePlaceBet}
            disabled={!selectedOutcome || amount <= 0 || amount > balance}
          >
            Place Bet
          </button>
        </div>
      </div>
    </div>
  )
}

export default BettingModal
