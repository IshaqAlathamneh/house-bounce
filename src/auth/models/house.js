'use strict';

const mongoose = require('mongoose');

const houseSchema = mongoose.Schema({
  ownerName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  reqStatus: {type: String, required: true, default: 'pending', enum: ['approved', 'pending', 'rejected']},
  houseLocation: {type: String}
});

const houseModel = mongoose.model('house', houseSchema);

module.exports = houseModel;