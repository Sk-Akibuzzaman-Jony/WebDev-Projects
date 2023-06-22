
require('dotenv').config()
const express = require('express');
const app = express();
let ejs = require('ejs');
var md5 = require('md5');
const { response } = require('express');
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/userDB');


const userschema = new mongoose.Schema({
  email: String,
  password: String
});



const User = new mongoose.model("User", userschema);


app.get("/", function(req, res) {
  res.render('home.ejs');
});

app.get("/login", function(req, res) {
  res.render('login.ejs');
});

app.get("/register", function(req, res) {
  res.render('register.ejs');
});

app.post("/register", function(req,res){
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password)
  });

  newUser.save(function(err){
    if(!err){
      res.render("secrets");
    } else {
      res.send(err);
    }
  })

});

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = md5(req.body.password);
  
  User.findOne({email:username},function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        if(foundUser.password === password){
          console.log("match");
          res.render("secrets");
        }
      }
    }
  });

});

app.listen(3000, function() {
  console.log("port started on http://localhost:3000");
});
