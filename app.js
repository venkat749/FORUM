const express = require('express')
const app = express();
const morgan = require('morgan')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')

const userRoutes = require('./routes/users');
const threadRoutes = require('./routes/threads');
mongoose.connect('mongodb+srv://venkat96:'+process.env.MONGO_ATLAS_PASSWORD+'@forum-app-qxjfn.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true})

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


app.use('/users', userRoutes);
app.use('/threads', threadRoutes);

app.use((req,res,next)=>{
    const error = new Error("Page not found")
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error : {
        message : error.message
        }
    });
});

module.exports = app;