const express = require("express");
const router = express.Router();

const {getAllProducts,getAllProductsTesting} = require("../controllers/products");

router.route("/").get(getAllProducts); //these funtions are defined in controllers/product.js
router.route("/testing").get(getAllProductsTesting); 
//to see this funtions go to /api/products and /api/products/testing

module.exports = router;


