const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now, // Sets the default value to the current date and time
  },
  product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      }
  ],
  price: {
    type: String,
    required: true,
  },
  orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  
});

module.exports = mongoose.model('Order', orderSchema);;
