import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

$(document).ready(function() {
  
  function showDoctor(data){
    let htmlString = "<tr>";
    htmlString += "<td>" + data.first_name + "</td>";
    htmlString += "<td>" + data.last_name + "</td>";
    htmlString += "<td>" + data.address + "</td>";
    htmlString += "<td>" + data.phone_number + "</td>";
    htmlString += "<td>" + data.website + "</td>";
    htmlString += "<td>" + data.new_patients + "</td>";
    htmlString += "</tr>";
    $("#results").append(htmlString);
  }

});
