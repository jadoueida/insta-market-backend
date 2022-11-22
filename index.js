const e = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");


dotenv.config();


mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DB Connected!"))     //if database doesnt connect make sure ip up to date
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
// call register again please
// why don't you put postman here as well? ok
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/orders",orderRoute);
app.use("/api/carts",cartRoute);

app.use((err,req,res,next) => {
    res.status(500).json({
        message: err.message
    })
})

app.listen(process.env.PORT || 3002, () => {
    console.log("Backend server is running!");
});