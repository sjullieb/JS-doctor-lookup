# _Doctor Lookup_

#### _A web application that shows a list of doctors in the area, Created 03/29/2019_

#### By _**Yulia Shidlovskaya**_

## Description

_A website that allows users to find a doctor that provides the services they need nearby._

A user should be able to enter a medical issue to receive a list of doctors in the Seattle area that fit the search query.
A user should be able to enter a name to receive a list of doctors in the Seattle area that fit the search query.
If the query response includes any doctors, the following information should be included about each doctor: first name, last name, address, phone number, website and whether or not the doctor is accepting new patients (the API provides this data).
If the API call results in an error (any message not a 200 OK), the application should return a notification that states what the error is.
If the query response doesn't include any doctors (for instance, if no doctors meet the search criteria), the application should return a notification that states that no doctors meet the criteria. (This is not an error so it should be handled separately from any errors.)

## Setup/Installation Requirements

* Download and install Node.js
* Clone this repository: $ git clone repo name
* Change into the work directory: $ cd JS-doctor-lookup
* Visit the BetterDoctor API site https://developer.betterdoctor.com/ and click “Get a free API key”
* Fill out the form
* Find your API key on the front page (ex: “a2c356ibgh44…..”) or under My Account > Applications
* Create a file JS-doctor-lookup $ touch .evn
* Open the file in any editor, add the following line and save the file
       apiKey = YOUR UNIQUE API KEY GOES HERE
* Run the command $ npm install
* Run the command $ npm run build
* Run the command $ npm run start

## Support and contact details

_If you run into any issues or have questions, ideas or concerns. Please email me at sjullieb@gmail.com_

## Technologies Used

* HTML
* CSS
* Bootstrap
* Javascript
* JQuery
* WebPack
* Node Package Manager
* BetterDoctor API

### License

*MIT*

Copyright (c) 2019 **_Yulia Shidlovskaya_**
