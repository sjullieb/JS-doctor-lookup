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
      let hasData = searchDoctors(lat, lon, name, conditions, showDoctors, showError);
      console.log(hasData);
      if (hasData){
        $(".results").prepend("<h2>Search results</h2>");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        $(".results").show();
      }
      else {
        $(".noData").show();
      }
    }
  });

  function showDoctors(allDoctors){
    let htmlString = "";
    for(let i=0; i < allDoctors.length; i++)
    {
      htmlString += "<div class='row'>";
      htmlString += "<div class='col-md-4'><img src='" + allDoctors[i].imageUrl + "' alt='photo'></div>";
      htmlString += "<div class='col-md-8'><h3>" + allDoctors[i].firstName + " " + allDoctors[i].lastName + "</h3>";
      htmlString += "</div></div>";


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
