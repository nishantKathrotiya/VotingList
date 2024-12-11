require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../modal/UserSchema");



const createUser = async (req, res) => {
    const {userId, password, confirmPassword, role, authKey } = req.body.formData;
    try {
        if (!userId || !password || !confirmPassword || !authKey || !role) {
            return res.json({ success: false, error: "Some parameter is missing" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, error: "Password not matching with confirm password" });
        }

        if (authKey !== process.env.authKey) {
            return res.status(400).json({ success: false, error: "Security key invalid" });
        }
        let alreadyExistUser = await userSchema.findOne({ userId });
        if (alreadyExistUser) {
          return res.status(400).json({ success: false, error: "User Exist with this ID" });
      }

        const hashedPassword = await bcrypt.hash(password, 10);

      

        // Create new user
        const user = await userSchema.create({
            userId,
            password: hashedPassword,
            role
        });

        res.status(201).json({ success: true, message: "User Created"});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const login = async (req, res) => {
    try {
      const { userId, password } = req.body; //get data from req body
  
      if (!userId || !password) {
        // validate krlo means all inbox are filled or not;
        return res.json({
          success: false,
          message: "Some parameter missing",
        });
      }
  
      const user = await userSchema.findOne({ userId }); //user check exist or not
      if (!user) {
        return res.json({
          success: false,
          message: "User is not registrered, please create user first",
        });
      }
  
      if (await bcrypt.compare(password, user.password)) {

        const payload = {
            userId: user.userId,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "72h",
        });

        user.token = token;
        user.password = undefined;
  
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: false,
        };
        // res.cookie("token", token, options);

        return res.status(200).json({
          success: true,
          token,
          role:user.role,
          message: "Logged in successfully",
        });

      } else {
        return res.json({
          success: false,
          message: "Incorrect Password",
        });
      }
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "Login Failure, please try again",
      });
    }
};

const delteUser = async (req, res) => {
    
};

module.exports = { createUser , login , delteUser };
