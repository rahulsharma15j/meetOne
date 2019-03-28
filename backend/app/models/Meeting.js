const mongoose = require('mongoose');
const time = require('../libs/timeLib');

const meetingSchema = new mongoose.Schema({
  meetingId:{
      type:String,
      index:true,
      unique:true,
      required:true
  },
  subject:{
      type:String,
      required:true
  },
  description:{
      type:String,
      required:true
  },
  adminId:{
      type:String,
      required:true
  },
  adminName:{
      type:String,
      required:true
  },
  userId:{
      type:String,
      required:true
  },
  userName:{
    type:String,
    required:true
  },
  userEmail:{
      type:String,
      required:true
  },
  location:{
      type:String,
      required:true
  },
  startDate:{
      type:Date,
      required:true
  },
  endDate:{
      type:Date,
      required:true
  },
  createdOn:{
      type:Date,
      default:time.getLocalTime()
  },
  updatedOn:{
    type:Date,
    default:time.getLocalTime()
  }

});

module.exports = mongoose.model('Meeting',meetingSchema);