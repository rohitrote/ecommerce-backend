const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    ratings:[],
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
    }

})

module.exports = mongoose.model("Product",productSchema)