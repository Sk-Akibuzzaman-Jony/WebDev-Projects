const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    price: {
        type: Number,
        required: [true, "Price must be provided"],
    },
    featured:{
        type: Boolean,
    },
    rating:{
        type: Number,
        default: 4.9,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    company:{
        type: String,
        enum:{
            values:["apple","samsung","dell","mi"],
            message:`value is not supported`,
        },   
    },
});

module.exports = mongoose.model("Product", productSchema) //the first value is the collection name and must be in singular