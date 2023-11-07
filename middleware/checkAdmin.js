const User = require("../models/userModel");


const checkAdmin = async (req,res,next) => {
    let user = await User.findById(req.user.id)
    console.log("roleeee",user.role);
    if (user.role  != "ADMIN") {
      res.status(401).json({Success:false,message:"User cant access this method"});
    }
    next()
}

module.exports = {checkAdmin}