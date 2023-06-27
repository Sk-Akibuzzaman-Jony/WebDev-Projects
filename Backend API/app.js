require("dotenv").config();
const express = require("express");
const app = express();
const connectdb = require("./db/connect");

const port = process.env.PORT || 3000;

const products_routes = require("./routes/products");

app.get("/",(req,res) => {
    res.send("hello");
});

//middleware or to set up router 
app.use("/api/products",products_routes);

const start = async() => {
    try {
        await connectdb(process.env.MONGODB_URL);
        app.listen(port, ()=>{
            console.log(`connected at port ${port}`);
        });
    } catch(error) {
        console.log(error);
    }
};

start();
