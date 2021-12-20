const mongoose = require("mongoose");
require('dotenv').config();
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./user-schema"); 
const bodyParser = require("body-parser");
var router = express.Router();
const app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(jsonParser);
router.use(urlencodedParser);

// getting-started.js

// ---------sign-up Details which we get from request-------
// fullname
// mobile
// username
// password
// confirmPassword


mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error: "));
db.once("open", () => {
  console.log("Database is connected.");
});

router.post("/sign-up", (req, res) => {
  if (req.body.password == req.body.confirmPassword) {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
          if (err) {
            res.status(500).json({
              message: "Some Error Occured! Please Try again..",
            });
          } else {
            var newUser = new User({
              fullName: req.body.fullname,
              mobile: req.body.mobile,
              username: req.body.username,
              password: hashPassword,
            });

            newUser.save(function (err, result) {
              if (err) {
                res.status(400).json({
                  message: "Error Occured, Can't register user.",
                });
              } else {
                res.status(201).json({
                  message: "User Registered Succesfully.",
                  userData: result,
                });
              }
            });
            console.log(newUser);
          }
        });
      } else {
        res.json({
          message: "You are Already Registerd.",
        });
      }
    });


  } else {
    res.json({
      message: "Password Not Matched! (Please enter same password.)",
    });
  }
});

router.post("/login", (req,res) => {
    User.findOne({username:req.body.username},(err,user)=>{
        if(user){
            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                if (err){
                    res.status(500).json({
                        message:"Some Error Occured"
                    })
            }
                if(result){
                    res.json({
                        success:"Bravo! Password and username matched :>",
                        message:"You are logged in"
                })
            }

                else{
                    res.json({
                        message:"Password Do Not Match ! But User Exist."
                    })
                }

            })
        }
        else{
            res.json({
                message:"User not exist, Please Sign Up first",
            })
        }
    })
})


router.get('/show-users',(req,res)=>{
    User.find((err,users)=>{
        if(users.length == 0){
            res.json({
                message:"No single user is signed up now. please sign up first."
            })
        }
        else{
            res.json({
                message:"Users Data Found :)",
                Users: users
            });
        }
    })
})
module.exports = router;
