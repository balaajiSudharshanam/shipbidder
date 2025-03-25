import React from 'react'

const WinnerCard = (bidder) => {
  return (
    <div>
      <p>{bidder.name}</p>
      {bidder.bid}
    </div>
  )
}

export default WinnerCard
