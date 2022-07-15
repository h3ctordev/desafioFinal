const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  code: {
    type: String,
    uppercase: true,
    trim: true,
  },
  photoUrl: {
    type: String,
  },
  price: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  timestamp: {
    type: Date,
  },
});

ProductsSchema.pre('save', function (next) {
  if (!this.timestamp) this.timestamp = new Date();
  next();
});

module.exports = mongoose.model('Products', ProductsSchema);
