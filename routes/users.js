const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

app.post('/register',(req,res,next)=>{
    User.find({email : req.body.email})
    .exec()
    .then(user => {
        if(user.length > 0){
           return res.status(500).json({
                message : "Account exixts"
            });
        }else{
            bcrypt.hash(req.body.password,10,(err,hash) => {
                if(err){
                    return res.status(500).json({
                        error : err
                    });
                }else{
                    const user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        email : req.body.email,
                        username : req.body.username,
                        password : hash
                    });
                    user .save()
                    .then(result => {
                      console.log(result);
                      res.status(201).json({
                        message: "User created"
                      });
                    })
                    .catch(err => {
                      console.log(err);
                      res.status(500).json({
                        error: err
                      });
                    });
                }
              });
            }
          });
      });

app.post('/login',(req,res,next)=>{
    User.find({email : req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
          return  res.status(404).json({
                err : "Authentication Failed"
            })
        }else{
            bcrypt.compare(req.body.password, user[0].password,(err,result) => {
                if(err){
                    return  res.status(404).json({
                        err : "Authentication Failed"
                    })
                }else{
                    if(result){
                        const token = jwt.sign({email : user[0].email, username : user[0].username},
                            process.env.PRIVATE_KEY,
                            {
                                expiresIn : "1h",

                            })
                        res.status(200).json({
                            message : "Auth Successful",
                            token : token,
                            username : user[0].username
                        })
                    }else{
                        res.status(404).json({
                            err : "Authentication Failed"
                        })
                    }
                }
            })
        }
    })
})

module.exports = app;