const express = require('express')
const app = express();
const mongoose = require('mongoose')
const authCheck = require('../auth/auth-check')
const Thread = require('../models/thread');

app.post('/createNew', authCheck, (req,res,next) => {
    const thread = new Thread({
        _id : new mongoose.Types.ObjectId(),
        title : req.body.title,
        email : req.body.email,
        username : req.body.username,
        description : req.body.description,
        tags : req.body.tags,
        date : req.body.date
    })
    thread.save()
    .then(response =>{
        // console.log(response)
        res.status(200).json(response)
    })
    .catch( error =>{
        console.log(error);
    });
})

app.get("/",authCheck,(req,res,next) => {
    Thread.find()
    .exec()
    .then(threads => { 
        console.log("Threads : ",threads);
        if(threads)
            res.status(200).json(threads)
    })
    .catch(error => console.log(error))
})

app.get("/searchTag/:tagValue",authCheck,(req,res,next) => {
    const tagValue = req.params.tagValue
    Thread.find({ tags: tagValue })
    .exec()
    .then(threads => {
        console.log(`${tagValue} threads : ${threads}`)
        if(threads.length > 0){
            res.status(201).json(threads)
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error : error
        })
    })

})

app.get("/search/:tag/:value",authCheck,(req,res,next) =>{
    const tagValue = req.params.tag
    const searchValue = req.params.value

    Thread.find({ [tagValue]: { "$regex": searchValue, "$options": "i" }})
    .exec()
    .then(threads => {
        console.log(`${tagValue} threads : ${threads}`)
        if(threads.length > 0){
            res.status(201).json(threads)
        }
        else{
            res.status(201).json(threads);
            console.log("No match Found")
        }
    })
    .catch(error =>{
        console.log(error)
        res.status(500).json({
            error : error
        })
    })
})

module.exports = app;