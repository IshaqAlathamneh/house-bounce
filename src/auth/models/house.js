'use strict';

const mongoose = require('mongoose');

const houseSchema = mongoose.Schema({
  ownerName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  reqStatus: {type: String, enum: ['approved', 'pending', 'rejected']},
});

const houseModel = mongoose.model('house', houseSchema);

module.exports = houseModel;