const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartsSchema = new Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
    },
  ],
  timestamp: {
    type: Date,
    required: true,
  },
});

CartsSchema.pre('save', function (next) {
  if (!this.timestamp) this.timestamp = new Date();
  next();
});

module.exports = mongoose.model('Carts', CartsSchema);
