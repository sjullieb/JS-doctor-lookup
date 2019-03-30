import $ from 'jquery';
import { Doctor, Practice } from './doctor.js';

//format for location: 47.6130071%2C-122.4121035%2C100 - Seattle

export function searchDoctors(location_lat, location_lon, name, condition, showDoctor, showError){
  //process.env.API_KEY
  let nameQuery = ``;
  let conditionQuery = ``;
  if (name != "")
    nameQuery = `name=${name}&`;
  if (condition != "")
    conditionQuery = `query=${condition}&`;
console.log(`https://api.betterdoctor.com/2016-03-01/doctors?`+ conditionQuery + nameQuery + `location=${location_lat}%2C${location_lon}%2C100&user_location=${location_lat}%2C${location_lon}&sort=full-name-asc&skip=0&limit=10&user_key=${process.env.apiKey}`);
  $.get(`https://api.betterdoctor.com/2016-03-01/doctors?`+ conditionQuery + nameQuery + `location=${location_lat}%2C${location_lon}%2C100&user_location=${location_lat}%2C${location_lon}&sort=full-name-asc&skip=0&limit=10&user_key=${process.env.apiKey}`).then(function(response){

console.log(response);
      if(response.data.length > 0){
      //   let address = "";
      //   for(let i=0; i < response.data.length; i++){
      //     let address = response.data[i].practices[0].visit_address.street + " " +   response.data[i].practices[0].visit_address.city + " " + response.data[i].practices[0].visit_address.state + " " +
      //     response.data[i].practices[0].visit_address.zip;
      //
      //     let phone = "";
      //     for(let j=0; j < response.data[i].practices[0].phones.length; j++)
      //       phone += response.data[i].practices[0].phones[j].number + " ";
      //     showDoctor(response.data[i].profile.last_name, response.data[i].profile.first_name,
      //       phone, address, response.data[i].practices[0].accept_new_patients);
      //   }
        return true;
      }
      else {
        return false;
      }
      //

    }).fail(function(error){
      showError(error);
    });
}
