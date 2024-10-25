const mongoose = require('mongoose');

const itemModel = mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pic: { type: String, trim: true },
    height: { type: Number, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    weight: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    isFragile: { type: Boolean, default: false },
    isHazardous: { type: Boolean, default: false },
    description: { type: String },
}, {
    timestamps: true,
});

const Item = mongoose.model("Item", itemModel);
module.exports = Item;
