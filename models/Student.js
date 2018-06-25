var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({firstName:String,lastName:String,department:String,enrollmentNo:String,cgpa:Number,mobileNo:String,permanentAddress:String,email:String});

module.exports = mongoose.model('Student', studentSchema);