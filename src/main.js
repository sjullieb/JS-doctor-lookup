import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { searchDoctors } from './doctors.js';

// Seattle location
// 47.6130071 -122.4121035

const lat = 47.6130071;
const lon = -122.4121035;

$(document).ready(function() {

  $("#newSearch").submit(function(event){
    event.preventDefault();
console.log(1);
    let name = $("#name").val();
    let conditions = $("#conditions").val();

    if ((name == "") && (conditions == "")) {
      console.log("empty");
      alert("Please enter at least one search parameter!");
      $("#name").focus();
    }
    else {
      console.log("call function");
      clearPreviousSearch();
      let hasData = searchDoctors(lat, lon, name, conditions, showDoctor, showError);
      if (hasData){
        $(".results").show();
      }
      else {
        $(".noData").show();
      }
    }
  });

  function showDoctor(lastName, firstName, address, phoneNumber, website, newPatients){
    let htmlString = "<tr>";
    htmlString += "<th>" + lastName + "</th>";
    htmlString += "<th>" + firstName + "</th>";
    htmlString += "<th>" + address + "</th>";
    htmlString += "<th>" + phoneNumber + "</th>";
    htmlString += "<th>" + website + "</th>";
    htmlString += "<th>" + newPatients + "</th>";
    htmlString += "</tr>";
    $(".doctor").append(htmlString);
  }

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
  }
});
