const mongoose = require('mongoose')

const threadSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title : {type : String, required : true},
    email : {type : String, ref : 'User'},
    username : {type : String, ref : 'User'},
    description : {type : String, required : true},
    tags : {type : Array, required : true},
    date : {type : Date, default: Date.now}
})

module.exports = mongoose.model('Thread',threadSchema)