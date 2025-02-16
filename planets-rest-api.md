
Node.js Planets Server
======================
by Phil Pownall

Description
-----------

This server calculates the positions (Right Ascension, Declination, Altitude, and Azimuth) and transit times (Transit, Rise, and Set) of the Sun, Moon, and planets from the observer's longitude and latitude at the current time.  The server provides a REST API on port 3000 that returns the positional data in a json.

Acknowledgments
---------------

Many thanks to the contributors to the open-source, publicly accessible VSOP87 standard.
VSOP87 was developed and is maintained (updated with the latest data) by the scientists at the Bureau des Longitudes in Paris.
An example in JavaScript showing computations is available from Greg Miller's Celestial Programming website at http://www.celestialprogramming.com/vsop87-multilang/
It provides the positions of 9 planetary bodies accurate to 7 decimal places...
The model is large - even the *small* model is 10,000 lines of code.  The *full* model is 43,000 lines.
However, the computational load is reasonable - less than 1% on a typical server pc.

### Ingredients

The project consists of the following elements:

1. The VSOP87A_full planetary computation model in 5 Javascript files (alt_az_full.js, and 4 lightly modified Javascript files from Greg Miller's celestial programming website - 
    - CelestialProgrammingReduce_full.js, 
    - vsop87a_full.js, and
    - vsop87a_full_velocities.js
    - riseset.js
2. A Node.js app (app.js) to provide a REST API server for the planetary positions.


### Optional Ingredients

3. A Dockerfile to enable the server to be run using Docker

4. A config.yaml to enable the server to be run as a Local Add-On in Home Assistant (see https://developers.home-assistant.io/docs/add-ons/tutorial/ )

Running the server
==================

Clone this repository, and navigate to the folder containing the app.js.  Enter your longitude and latitude in app.js, and run the application:

```
cd ~/planets-rest-api
node app.js
```

The server can be checked using curl:

```
curl http://homeassistant.local:3100/planets

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
```

Adding sensors in Home Assistant
================================

If the planets server is run as a Local Add-on in Home Assistant, REST sensors can be defined in your configuration.yaml as shown below.
Once the Add-on is loaded, select the Add-On configuration tab to specify your longitude and latitude.

```
# rest command to send web requests
rest:
  - resource: http://homeassistant.local:3100/planets # a VSOP87 planet positions server 
    method: GET
    headers:
      User-Agent: Home Assistant
      Accept: application/json
    scan_interval: 60
    sensor:
      - name: "Planets Sun"
        unique_id: planets101
        value_template: "{{ value_json['Sun']['Alt']|float(0) > 0.0 }}"
        json_attributes_path: "$.Sun"
        json_attributes:
            - "RA"
            - "Dec"
            - "Alt"
            - "Az"
            - "Rise"
            - "Set"
      - name: "Planets Moon"
        unique_id: planets102
        value_template: "{{ value_json['Moon']['Alt']|float(0) > 0.0 }}"
        json_attributes_path: "$.Moon"
        json_attributes:
            - "RA"
            - "Dec"
            - "Alt"
            - "Az"
            - "Rise"
            - "Set"
      - name: "Planets Mercury"
        unique_id: planets103
        value_template: "{{ value_json['Mercury']['Alt']|float(0) > 0.0 }}"
        json_attributes_path: "$.Mercury"
        json_attributes:
            - "RA"
            - "Dec"
            - "Alt"
            - "Az"
            - "Rise"
            - "Set"
      - name: "Planets Venus"
        unique_id: planets104
        value_template: "{{ value_json['Venus']['Alt']|float(0) > 0.0 }}"
        json_attributes_path: "$.Venus"
        json_attributes:
            - "RA"
            - "Dec"
            - "Alt"
            - "Az"
            - "Rise"
            - "Set"
      - name: "Planets Mars"
        unique_id: planets105
        value_template: "{{ value_json['Mars']['Alt']|float(0) > 0.0 }}"
        json_attributes_path: "$.Mars"
        json_attributes:
            - "RA"
            - "Dec"
            - "Alt"
            - "Az"
            - "Rise"
            - "Set"
      - name: "Planets Saturn"
        unique_id: planets106
        value_template: "{{ value_json['Saturn']['Alt']|float(0) > 0.0 }}"
        json_attributes_path: "$.Saturn"
        json_attributes:
            - "RA"
            - "Dec"
            - "Alt"
            - "Az"
            - "Rise"
            - "Set"
      - name: "Planets Jupiter"
        unique_id: planets107
        value_template: "{{ value_json['Jupiter']['Alt']|float(0) > 0.0 }}"
        json_attributes_path: "$.Jupiter"
        json_attributes:
            - "RA"
            - "Dec"
            - "Alt"
            - "Az"
            - "Rise"
            - "Set"
      - name: "Planets Uranus"
        unique_id: planets108
        value_template: "{{ value_json['Uranus']['Alt']|float(0) > 0.0 }}"
        json_attributes_path: "$.Uranus"
        json_attributes:
            - "RA"
            - "Dec"
            - "Alt"
            - "Az"
            - "Rise"
            - "Set"
      - name: "Planets Neptune"
        unique_id: planets109
        value_template: "{{ value_json['Neptune']['Alt']|float(0) > 0.0 }}"
        json_attributes_path: "$.Neptune"
        json_attributes:
            - "RA"
            - "Dec"
            - "Alt"
            - "Az"
            - "Rise"
            - "Set"
```


Adding a Lovelace Dashboard
===========================

Adding a Lovelace Dashboard for the planets sensors - using custom:mini-graph-card, custom:compass-card, and card-mod.

[Planets Dashboard](planets.png)

The yaml code for the dashboard is as follows.  Note that an additonal helper called input_number.zero (value 0) is used to show the horizon on the mini-graph-card.


```
views:
  - type: sections
    path: ''
    max_columns: 3
    sections:
      - type: grid
        cards:
          - type: custom:mini-graph-card
            height: 275
            name: Altitude
            icon: mdi:moon-waxing-crescent
            line_width: 4
            lower_bound: -90
            upper_bound: 90
            hours_to_show: 24
            points_per_hour: 1
            show:
              state: false
              legend: true
              labels: true
            entities:
              - entity: sensor.planets_sun
                attribute: Alt
                color: yellow
              - entity: sensor.planets_moon
                attribute: Alt
              - entity: sensor.planets_mercury
                attribute: Alt
                color: pink
              - entity: sensor.planets_venus
                attribute: Alt
              - entity: sensor.planets_mars
                attribute: Alt
                color: red
              - entity: sensor.planets_jupiter
                attribute: Alt
              - entity: sensor.planets_saturn
                attribute: Alt
              - entity: input_number.zero
                color: white
          - type: custom:compass-card
            tap_action:
              entity: sensor.planets_mars
            header:
              title:
                value: Mars
              icon:
                color: red
                dynamic_style:
                  sensor: sensor.planets_mars
                  attribute: Alt
                  bands:
                    - from_value: 0
                      color: white
            indicator_sensors:
              - sensor: sensor.planets_mars
                attribute: Az
                indicator:
                  type: circle
                  color: red
            compass:
              north:
                show: true
              east:
                show: true
              west:
                show: true
              south:
                show: true
              circle:
                show: true
                color: blue
                dynamic_style:
                  sensor: sensor.planets_mars
                  attribute: Alt
                  bands:
                    - from_value: 0
                      color: white
            value_sensors:
              - sensor: sensor.planets_mars
                attribute: Alt
                units: °
          - type: custom:compass-card
            tap_action:
              entity: sensor.planets_moon
            header:
              title:
                value: Moon
              icon:
                color: red
                dynamic_style:
                  sensor: sensor.planets_moon
                  attribute: Alt
                  bands:
                    - from_value: 0
                      color: white
            indicator_sensors:
              - sensor: sensor.planets_moon
                attribute: Az
                indicator:
                  type: circle
                  color: blue
            compass:
              north:
                show: true
              east:
                show: true
              west:
                show: true
              south:
                show: true
              circle:
                show: true
                color: blue
                dynamic_style:
                  sensor: sensor.planets_moon
                  attribute: Alt
                  bands:
                    - from_value: 0
                      color: white
            value_sensors:
              - sensor: sensor.planets_moon
                attribute: Alt
                units: °
          - type: entities
            title: Moon is up
            icon: mdi:moon-waxing-crescent
            entities:
              - type: attribute
                entity: sensor.planets_moon
                attribute: Rise
                name: Rise Time
              - type: attribute
                entity: sensor.planets_moon
                attribute: Set
                name: Set Time
            visibility:
              - condition: state
                entity: sensor.planets_moon
                state: 'True'
            card_mod:
              style: |
                #states > * {
                  margin: -1px 0px !important;
                }
                ha-card {
                  transform: scale(0.9);
                  margin: 0;
                }
          - type: custom:compass-card
            tap_action:
              entity: sensor.planets_venus
            header:
              title:
                value: Venus
              icon:
                color: purple
                dynamic_style:
                  sensor: sensor.planets_venus
                  attribute: Alt
                  bands:
                    - from_value: 0
                      color: white
            indicator_sensors:
              - sensor: sensor.planets_venus
                attribute: Az
                indicator:
                  type: circle
                  color: purple
            compass:
              north:
                show: true
              east:
                show: true
              west:
                show: true
              south:
                show: true
              circle:
                show: true
                color: blue
                dynamic_style:
                  sensor: sensor.planets_venus
                  attribute: Alt
                  bands:
                    - from_value: 0
                      color: white
            value_sensors:
              - sensor: sensor.planets_venus
                attribute: Alt
                units: °
      - type: grid
        cards:
          - type: custom:compass-card
            tap_action:
              entity: sensor.planets_sun
            header:
              title:
                value: Sun
              icon:
                color: orange
                dynamic_style:
                  sensor: sensor.planets_sun
                  attribute: azimuth
                  bands:
                    - from_value: 0
                      color: yellow
            indicator_sensors:
              - sensor: sensor.planets_sun
                attribute: Az
                indicator:
                  type: circle
                  color: orange
            compass:
              east:
                show: true
              west:
                show: true
              south:
                show: true
              circle:
                show: true
                color: blue
                dynamic_style:
                  sensor: sensor.planets_sun
                  attribute: Alt
                  bands:
                    - from_value: 0
                      color: yellow
              north:
                show: true
            value_sensors:
              - sensor: sensor.planets_sun
                attribute: Alt
                units: °
          - type: entities
            title: Sun is up
            icon: mdi:sun-compass
            entities:
              - type: attribute
                entity: sensor.planets_sun
                attribute: Rise
                name: Rise Time
              - type: attribute
                entity: sensor.planets_sun
                attribute: Set
                name: Set Time
            visibility:
              - condition: state
                entity: sensor.planets_sun
                state: 'True'
            card_mod:
              style: |
                #states > * {
                  margin: -1px 0px !important;
                }
                ha-card {
                  transform: scale(0.9);
                  margin: 0;
                }
          - type: custom:compass-card
            tap_action:
              entity: sensor.planets_mercury
            header:
              title:
                value: Mercury
              icon:
                color: pink
                dynamic_style:
                  sensor: sensor.planets_mercury
                  attribute: Alt
                  bands:
                    - from_value: 0
                      color: white
            indicator_sensors:
              - sensor: sensor.planets_mercury
                attribute: Az
                indicator:
                  type: circle
                  color: pink
            compass:
              north:
                show: true
              east:
                show: true
              west:
                show: true
              south:
                show: true
              circle:
                show: true
                color: blue
                dynamic_style:
                  sensor: sensor.planets_mercury
                  attribute: Alt
                  bands:
                    - from_value: 0
                      color: white
            value_sensors:
              - sensor: sensor.planets_mercury
                attribute: Alt
                units: °
          - type: custom:compass-card
            tap_action:
              entity: sensor.planets_jupiter
            header:
              title:
                value: Jupiter
              icon:
                color: red
                dynamic_style:
                  sensor: sensor.planets_jupiter
                  attribute: Alt
                  bands:
                    - from_value: 0
                      color: white
            indicator_sensors:
              - sensor: sensor.planets_jupiter
                attribute: Az
                indicator:
                  type: circle
                  color: Green
            compass:
              north:
                show: true
              east:
                show: true
              west:
                show: true
              south:
                show: true
              circle:
                show: true
                color: blue
                dynamic_style:
                  sensor: sensor.planets_jupiter
                  attribute: Alt
                  bands:
                    - from_value: 0
                      color: white
            value_sensors:
              - sensor: sensor.planets_jupiter
                attribute: Alt
                units: °
          - type: custom:compass-card
            tap_action:
              entity: sensor.planets_saturn
            header:
              title:
                value: Saturn
              icon:
                color: red
                dynamic_style:
                  sensor: sensor.planets_saturn
                  attribute: Alt
                  bands:
                    - from_value: 0
                      color: white
            indicator_sensors:
              - sensor: sensor.planets_saturn
                attribute: Az
                indicator:
                  type: circle
                  color: teal
            compass:
              north:
                show: true
              east:
                show: true
              west:
                show: true
              south:
                show: true
              circle:
                show: true
                color: blue
                dynamic_style:
                  sensor: sensor.planets_saturn
                  attribute: Alt
                  bands:
                    - from_value: 0
                      color: white
            value_sensors:
              - sensor: sensor.planets_saturn
                attribute: Alt
                units: °
```
