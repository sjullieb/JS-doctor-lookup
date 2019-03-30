import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { searchDoctors, allDoctors } from './searchDoctors.js';
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
      clearPreviousSearch();
      searchDoctors(lat, lon, name, conditions, pageNumber, perPage, showDoctors, showError, changePreviousNumberOfDoctorsOnPage);
    }
  });

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
      console.log("no data");
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
          htmlString += "</p></div>"; // column
          htmlString += "</div>"; // row
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
      clearPreviousSearch();
      searchDoctors(lat, lon, name, conditions, pageNumber, perPage, showDoctors, showError, changePreviousNumberOfDoctorsOnPage);
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
      clearPreviousSearch();
      searchDoctors(lat, lon, name, conditions, pageNumber, perPage, showDoctors, showError, changePreviousNumberOfDoctorsOnPage);
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
    $(".errors").text(error);
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
