import $ from 'jquery';
import { Doctor, Practice } from './doctor.js';

export let allDoctors = [];

//format for location: 47.6130071%2C-122.4121035%2C100 - Seattle

export function searchDoctors(location_lat, location_lon, name, condition, pageNumber, perPage, showDoctors, showError, changePreviousNumberOfDoctorsOnPage){
  //process.env.API_KEY
  let nameQuery = ``;
  let conditionQuery = ``;
  let skip = pageNumber * perPage;
  if (name != "")
    nameQuery = `name=${name}&`;
  if (condition != "")
    conditionQuery = `query=${condition}&`;
  $.get(`https://api.betterdoctor.com/2016-03-01/doctors?`+ conditionQuery + nameQuery + `location=${location_lat}%2C${location_lon}%2C100&user_location=${location_lat}%2C${location_lon}&skip=${skip}&limit=${perPage}&user_key=${process.env.apiKey}`).then(function(response){
      allDoctors = [];
      if(response.data.length > 0){
        changePreviousNumberOfDoctorsOnPage(response.data.length);
        let newDoctor;
        let data;
        for(let i=0; i < response.data.length; i++)
        {
          data = response.data[i];
          newDoctor = new Doctor(data.profile.last_name, data.profile.first_name, data.profile.image_url);
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
      showDoctors(allDoctors);

    }).fail(function(error){
      showError(error);
    });
}
