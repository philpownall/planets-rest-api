
Node.js Planets Server
======================
by Phil Pownall

Description
-----------

This server calculates the positions (Right Ascension, Declination, Altitude, and Azimuth) and transit times (Transit, Rise, and Set) of the Sun, Moon, and planets from the observer's longitude and latitude at the current time.  The server provides a REST API on port 3000 that returns the data in a json.

Acknowledgments
---------------

Many thanks to the contributors to the open-source, publicly accessible VSOP87 standard.
VSOP87 was developed and is maintained (updated with the latest data) by the scientists at the Bureau des Longitudes in Paris.
An example in JavaScript showing computations is available from Greg Miller's Celestial Programming website at http://www.celestialprogramming.com/vsop87-multilang/
It provides the positions of 9 planetary bodies accurate to 7 decimal places...
The model is large - even the *small* model which this example uses is 10,000 lines of code.

### Ingredients

The project consists of the following elements:

1. The VSOP87A_small planetary computation model in 5 Javascript files (alt_az_small.js, and 4 lightly modified Javascript files from Greg Miller's celestial programming website - 
    - CelestialProgrammingReduce_small.js, 
    - vsop87a_small.js, and
    - vsop87a_small_velocities.js
    - riseset.js
2. A Node.js app (app.js) to provide a REST API server for the planetary positions.


Running the server
==================

Clone this repository, and navigate to the folder containing the app.js.  Enter your longitude and latitude in app.js, and run the application:

```
cd ~/planets-rest-api
node app.js
```

The server can be checked using curl:

```
curl http://localhost:3000/planets

{
  "Planets": "2024-10-07T13:40:52.795Z",
  "Sun": {
    "RA": "193.61",
    "Dec": "-5.83",
    "Alt": "23.86",
    "Az": "125.84",
    "Transit": "12:51:53",
    "Rise": "07:09:59",
    "Set": "18:33:46"
  },
  "Moon": {
    "RA": "245.06",
    "Dec": "-26.65",
    "Alt": "-24.83",
    "Az": "103.84",
    "Transit": "16:17:41",
    "Rise": "12:15:32",
    "Set": "20:19:50"
  },
  "Mercury": {
    "RA": "198.48",
    "Dec": "-7.14",
    "Alt": "19.92",
    "Az": "122.50",
    "Transit": "13:11:21",
    "Rise": "07:36:09",
    "Set": "18:46:33"
  },
  "Venus": {
    "RA": "224.95",
    "Dec": "-17.66",
    "Alt": "-5.01",
    "Az": "109.85",
    "Transit": "14:57:15",
    "Rise": "10:05:58",
    "Set": "19:48:31"
  },
  "Mars": {
    "RA": "109.83",
    "Dec": "22.88",
    "Alt": "53.90",
    "Az": "245.55",
    "Transit": "07:16:44",
    "Rise": "23:35:55",
    "Set": "14:57:34"
  },
  "Saturn": {
    "RA": "346.06",
    "Dec": "-8.33",
    "Alt": "-49.87",
    "Az": "327.26",
    "Transit": "23:01:40",
    "Rise": "17:31:14",
    "Set": "04:32:06"
  },
  "Jupiter": {
    "RA": "80.62",
    "Dec": "22.44",
    "Alt": "33.24",
    "Az": "269.94",
    "Transit": "05:19:54",
    "Rise": "21:41:20",
    "Set": "12:58:29"
  },
  "Uranus": {
    "RA": "54.50",
    "Dec": "19.17",
    "Alt": "12.59",
    "Az": "284.60",
    "Transit": "03:35:27",
    "Rise": "20:12:46",
    "Set": "10:58:08"
  },
  "Neptune": {
    "RA": "358.75",
    "Dec": "-1.99",
    "Alt": "-38.50",
    "Az": "315.45",
    "Transit": "23:52:27",
    "Rise": "17:57:01",
    "Set": "05:47:52"
  }
}
