var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var logger = require('morgan');

var PORT = 3000;

var app = express();

app.use(logger('dev'));

mongoose.connect('mongodb://localhost/drdata');
var db = mongoose.connection;

var Doctor = require('./doctor.js');

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Commented out as it pulls all data from the front page

      request('http://www.drdata.in/list-doctors.php?search=doctor&page=3', function(error, response, body){
        if (!error && response.statusCode == 200) {
          $ = cheerio.load(body);
          debugger;
          $('#no-more-tables').find('tbody').find('tr').each(function(i,elem){

            var drLink = 'http://www.drdata.in/'+ elem.children[13].children[1].attribs.href;
            // console.log(drLink);


      request(drLink, function(error, response, body){
        if (!error && response.statusCode == 200) {
          $ = cheerio.load(body);

          var doctorName = $('h2').text();
          var doctorImageLink = 'http://www.drdata.in/'+ $('.thumbnail').find('img').attr('src');

          var Specialization, Degree, AreaOfSpecialization, NameOfMedicalCouncil, RegistrationNumber;
          var ClinicHospitalName, PracticeAs, Management, DateOfBirth,BloodGroup, ClinicHospitalAddress;
          var State,District, GeographicalArea, ResidenceAddess, ClinicHospitalPhoneNumber,ResidencePhoneNumber;
          var MobileNumber1, MobileNumber2, EmailId1, Website, MemberOf, Services, GraduationCourse, PostGraduationCourse;

          $('#myTabContent').find('table').find('tr').each(function(i,elem){

            var value1 = $(this).find('td').eq(0).text();
            var value2 = $(this).find('td').eq(1).text();

            switch(value1) {
              case "Specialization" :
                Specialization = value2;
                break
              case " Degree" :
                Degree = value2;
                break;
              case " Area of Specialization" :
                AreaOfSpecialization = value2;
                break;
              case "Name of Medical Council" :
                NameOfMedicalCouncil= value2;
                break;
              case "Registration Number" :
                RegistrationNumber = value2;
                break;
              case "Clinic/ Hospital Name" :
                ClinicHospitalName = value2;
                break;
              case "Practice as" :
                PracticeAs = value2;
                break;
              case "Management" :
                Management = value2;
                break;
              case "Date of Birth" :
                DateOfBirth = value2;
                break;
              case "Blood Group" :
                BloodGroup = value2;
                break;
              case "Address  (Clinic/ Hospital)" :
                ClinicHospitalAddress = value2;
                break;
              case "State" :
                State = value2;
                break;
              case "District" :
                District = value2;
                break;
              case "Geographical Area" :
                GeographicalArea = value2;
                break;
              case "Address (Residence)" :
                ResidenceAddess = value2;
                break;
              case "Phone Number (Clinic/ Hospital)" :
                ClinicHospitalPhoneNumber = value2;
                break;
              case "Mobile Number 1" :
                MobileNumber1 = value2;
                break;
              case "Email ID 1" :
                EmailId1 = value2;
                break;
              case " Member of" :
                MemberOf = value2;
                break;
              case "Graduation Course" :
                GraduationCourse = value2;
                break;
              case "Post Graduation Course" :
                PostGraduationCourse = value2;
                break;
              case " Services" :
                Services = value2;
                break;

            }

          });

          var newDoctor = new Doctor({
            name: doctorName,
            photoLink:doctorImageLink,
            Specialization: Specialization,
            Degree:  Degree,
            AreaOfSpecialization:AreaOfSpecialization,
            NameOfMedicalCouncil:NameOfMedicalCouncil,
            RegistrationNumber: RegistrationNumber,
            ClinicHospitalName: ClinicHospitalName,
            PracticeAs:PracticeAs,
            Management:Management,
            DateOfBirth:DateOfBirth,
            BloodGroup:BloodGroup,
            ClinicHospitalAddress: ClinicHospitalAddress,
            State:State,
            District:District,
            GeographicalArea: GeographicalArea,
            ResidenceAddess:ResidenceAddess,
            ClinicHospitalPhoneNumber:ClinicHospitalPhoneNumber,
            ResidencePhoneNumber:ResidencePhoneNumber,
            MobileNumber1:MobileNumber1,
            MobileNumber2:MobileNumber2,
            EmailId1: EmailId1,
            Website: Website,
            MemberOf:MemberOf,
            Services:Services
          });

          newDoctor.save(function(err, newUser) {
              if (err) return console.error(err);
            });
        }
      });
    });
  }
});

app.listen (PORT, function(){
  console.log("Application is listening on PORT : "+PORT);
});
