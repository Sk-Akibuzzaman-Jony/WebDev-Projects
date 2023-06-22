
require('dotenv').config()
const express = require('express');
const app = express();
let ejs = require('ejs');
const { response } = require('express');
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
const mongoose = require('mongoose');


const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://admin-jony:jony123@cluster0.r9kc6df.mongodb.net/userDB');

const userschema = new mongoose.Schema({
  email: String,
  password: String
});

userschema.plugin(passportLocalMongoose);


const User = new mongoose.model("User", userschema);
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res) {
  res.render('home.ejs');
});

app.get("/login", function(req, res) {
  res.render('login.ejs');
});

app.get("/register", function(req, res) {
  res.render('register.ejs');
});

app.get("/secrets", function(req, res){
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", function(req, res){
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/");
  });
});
app.post("/register", function(req,res){

  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      });
    }
  });
  
});

app.post("/login", function(req, res){
  
  const user = new User({
    username : req.body.username,
    password : req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      });
    }
  });


});

app.listen(3000, function() {
  console.log("port started on http://localhost:3000");
});
