const Order = require("../models/orderModel");

const createOrder = async (req, res) => {
  try {
    // Extract order data from the request body
    const { orderDate, product, price, orderedBy, quantity, status } = req.body;

    if (!orderDate || !product || !price || !orderedBy || !quantity) {
      res
        .status(400)
        .json({ Success: false, message: "All fields are mandatory !" });
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
    res
      .status(201)
      .json({
        Success: true,
        message: `Order placed successfully your OrderId is ${savedOrder._id}`,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create the order" });
  }
};

const getOrders = async (req, res) => {
  try {
    const allOrders = await Order.find();
    res.status(200).json({ Success: true, data: allOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get order details" });
  }
};

const getOrder = async (req, res) => {
  try {
    let id = req.params.id;
    let order = await Order.findById(id);

    res.status(200).json({ Success: true, data: order });
  } catch (error) {
    res.status(500).json({ error: "Failed to get order details" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    let { id, status } = req.params;
    let updatedProduct = await Order.findByIdAndUpdate(id, {
      $set: { status: status },
    });
    res
      .status(200)
      .json({ Success: true, message: `Order status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
};

const getOrderByStatus = async (req, res) => {
  try {
    let { status } = req.params;
    let orders = await Order.find({ status: status });
    if(orders.length>0){
      res.status(200).json({ Success: true, data: orders });
    }
    else{
      res.status(200).json({ Success: false, data: [] });

    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get orders" });
  }
};

module.exports = { createOrder, getOrders, getOrder, updateOrderStatus,getOrderByStatus};
