const Order = require('../models/orderModel')

const createOrder = async (req,res) => {
    try {
        // Extract order data from the request body
        const { orderDate, product, price, orderedBy, quantity, status } = req.body;

        if(!orderDate || !product || !price  || !orderedBy || !quantity)
        {
             res.status(400).json({Success:false,message:"All fields are mandatory !"});
        }
    
        // Create a new order document
    
        // Save the new order to the database
        const savedOrder = await Order.create({
            orderDate,
            product,
            price,
            orderedBy,
            quantity,
            status,
        });
    
        // Respond with the created order
        res.status(201).json(savedOrder);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create the order' });
      }
    };
    


module.exports = {createOrder}