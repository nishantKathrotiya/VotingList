const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    currentPoll:{
        type:Number,
        require:true,
        default:1,
    },
   totalMembers:{
    type:Number,
        require:true,
        default:1,
   },
    address:{
        type:[String],
    }
},{timestamps:true});


module.exports = mongoose.model('Poll', dataSchema);