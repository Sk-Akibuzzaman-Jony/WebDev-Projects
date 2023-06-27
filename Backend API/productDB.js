
require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./model/product_model");
const productJson = require("./product.json")


const start = async() =>{
    try {
        await connectDB(process.env.MONGODB_URL);
        await Product.create(productJson);
        // await Product.deleteMany(); //use this if you want to delete the prev items in the db and add the ones in the json file
        console.log("success");
    } catch (error) {
        console.log(error);
    }
}


start();


/*
this js file will be used to add entries to the collection 
this file is a completely seperate thing and is not attached to app.js
to add entries add the data in the product.json file in json format like this 
[{
    "name":"iphone",
    "price":154,
    "feature":true,
    "company":"apple"
},
{
    "name":"iwatch",
    "price":90,
    "company":"apple"
}
]

and then run node productDB.js
*/