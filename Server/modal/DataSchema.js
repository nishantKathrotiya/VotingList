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
    vote: {
        type: String,
    },
},{timestamps:true});

dataSchema.pre('save', function(next) {
    if (this.mobileNo == null || this.mobileNo === '' || this.mobileNo === 'nil') {
      this.mobileNo = undefined; // Remove mobileNo by setting it to undefined
    }
    next(); // Call the next middleware or save method
  });

module.exports = mongoose.model('User', dataSchema);