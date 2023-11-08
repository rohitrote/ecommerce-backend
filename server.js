const express = require('express')
const errorHandler = require("./middleware/errorHandler")
const connectDB = require('./config/dbConnection')
const dotenv = require('dotenv').config()
const cors = require('cors')
connectDB()
const app = express()

app.use(cors())

const port = process.env.PORT || 5000;


app.use(express.json());
app.use("/api/products",require("./routes/productRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.use("/api/orders",require("./routes/orderRoutes"))


app.use(errorHandler)
app.listen(port,()=>{
    console.log(`app is listning on port ${port}`);
})