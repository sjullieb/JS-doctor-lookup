import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { DoctorService } from './searchDoctors.js';
import { Doctor, Practice } from './doctor.js';

// Seattle location
// 47.6130071 -122.4121035

const lat = 47.6130071;
const lon = -122.4121035;
let pageNumber = 0;
let perPage = 10;
let previousNumberOnPage = 0;
let name;
let conditions;
let allDoctors = [];

$(document).ready(function() {

  $("#next").prop("disabled",true);
  $("#previous").prop("disabled",true);

  $("#newSearch").submit(function(event){
    event.preventDefault();
    name = $("#name").val();
    conditions = $("#conditions").val();
    pageNumber = 0;
    previousNumberOnPage = perPage;

    clearPreviousSearch();

    if ((name == "") && (conditions == "")) {
      alert("Please enter at least one search parameter!");
      $("#name").focus();
    }
    else {
      startSearch();
    }
  });

  function startSearch(){
    clearPreviousSearch();
    let doctors = new DoctorService();
    let promise = doctors.searchDoctors(lat, lon, name, conditions, pageNumber, perPage, showDoctors);

    promise.then(function(response){
      let body = JSON.parse(response);

      allDoctors = [];
console.log(body);
      console.log("length" + body.data.length);
      if(body.data.length > 0){
        changePreviousNumberOfDoctorsOnPage(body.data.length);
        let newDoctor;
        let data;
        for(let i=0; i < body.data.length; i++)
        {
          data = body.data[i];
          newDoctor = new Doctor(data.profile.last_name, data.profile.first_name, data.profile.image_url);
console.log(newDoctor);
          allDoctors.push(newDoctor);
          let newPractice;
          let address;
          let newPatients;
          for(let k=0; k < data.practices.length; k++)
          {
            address = data.practices[k].visit_address.street + " " + data.practices[k].visit_address.city + " " + data.practices[k].visit_address.state + " " + data.practices[k].visit_address.zip;

            if(data.practices[k].accepts_new_patients.toString() == "true")
            {
              newPatients = "Yes";
            }
            else
            {
              newPatients = "No";
            }

            newPractice = new Practice(data.practices[k].name, address, newPatients);

            for(let j=0; j < data.practices[k].phones.length; j++)
            {
              newPractice.addPhone(data.practices[k].phones[j].number);
            }
            newDoctor.addPractice(newPractice);
          }
        }
      }
      console.log(allDoctors);
      showDoctors(allDoctors);
    }, function(error) {
      console.log(error);
      showError(error);
    });
  }

  function showDoctors(allDoctors){
    let htmlString = "";
    clearPreviousSearch();

    if (pageNumber == 0) {
      $("#previous").prop("disabled",true);
    }
    else {
      $("#previous").prop("disabled",false);
    }

    if (allDoctors.length == 0){
      $(".noData").show();
    }
    else {
      for(let i=0; i < allDoctors.length; i++)
      {
        htmlString += "<div class='row'>";
        htmlString += "<div class='col-md-4'><img src='" + allDoctors[i].imageUrl + "' alt='photo'></div>";
        htmlString += "<div class='col-md-8'><h3>" + allDoctors[i].firstName + " " + allDoctors[i].lastName + "</h3>";
        htmlString += "</div></div><br>";


        for(let k=0; k < allDoctors[i].practices.length; k++)
        {
          htmlString += "<div class='row'>";
          htmlString += "<div class='col-md-4'>";
          htmlString += "<p>Practice name:<br>Address:<br>Phones:<br>Accepts new patients:</p>"
          htmlString += "</div>";

          htmlString += "<div class='col-md-8'>";
          htmlString += "<p>" + allDoctors[i].practices[k].name + "<br>";
          htmlString += allDoctors[i].practices[k].address + "<br>";

          for(let j=0; j < allDoctors[i].practices[k].phones.length; j++)
          {
            htmlString += allDoctors[i].practices[k].phones[j] + " ";
          }
          htmlString += "<br>";
          htmlString += allDoctors[i].practices[k].newPatients + "<br>";
          htmlString += "</p></div>";
          htmlString += "</div>";
        }

        htmlString += "<hr>";

      }
      $(".results").append(htmlString);
      $(".results").show();
    }
  }

  $("#next").click(function(){
    if(previousNumberOnPage == perPage){
      $("#previous").prop("disabled",false);
      pageNumber++;
      startSearch();
    }
  });

  $("#previous").click(function(){
    if(pageNumber != 0){
      pageNumber--;
      if (pageNumber == 0)
      {
        $("#previous").prop("disabled",true);
      }
      else {
        $("#previous").prop("disabled",false);
      }
      startSearch();
    }
  });

  function clearPreviousSearch()
  {
    $(".results").empty();
    $(".results").hide();
    $(".errors").hide();
    $(".noData").hide();
  }

  function showError(error)
  {
    $(".errors").text(`There was an error processing your request: ${error.responseText}. Please try again.`);
    $(".errors").show();
  }

  function changePreviousNumberOfDoctorsOnPage(newNumber)
  {
    if (newNumber < perPage)
    {
      $("#next").prop("disabled",true);
    }
    else {
      $("#next").prop("disabled",false);
    }

    previousNumberOnPage = newNumber;
  }
});
