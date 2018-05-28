import React, { Component } from 'react';
import '../index.css';
// import {TimeComponent} from "./TimeComponent";
// import {DateComponent} from "./DateComponent";
// import {DayComponent} from "./DayComponent";

export class Home extends Component {
	constructor(){
		super();
		this.state = {
			city: "",
			temp: "",
			running: false
		}
		this.displayHourlyDuration = this.displayHourlyDuration.bind(this);
	}

	//Gets form data, start time and duration then it loops from start hour for the duration and calls fetch data2.
	displayHourlyDuration() {
		var running = !this.state.running;
		this.setState({
			running
		})
		if (running){
			var timeStart = document.getElementById("start_hour");
			var duration = document.getElementById("duration");
			var startTime = parseInt(timeStart.options[timeStart.selectedIndex].value);
			var dur = parseInt(duration.options[duration.selectedIndex].value);
			var timeString ="<table align='center' id='runTable'></table>";
			document.getElementById("running").innerHTML=timeString;
			var suffix;
			var time;
			for (var i = startTime; i <= startTime+dur; i++) {
					time = i;
					if (i<12){
						suffix = "AM";
					} else {
						suffix = "PM";
					}
					if (i===0){
						time = 12;
					}
					//pop, condition, iconURL, temp
					if (i==startTime+dur){
						this.fetchData2(time, suffix, "");
					} else {
						this.fetchData2(time, suffix, "bottomBorder");
					}
			}
		}
		// alert(timeStart.options[timeStart.selectedIndex].value);
		// alert(duration.options[duration.selectedIndex].value);
	}

	//Gets current hour data on refresh and creates hour options
	componentDidMount(){
		// this.getLocal();
		this.fetchData();
		this.createHourOptions();
}

//Fetches city and country from gps api and then fetches hourly weather data based on city and country
//Loops through the weatheer api hourly need array to till it matches the hour it is checking
//Then adds that data to the display table
fetchData2(time, suffix, borderStyle){
	fetch('http://ip-api.com/json')
	.then((response) => response.json())
	.then((result) =>{

		const country =(result.country);
		const city = (result.city);
		var url = "http://api.wunderground.com/api/70bc5682a6275c14/conditions/hourly/q/" +country+ "/"+city+".json";
		fetch(url)
		.then((response) => response.json())
		.then((result) =>{
			const hourlyNeed = result.hourly_forecast;
			var i =0;
			for (;;i++){
				if (time>=24){
					time = time -24;
				}
				if (time == hourlyNeed[i].FCTTIME.hour){
					break;
				}
			}
			const pop =( hourlyNeed[i].pop);
			const cond =( hourlyNeed[i].condition);
			const icn =("https://raw.githubusercontent.com/manifestinteractive/weather-underground-icons/master/dist/icons/white/png/64x64/" + hourlyNeed[i].icon + ".png");
			const tmp =(hourlyNeed[i].temp.metric);
			// alert(pop);
			// alert(cond);
			// alert(icn);
			// alert(tmp);
			this.setState({
				pop: pop,
				cond: cond,
				icn: icn,
				tmp: tmp
			}, function() {
				if (time>12){
					time = time-12;
					suffix = "PM";
				} else {
					suffix = "AM";
				}
				var timePrint = time;
				if (timePrint == 0){
					timePrint = 12;
				}
				document.getElementById("runTable").innerHTML+="<tr class=\""+borderStyle+"\"><td class=\"str\" align='right'>" + timePrint + "</td><td class=\"sfx\" align='left'>"+suffix+"</td><td class=\"centerThis\"><img src=\"http://simpleicon.com/wp-content/uploads/umbrella-rain-64x64.png\" height='60%'/><p class=\"noSpace\">"+this.state.pop+"%</p></td><td><p class=\"noSpace\">"+this.state.cond+"</p><img src=\""+this.state.icn+"\" height='70%'/></td><td class=\"str\">"+this.state.tmp+"°</td></tr>"
			})
		})
	})
}

	//old fetchdata2 that doesnt use gps api
	fetchData2BackUp(time, suffix, borderStyle){
		fetch('http://api.wunderground.com/api/70bc5682a6275c14/hourly/q/UK/London.json')
		.then((response) => response.json())
		.then((result) =>{
			const hourlyNeed = result.hourly_forecast;
			var i =0;
			for (;;i++){
				if (time>=24){
					time = time -24;
				}
				if (time == hourlyNeed[i].FCTTIME.hour){
					break;
				}
			}
			const pop =( hourlyNeed[i].pop);
			const cond =( hourlyNeed[i].condition);
			const icn =("https://raw.githubusercontent.com/manifestinteractive/weather-underground-icons/master/dist/icons/white/png/64x64/" + hourlyNeed[i].icon + ".png");
			const tmp =(hourlyNeed[i].temp.metric);
			// alert(pop);
			// alert(cond);
			// alert(icn);
			// alert(tmp);
			this.setState({
				pop: pop,
				cond: cond,
				icn: icn,
				tmp: tmp
			}, function() {
				if (time>12){
					time = time-12;
					suffix = "PM";
				} else {
					suffix = "AM";
				}
				var timePrint = time;
				if (timePrint == 0){
					timePrint = 12;
				}
				document.getElementById("runTable").innerHTML+="<tr class=\""+borderStyle+"\"><td class=\"str\" align='right'>" + timePrint + "</td><td class=\"sfx\" align='left'>"+suffix+"</td><td class=\"centerThis\"><img src=\"http://simpleicon.com/wp-content/uploads/umbrella-rain-64x64.png\" height='60%'/><p class=\"noSpace\">"+this.state.pop+"%</p></td><td><p class=\"noSpace\">"+this.state.cond+"</p><img src=\""+this.state.icn+"\" height='70%'/></td><td class=\"str\">"+this.state.tmp+"°</td></tr>"
			})
		})
	}

