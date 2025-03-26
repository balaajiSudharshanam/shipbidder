import React from 'react'

const UserBadge = ({ bidder, bid }) => {
  return (
    <div className="p-3 border rounded shadow-sm w-fit bg-white">
      <div className="font-semibold text-lg">{bidder.name}</div>
      <div className="text-sm text-gray-600">Bid: ₹{bid}</div>
    </div>
  )
}

export default UserBadge
