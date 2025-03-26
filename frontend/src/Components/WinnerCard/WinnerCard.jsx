import React from 'react'
import './WinnerCard.css'

const WinnerCard = ({ bidder, bid }) => {
  return (
    <div className="winner-card">
      <div className="winner-name">{bidder.name}</div>
      <div className="winner-bid">Bid: ₹{bid}</div>
    </div>
  )
}

export default WinnerCard
