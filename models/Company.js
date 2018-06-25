var mongoose = require('mongoose');

var companySchema = mongoose.Schema({name:String,jobDesignation:String,cutoff:Number,students:{type:Array,default:[]},contact:Number,permanentAddress:String,email:String})

module.exports = mongoose.model('Company', companySchema);