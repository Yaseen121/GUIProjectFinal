import React, { Component } from 'react';
import '../index.css';
import {TimeComponent} from "./TimeComponent";
import {DateComponent} from "./DateComponent";
import {DayComponent} from "./DayComponent";

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
			var arrHour = new Array();
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

	getDate() {
		var d = new Date();
		var hour = d.getHours();
		var min = d.getMinutes()
		return hour+ ":" + min;
	}

	componentDidMount(){
		this.fetchData();
		this.createHourOptions();
	}

	fetchData2(time, suffix, borderStyle){
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

	fetchData(){
		fetch('http://api.wunderground.com/api/70bc5682a6275c14/conditions/q/UK/London.json')
		.then((response) => response.json())
		.then((result) =>{
			const need = result.current_observation;
			const city = need.display_location.city;
			const desc = need.weather;
			const temp = need.temp_c + "°";
			const iconURL = "https://raw.githubusercontent.com/manifestinteractive/weather-underground-icons/master/dist/icons/white/png/128x128/" + need.icon + ".png";
			this.setState({
				city,
				desc,
				temp,
				iconURL
			})

		})
	}

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
			<br /><br />
				<div>
					<table align="center">
					<caption className="biggerFont">{this.state.city}</caption>
						<tr>
							<td><h1 className="temp">{this.state.temp}</h1></td>
							<td><p className="noSpace"><img src={this.state.iconURL}  alt="Couldn't load"/></p></td>
							<td><p className="desc" align="center">{this.state.desc}</p></td>
						</tr>
					</table>
				</div>
				<table className="Date" align="center" width="50%">
				  <tr valign="top">
				    <td ><TimeComponent /></td>
				    <td><DayComponent /><DateComponent /></td>
				  </tr>
				</table>
				<br /><hr width="90%"/>
				<h2>Enter Run Time</h2>
				<form >
					<table align="center" width="50%">
						<tr>
							<td>Start:</td> <td>Duration:</td>
						</tr>
						<tr>
							<td>
							<select id="start_hour"> //remember to change to 00

								// <option value="0">00:00</option>
								// <option value="1">01:00</option>
								// <option value="2">02:00</option>
								// <option value="3">03:00</option>
								// <option value="4">04:00</option>
								// <option value="5">05:00</option>
								// <option value="6">06:00</option>
								// <option value="7">07:00</option>
								// <option value="8">08:00</option>
								// <option value="9">09:00</option>
								// <option value="10">10:00</option>
								// <option value="11">11:00</option>
								// <option value="12">12:00</option>
								// <option value="13">13:00</option>
								// <option value="14">14:00</option>
								// <option value="15">15:00</option>
								// <option value="16">16:00</option>
								// <option value="17">17:00</option>
								// <option value="18">18:00</option>
								// <option value="19">19:00</option>
								// <option value="20">20:00</option>
								// <option value="21">21:00</option>
								// <option value="22">22:00</option>
								// <option value="23">23:00</option>
							</select>
							</td>
							<td>
								<select id="duration">
								  <option value="1">1</option>
								  <option value="2">2</option>
								  <option value="3">3</option>
								  <option value="4">4</option>
									<option value="5">5</option>
								</select>
							</td>
						</tr>
					</table>
					<br />
						<button type="button" onClick={this.displayHourlyDuration}>{(this.state.running) ? "Return":"Go"} </button>
				</form>
				<br />
				<hr className="noMargin" width="90%"/>
				<div id="running" className={(this.state.running) ? "":"dontDisplay" }>
					//Added with button stuff
				</div>
		  </div>
    );
  }

}
