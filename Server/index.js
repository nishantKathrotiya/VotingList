const express = require("express");
const app = express();

const authRoutes = require("./Routes/AuthRoutes");
const dataRoutes = require("./Routes/DataRoutes");

const dbConnect = require("./config/connect");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// dotenv.config();
require('dotenv').config({ path: '../.env' });
const PORT = process.env.PORT || 4000;

//database connect
dbConnect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:5173","*"],
    })
);


//routes
app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/data", dataRoutes);
app.use("/api/v1/baseuser", dataRoutes);



app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});


app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`);
  });
