// run this one with node test_app_small.js
var express = require('express');
const Alt_az_small = require('./alt_az_small.js');

const options = require('./data/options.json');
//console.log(options);

const mylat = options.latitude || 44.2307;
const mylong = options.longitude || -76.4813;

console.log("Planet Positions Test started at: ", Date());
console.log("compute Planet positions for longitude:", mylong);
console.log("compute Planet positions for latitude:",mylat);

const datenow = Date.now();
const planets = Alt_az_small.GetPlanets(datenow, mylat, mylong);

console.log("json response",planets);
