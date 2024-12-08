const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    srNo: {
        type: Number,
    },
    memberNo: {
        type: Number,
    },
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    feeRecipt: {
        type: Number,
    },
    mobileNo: {
        type: String,
    },
    ref: {
        type: String,
    },
    pannel: {
        type: String,
    },
    currentPollVote:{
        type:String,
        enum:['a','b','c','n'],
        default:'n'
    },
    party:{
        type:String,
        enum:['a','b','c'],
        default:'a'
    },
    votted:{
        type:String,
        enum:['y','n'],
        default:'n'
    },
    votes: {
        type: Map,
        of: {
            vote: { type: String },         
            updatedAt: { type: Date, default: Date.now },  
        },
        default: {}
      },
},{timestamps:true});

dataSchema.pre('save', function(next) {
    if (this.mobileNo == null || this.mobileNo === '' || this.mobileNo === 'nil') {
      this.mobileNo = undefined; // Remove mobileNo by setting it to undefined
    }
    next(); // Call the next middleware or save method
  });

module.exports = mongoose.model('Member', dataSchema);