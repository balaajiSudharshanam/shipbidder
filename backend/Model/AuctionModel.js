const { default: mongoose } = require("mongoose");

const AuctionSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    jobDescription: { type: String },
    jobProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    pickupLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true }, 
    dropLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true }, 
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }, 
    pickupDateTime: { type: Date, required: true },
    dropDateTime: { type: Date, required: true },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }], 
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }, 
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'Open' },
    budget:{type:Number,default: 100}
  });
const Auction=mongoose.model('Auction',AuctionSchema);
module.exports= Auction;
 