const User = require("../models/userModel");


 const isAdmin = async (id) => {
    console.log("iddd",id);
    let user = await User.findById(id)
    return user.role
}

module.exports = {isAdmin}