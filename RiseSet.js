//By Greg Miller gmiller@gregmiller.net celestialprogramming.com
//Released as public domain
const toRad=Math.PI/180.0;
const toDeg=180.0/Math.PI;

//Corrects values to make them between 0 and 1
function constrain(v){
	if(v<0){return v+1;}
	if(v>1){return v-1;}
	return v;
}

//All angles must be in radians
//Outputs are times in hours GMT (not accounting for daylight saving time)
//From Meeus Page 101
function getRiseSet(jd,lat,lon,ra,dec){
	const h0=-0.8333 //For Sun
	//const h0=-0.5667 //For stars and planets
	//const h0=0.125   //For Moon

	const cosH=(Math.sin(h0*Math.PI/180.0)-Math.sin(lat)*Math.sin(dec)) / (Math.cos(lat)*Math.cos(dec));
	const H0=Math.acos(cosH)*180.0/Math.PI;

	const gmst=GMST(Math.floor(jd)+.5);

	const transit=(ra*toDeg+lon*toDeg-gmst)/360.0;
	const rise=transit-(H0/360.0);
	const set=transit+(H0/360.0);

	return [constrain(transit)*24.0,constrain(rise)*24.0,constrain(set)*24.0];
}

//Greenwhich mean sidreal time from Meeus page 87
//Input is julian date, does not have to be 0h
//Output is angle in degrees
function GMST(jd){
	const T=(jd-2451545.0)/36525.0;
	let st=280.46061837+360.98564736629*(jd-2451545.0)+0.000387933*T*T - T*T*T/38710000.0;
	st=st%360;
	if(st<0){st+=360;}

	return st;
	//return st*Math.PI/180.0;
}

