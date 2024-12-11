const jwt = require("jsonwebtoken");
const userModel = require("../modal/UserSchema");
require("dotenv").config();

exports.isLoggedin = async (req, res, next) => {
  try {
   
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.json({
        success: false,
        message: "Token Not Found or Invalid Format",
      });
    }

    const token = authHeader.split(' ')[1]; 
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const userAtDb = await userModel.findOne({ userId: user.userId });
    
    if (!userAtDb) {
      return res.json({
        success: false,
        message: "Invalid User",
      });
    }

    userAtDb.password = undefined;
    req.user = userAtDb;
      
    next();
  } catch (error) {
    
    return res.json({
      success: false,
      message: "error while checking",
    });
  }
};

exports.isUser = async (req, res,next) => {
  try {
    console.log(req.user)
    if (req.user.role !== "user") {
      return res.send({
        success: false,
        message: "You are not User",
      });
    }

    next();
  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: "error while Verifying User",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.send({
        success: false,
        message: "You are not admin",
      });
    }
    console.log("Passed Is admin")
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "error while Verifying admin",
    });
  }
};
