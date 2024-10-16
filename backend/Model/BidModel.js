const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
  auction: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction', required: true }, 
  bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  bidAmount: { type: Number, required: true },
  bidTime: { type: Date, default: Date.now },
  status: { type: String, default: 'Active' } 
});

const Bid = mongoose.model('Bid', BidSchema);

module.exports = Bid;