	//Gets current information for weather based on city and country that is given from gps api
	fetchData(){
		fetch('http://ip-api.com/json')
		.then((response) => response.json())
		.then((result) =>{

			const country =(result.country);
			const city = (result.city);
			var url = "http://api.wunderground.com/api/70bc5682a6275c14/conditions/q/" +country+ "/"+city+".json";
			fetch(url)
			.then((response) => response.json())
			.then((result) =>{
				const need = result.current_observation;
				const city = need.display_location.city;
				const desc = need.weather;
				const temp = need.temp_c + "°";
				const iconURL = "https://raw.githubusercontent.com/manifestinteractive/weather-underground-icons/master/dist/icons/white/png/128x128/" + need.icon + ".png";
				const wind = need.wind_mph;
				const rain = need.precip_today_metric;
				const feels = need.feelslike_c;
				const humidity = need.relative_humidity;
				this.setState({
					city,
					desc,
					temp,
					iconURL,
					wind,
					rain,
					feels,
					humidity
				})

			})
		})
	}

	//Old fetch data method without gps api
	fetchDataBackUp(){
		alert(this.state.country);
		alert(this.state.city);
		fetch('http://api.wunderground.com/api/70bc5682a6275c14/conditions/q/UK/London.json')
		.then((response) => response.json())
		.then((result) =>{
			const need = result.current_observation;
			const city = need.display_location.city;
			const desc = need.weather;
			const temp = need.temp_c + "°";
			const iconURL = "https://raw.githubusercontent.com/manifestinteractive/weather-underground-icons/master/dist/icons/white/png/128x128/" + need.icon + ".png";
			const wind = need.wind_mph;
			const rain = need.precip_today_metric;
			const feels = need.feelslike_c;
			const humidity = need.relative_humidity;
			this.setState({
				city,
				desc,
				temp,
				iconURL,
				wind,
				rain,
				feels,
				humidity
			})

		})
	}

	//Gets the currrent hour then it creates the select options from the next hour till 12 am
	createHourOptions(){
		var today = new Date();
		var hour = today.getHours();
		hour = hour +1;
		// alert(hour);
		var addOptions ="";
		for (var i=hour;; i++){
			if (i==24){
				i=0;
			}
			if (i<10){
				addOptions = addOptions+ "<option value="+i+">0"+i+":00</option>";
			} else {
				addOptions = addOptions+ "<option value="+i+">"+i+":00</option>";
			}
			if (i==0){
				break;
			}
		}
		document.getElementById("start_hour").innerHTML=addOptions;
	}

  render() {
    return (
      <div className="App">
			<br />
				<p id="noMargin" className="biggerFont">{this.state.city}</p>
				<div className="addBackground">
					<table align="center" >

						<tr >
							<td><h1 className="temp">{this.state.temp}</h1></td>
							<td><p className="noSpace"><img src={this.state.iconURL}  alt="Couldn't load"/></p></td>
							<td><p className="desc" align="center">{this.state.desc}</p></td>
						</tr>
					</table>
				</div>
				<table className="Date" align="center" width="80%" >
					<tr>
						<td className="vbot"><p >Precipitation </p><img src="https://image.flaticon.com/icons/svg/172/172928.svg" height="48px"/><br /><p className="lessBiggerFont">{this.state.rain}</p> mm</td>
						<td className="vbot"><p >Wind Speed </p><img src="https://image.flaticon.com/icons/svg/172/172922.svg" height="48px"/><br /><p className="lessBiggerFont">{this.state.wind}</p> mph</td>
						<td className="vbot"><p >Humidity </p><img src="https://image.flaticon.com/icons/svg/727/727790.svg" height="48px"/><br /><p className="lessBiggerFont">{this.state.humidity}</p> </td>
				  </tr>
				</table>
				<br /><hr width="90%"/>
				<h2>Enter Run Time</h2>
				<form >
					<table align="center" width="50%">
						<tr>
							<td className="notAsLessBigger">Start:</td> <td className="notAsLessBigger">Duration:</td>
						</tr>
						<tr>
							<td>
							<select id="start_hour" className="wrapper-dropdown-5"> //remember to change to 00
							</select>
							</td>
							<td>
								<select id="duration" className="wrapper-dropdown-5" >
								  <option value="1">1 hour</option>
								  <option value="2">2 hours</option>
								  <option value="3">3 hours</option>
								  <option value="4">4 hours</option>
									<option value="5">5 hours</option>
								</select>
							</td>
						</tr>
					</table>
					<br />
						<button className="button" type="button" onClick={this.displayHourlyDuration}>{(this.state.running) ? "Return":"Go"} </button>
				</form>
				<br />
				<hr className="noMargin" width="90%"/>
				<div id="running" className={(this.state.running) ? "":"dontDisplay" }>
					//Added with button stuff
				</div>
		  </div>
    );
  }


	// <td className="vbot"><img src="https://cdn1.iconfinder.com/data/icons/complete-medical-healthcare-icons-for-apps-and-web/128/thermometer-256.png" height="30%"/><br /><p className="lessBiggerFont">{this.state.feels}°</p></td>

}
// <tr valign="top">
//   <td ><TimeComponent /></td>
//   <td><DayComponent /><DateComponent /></td>
// </tr>
