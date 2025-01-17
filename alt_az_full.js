// This is a slightly modified version of example_alt_az_full.html by Greg Miller 
// To make it work with Node.js and add the calculation of the transit(rise,set) for each planet
var CPReduce = require('./CelestialProgrammingReduce_full.js');

﻿module.exports = class Alt_az_full {

    static GetPlanets (d, mylat, mylong) {

        // initialize the planets json
        var planets = { "Planets" : "timestamp",
            "Sun": { "RA": 1.0, "Dec": 2.0, "Alt": 60.0, "Az": 300.0, "Transit": "01:02:30", "Rise": "06:44:40", "Set": "19:14:39" },
            "Moon": { "RA": 1.0, "Dec": 2.0, "Alt": 60.0, "Az": 300.0, "Transit": "01:02:30", "Rise": "06:44:40", "Set": "19:14:39" },
            "Mercury": { "RA": 1.0, "Dec": 2.0, "Alt": 60.0, "Az": 300.0, "Transit": "01:02:30", "Rise": "06:44:40", "Set": "19:14:39" },
            "Venus": { "RA": 1.0, "Dec": 2.0, "Alt": 60.0, "Az": 300.0, "Transit": "01:02:30", "Rise": "06:44:40", "Set": "19:14:39" },
            "Mars": {"RA": 1.0, "Dec": 2.0, "Alt": 60.0, "Az": 300.0, "Transit": "01:02:30", "Rise": "06:44:40", "Set": "19:14:39" },
            "Saturn": {"RA": 1.0, "Dec": 2.0, "Alt": 60.0, "Az": 300.0, "Transit": "01:02:30", "Rise": "06:44:40", "Set": "19:14:39" },
            "Jupiter": {"RA": 1.0, "Dec": 2.0, "Alt": 60.0, "Az": 300.0, "Transit": "01:02:30", "Rise": "06:44:40", "Set": "19:14:39" },
            "Uranus": {"RA": 1.0, "Dec": 2.0, "Alt": 60.0, "Az": 300.0, "Transit": "01:02:30", "Rise": "06:44:40", "Set": "19:14:39" },
            "Neptune": {"RA": 1.0, "Dec": 2.0, "Alt": 60.0, "Az": 300.0, "Transit": "01:02:30", "Rise": "06:44:40", "Set": "19:14:39" }
        };
        planets.Planets = new Date(d);

        const jd = this.JulianDateFromUnixTime(d);

        // compute Sun position for my location, now UTC
    	planets.Sun = this.computePosition(10, mylat, mylong, jd);
        // compute Moon position for my location, now UTC
    	planets.Moon = this.computePosition(301, mylat, mylong, jd);
        // Computer Mercury position
        planets.Mercury = this.computePosition(199, mylat, mylong, jd);
        // Computer Venus position
        planets.Venus = this.computePosition(299, mylat, mylong, jd);
        // Compute Mars position
        planets.Mars = this.computePosition(499, mylat, mylong, jd);
        // Computer Jupiter position
        planets.Jupiter = this.computePosition(599, mylat, mylong, jd);
        // Compute Saturn position
        planets.Saturn = this.computePosition(699, mylat, mylong, jd);
        // Compute Uranus position
        planets.Uranus = this.computePosition(799, mylat, mylong, jd);
        // Compute Neptune position
        planets.Neptune = this.computePosition(899, mylat, mylong, jd);

        return planets;
    }

    static JulianDateFromUnixTime(t){
    	//Not valid for dates before Oct 15, 1582
    	return (t / 86400000) + 2440587.5;
    }

    static computePosition(body, lat, lon, jd){

    	const b=this.jplBodyToInt(body);

    	const deltaT=(CPReduce.convertUTCtoTT(jd)-jd)*60*60*24;

    	//All angles passed to CPReduce need to be in radians!!!!!
    	const observer=[lat*Math.PI/180, lon*Math.PI/180, 0];

    	//---------------------------------------------------------------------------------------------------------
    	//This is the main call that gets the position of a planet from the CPReduce library.
    	//Get the RA/Dec and Alt/Az.
    	const positions=CPReduce.reduce(b,jd,observer);
    	//---------------------------------------------------------------------------------------------------------

        const ra = positions[2];
        const dec = positions[3];
 
        const riseset = this.getRiseSet(body,jd,lat*Math.PI/180,-lon*Math.PI/180,ra,dec);

        var planetjson = {
            "RA": (positions[2] * 180.0/Math.PI).toFixed(2),
            "Dec": (positions[3] * 180.0/Math.PI).toFixed(2),
            "Alt": (positions[5] * 180.0/Math.PI).toFixed(2),
            "Az": (positions[4] * 180.0/Math.PI).toFixed(2),
            "Transit": this.formatTime(riseset[0]),
            "Rise": this.formatTime(riseset[1]),
            "Set": this.formatTime(riseset[2])
        }

        return planetjson;

    }

    //Corrects values to make them between 0 and 1
    static constrain(v){
	    if(v<0){return v+1;}
	    if(v>1){return v-1;}
	    return v;
    }

    //All angles must be in radians
    //Outputs are times in hours GMT (not accounting for daylight saving time)
    //From Meeus Page 101
    static getRiseSet(body,jd,lat,lon,ra,dec){
        const h0=this.bodyToh0(body);
	    //const h0=-0.8333 //For Sun
	    //const h0=-0.5667 //For stars and planets
	    //const h0=0.125   //For Moon

	    const cosH=(Math.sin(h0*Math.PI/180.0)-Math.sin(lat)*Math.sin(dec)) / (Math.cos(lat)*Math.cos(dec));
	    const H0=Math.acos(cosH)*180.0/Math.PI;

	    const gmst=this.GMST(Math.floor(jd)+.5);

	    const transit=(ra*180.0/Math.PI+lon*180.0/Math.PI-gmst)/360.0;
	    const rise=transit-(H0/360.0);
	    const set=transit+(H0/360.0);

	    return [this.constrain(transit)*24.0,this.constrain(rise)*24.0,this.constrain(set)*24.0];
    }

    static bodyToh0(b){
	    switch(b){
	    	case 10: return -0.8333;
	    	case 199: return -0.5667;
	    	case 299: return -0.5667;
	    	case 399: return -0.5667;
	    	case 499: return -0.5667;
	    	case 599: return -0.5667;
	    	case 699: return -0.5667;
	    	case 799: return -0.5667;
	    	case 899: return -0.5667;
	    	case 301: return 0.125;
	    }
    }

    static formatTime(h){

    	const tz=(new Date().getTimezoneOffset())/60.0;

    	let t=h-tz;
    	if(t>=24){t-=24;}
    	if(t<0){t+=24;}

    	let hours=Math.floor(t);
    	t-=hours;
    	t*=60;
    	let min=Math.floor(t);
    	t-=min;
    	t*=60;
    	let sec=Math.floor(t);

    	if(hours<10){hours="0"+hours;}
    	if(min<10){min="0"+min;}
    	if(sec<10){sec="0"+sec;}

    	return hours+":"+min+":"+sec;

    }
    //Greenwhich mean sidreal time from Meeus page 87
    //Input is julian date, does not have to be 0h
    //Output is angle in degrees
    static GMST(jd){
	    const T=(jd-2451545.0)/36525.0;
	    let st=280.46061837+360.98564736629*(jd-2451545.0)+0.000387933*T*T - T*T*T/38710000.0;
	    st=st%360;
	    if(st<0){st+=360;}

	    return st;
	    //return st*Math.PI/180.0;
    }

    static jplBodyToInt(b){
    	switch(b){
    		case 10: return 0; // Sun
    		case 199: return 1; // Mercury
    		case 299: return 2; // Venus
    		case 399: return 3; // Earth
    		case 499: return 4; // Mars
    		case 599: return 5; // Jupiter
    		case 699: return 6; // Saturn
    		case 799: return 7; // Uranus
    		case 899: return 8; // Neptune
    		case 301: return 10; // Moon
    	}
    }

}

