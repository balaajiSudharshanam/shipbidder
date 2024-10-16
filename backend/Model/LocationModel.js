const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  postalCode: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  }
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
