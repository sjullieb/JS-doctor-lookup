import $ from 'jquery';
import { Doctor, Practice } from './doctor.js';

export let allDoctors = [];

//format for location: 47.6130071%2C-122.4121035%2C100 - Seattle

export function searchDoctors(location_lat, location_lon, name, condition, showDoctors, showError){
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
        allDoctors = [];

        let newDoctor;
        let address = "";
        let data;
        for(let i=0; i < response.data.length; i++)
        {
          data = response.data[i];
          newDoctor = new Doctor(data.profile.last_name, data.profile.first_name, data.profile.image_url);
          console.log(newDoctor);
          allDoctors.push(newDoctor);
          let newPractice;
          let address;
          for(let k=0; k < data.practices.length; k++)
          {
            let address = data.practices[k].visit_address.street + " " +   data.practices[k].visit_address.city + " " + data.practices[k].visit_address.state + " " +
            data.practices[k].visit_address.zip;
            newPractice = new Practice(data.practices[k].name, address, data.practices[k].accepts_new_patients);

            for(let j=0; j < data.practices[k].phones.length; j++)
            {
              newPractice.addPhone(data.practices[k].phones[j].number);
            }
            newDoctor.addPractice(newPractice);
          }
        }
        console.log(allDoctors);
        showDoctors(allDoctors);
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
