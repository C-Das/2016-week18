var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doctorSchema = new mongoose.Schema({
  name: String,
  dateOfBrith:String,
  yearOfInfo: String,
  registrationNumber: String,
  dateOfRegistration:String,
  stateMedicalCouncil:String,
  qualification: String,
  qualificationYear:String,
  universityName: String,
  permanentAddress:String,
});

var mciDoctor = mongoose.model('mciDoctor', doctorSchema);
module.exports = mciDoctor;
