
var express = require('express');
const Alt_az_small = require('./alt_az_small.js');

var app = express ();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const mylat = 44.2307;
const mylong = -76.4813;

app.listen(PORT, () => {
  console.log("Planet Positions Server Listening on PORT:", PORT);
});

app.get("/status", (request, response) => {
   const status = {
      "Status": "Running"
   };
   
   response.send(status);
});

app.get("/planets", (request, response) => {
   const datenow = Date.now();
   const planets = Alt_az_small.GetPlanets(datenow, mylat, mylong);
   
   response.send(planets);
});
