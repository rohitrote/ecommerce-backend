const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true

  },
  lastName: {
    type: String,
    required: true

  },
  email: {
    type: String,
    required: true

  },
  password: {
    type: String,
    required: true

  },
  mobileNo: {
    type: Number,
    required: true

  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
 
}, {
  timestamps: true, // Add timestamps option here
}
)

module.exports = mongoose.model("User", userSchema);