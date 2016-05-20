var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doctorSchema = new mongoose.Schema({
  name: String,
  photoLink:String,
  Specialization: String,
  Degree: String,
  AreaOfSpecialization:String,
  NameOfMedicalCouncil:String,
  RegistrationNumber: String,
  ClinicHospitalName: String,
  PracticeAs:String,
  Management:String,
  DateOfBirth:Date,
  BloodGroup:String,
  ClinicHospitalAddress: String,
  State:String,
  District:String,
  GeographicalArea: String,
  ResidenceAddess: String,
  ClinicHospitalPhoneNumber:String,
  ResidencePhoneNumber:String,
  MobileNumber1:String,
  MobileNumber2:String,
  EmailId1:String,
  Website:String,
  MemberOf:String,
  Services:String
});

var Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
