const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = async (req, res) => {
    try {
      const {firstName,lastName,email,password,mobileNo,address} = req.body;
      if (!firstName || !email || !password || !lastName || !mobileNo || !address) {
        res.status(400).json({Success:false,message:"All fields are mandatory!"})
      }
      const userAvailable = await User.findOne({ email });
      if (userAvailable) {
        res.status(400).json({Success:false,message:"User already registered!"});

      }
    
      //Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Hashed Password: ", hashedPassword);
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        mobileNo,
        address
      });
    
      console.log(`User created ${user}`);
      if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
      } else {
        res.status(400).json({Success:false,message:"User data is not valid"});
      }
      res.json({ message: "Registeration successfull" });
    } catch (error) {
      res.status(500).json({Success:false,message:"Something ewnt wrong"})
    }
};

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({Success:false,message:"All fields are mandatory!"})
    }
    const user = await User.findOne({ email });
    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECERT
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401).json({Success:false,message:"email or password is not valid"})
    }
  } catch (error) {
    res.status(500).json({Success:false,message:"Something ewnt wrong"})
  }
};

//@desc Current user info
//@route GET /api/users/current
//@access private
const currentUser = async (req, res) => {
  try {
    let user = await User.findById(req.user.id)
    if(!user)
    {
      res.status(404).json({Success:false,message:"User Not Found"})
    }

    res.json({success:true,data:user})
  } catch (error) {
    res.status(500).json({Success:falselse,message:"Something ewnt wrong"})
  }
};

module.exports = { registerUser, loginUser, currentUser };