
var express = require('express');
const Alt_az_full = require('./alt_az_full.js');

var app = express ();
app.use(express.json());

const options = require('./data/options.json');
//console.log(options);

const PORT = process.env.PORT || 3100;

const mylat = options.latitude || 44.2307;
const mylong = options.longitude || -76.4813;

app.listen(PORT, () => {
  console.log("Planet Positions Server version 0.8 started at: ", Date());
  console.log("Planet Positions Server Listening on PORT:", PORT);
  console.log("compute Planet positions for longitude:", mylong);
  console.log("compute Planet positions for latitude:",mylat);
});

app.get("/status", (request, response) => {
   const status = {
      "Status": "Running"
   };
   
   response.send(status);
});

app.get("/planets", (request, response) => {
   const datenow = Date.now();
   const planets = Alt_az_full.GetPlanets(datenow, mylat, mylong);
   
   response.send(planets);
});
