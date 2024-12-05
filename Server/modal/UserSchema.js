const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true,
        enum:['admin',"user"],
        default:'user'
    }
},{timestamps:true});


module.exports = mongoose.model('User', dataSchema);