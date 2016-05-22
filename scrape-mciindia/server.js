//All the money($$)I(Chinmay Kumar Das)raise from this website, will go to my son, Krishiv Das. I promise.
//For every dollar($)I raise, my daughter(Kritika IDC Das)and I shall get punched in the stomach by our son. I swear
//For My wife,(SwayamWhatIsHerName Das)She will need to buy her son everything he wants (Iphone, FitBit, etc.)I 100% promise.
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

var mciDoctor = require('./mciDoctor.js');

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Commented out as it pulls all data from the front page
//1,17,981
//
  for(id=1;id<=100;id++){
    url='http://www.mciindia.org/ViewDetails.aspx?ID='+id;

    request(url,function(error,response, body){
      if(!error && response.statusCode == 200) {

        $= cheerio.load(body);

        var name = $('#Name').text();
        var dateOfBirth = $('#DOB').text();
        var yearOfInfo = $('#lbl_Info').text();
        var registrationNumber = $('#Regis_no').text();
        var registrationYear = $('#Date_Reg').text();
        var stateMedicalCouncil = $('#Lbl_Council').text();
        var qualification = $('#Qual').text();
        var qualificationYear = $('#QualYear').text();
        var universityName = $('#Univ').text();
        var permanentAddress = $('#Address').text();

        // console.log(name);
        // console.log(dateOfBirth);
        // console.log(yearOfInfo);
        // console.log(registrationNumber);
        // console.log(registrationYear);
        // console.log(stateMedicalCouncil);
        // console.log(qualification);
        // console.log(qualificationYear);
        // console.log(universityName);
        // console.log(permanentAddress);

      }

        var newDoctor = new mciDoctor({
              name: name,
              dateOfBrith:dateOfBirth,
              yearOfInfo: yearOfInfo,
              registrationNumber: registrationNumber,
              dateOfRegistration:registrationYear,
              stateMedicalCouncil:stateMedicalCouncil,
              qualification: qualification,
              qualificationYear:qualificationYear,
              universityName: universityName,
              permanentAddress:permanentAddress,
          });
          newDoctor.save(function(err, newUser) {
            if (err) return console.error(err);
          });

    })
  }
      // request('http://www.drdata.in/list-doctors.php?search=doctor&page=3', function(error, response, body){
      //   if (!error && response.statusCode == 200) {
      //     $ = cheerio.load(body);
      //     debugger;
      //     $('#no-more-tables').find('tbody').find('tr').each(function(i,elem){

      //       var drLink = 'http://www.drdata.in/'+ elem.children[13].children[1].attribs.href;
      //       // console.log(drLink);


      // request(drLink, function(error, response, body){
      //   if (!error && response.statusCode == 200) {
      //     $ = cheerio.load(body);

      //     var doctorName = $('h2').text();
      //     var doctorImageLink = 'http://www.drdata.in/'+ $('.thumbnail').find('img').attr('src');

      //     var Specialization, Degree, AreaOfSpecialization, NameOfMedicalCouncil, RegistrationNumber;
      //     var ClinicHospitalName, PracticeAs, Management, DateOfBirth,BloodGroup, ClinicHospitalAddress;
      //     var State,District, GeographicalArea, ResidenceAddess, ClinicHospitalPhoneNumber,ResidencePhoneNumber;
      //     var MobileNumber1, MobileNumber2, EmailId1, Website, MemberOf, Services, GraduationCourse, PostGraduationCourse;

      //     $('#myTabContent').find('table').find('tr').each(function(i,elem){

      //       var value1 = $(this).find('td').eq(0).text();
      //       var value2 = $(this).find('td').eq(1).text();

      //       switch(value1) {
      //         case "Specialization" :
      //           Specialization = value2;
      //           break
      //         case " Degree" :
      //           Degree = value2;
      //           break;
      //         case " Area of Specialization" :
      //           AreaOfSpecialization = value2;
      //           break;
      //         case "Name of Medical Council" :
      //           NameOfMedicalCouncil= value2;
      //           break;
      //         case "Registration Number" :
      //           RegistrationNumber = value2;
      //           break;
      //         case "Clinic/ Hospital Name" :
      //           ClinicHospitalName = value2;
      //           break;
      //         case "Practice as" :
      //           PracticeAs = value2;
      //           break;
      //         case "Management" :
      //           Management = value2;
      //           break;
      //       }

      //     });

//           var newDoctor = new Doctor({
//               name: String,
//               dateOfBrith:String,
//               yearOfInfo: String,
//               registrationNumber: String,
//               dateOfRegistration:String,
//               stateMedicalCouncil:String,
//               qualification: String,
//               qualificationYear:String,
//               universityName: String,
//               permanentAddress:String,
//           });

//           newDoctor.save(function(err, newUser) {
//               if (err) return console.error(err);
//             });
//         }
//       });
//     });
//   }
// });

app.listen (PORT, function(){
  console.log("Application is listening on PORT : "+PORT);
});
