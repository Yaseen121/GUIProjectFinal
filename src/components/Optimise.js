import React, { Component } from 'react';
import {Stopwatch} from "./Stopwatch";
import '../index.css';

export class Optimise extends Component {
	constructor(){
		super();
		this.state = {
			running: false
		}
		this.getHours = this.getHours.bind(this);
	}

	//Function called on button click to sort out whether to display the data or not.
	//Gets the data from the format
	//Validates any wrong inputs
	getHours(){
		var running = !this.state.running;
		this.setState({
			running
		})
		if (running){
			var min = parseInt(document.getElementById("min").value);
			var max = parseInt(document.getElementById("max").value);
			if (Number.isInteger(min) && Number.isInteger(max)){
				if (max>=min){
					this.getForecast(min, max);
				} else {
					alert("Error: max greater than min");
					return;
				}
			} else {
				alert("Error: No values entered");
			}

		} else {
			document.getElementById("optimiseTable").innerHTML="";
		}

	}

	//Takes a time, a time suffix, a borderstyle variable and a min and Max
	//If during this time the temp is between the min and max, it adds the table to a new row in the table
	fetchData(time, suffix, borderStyle, min, max){
		var printThis = false;
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
				if (time == hourlyNeed[i].FCTTIME.hour){
					break;
				}
			}
			const pop =(hourlyNeed[i].pop);
			const cond =( hourlyNeed[i].condition);
			const icn =("https://raw.githubusercontent.com/manifestinteractive/weather-underground-icons/master/dist/icons/white/png/64x64/" + hourlyNeed[i].icon + ".png");
			const tmp =(hourlyNeed[i].temp.metric);
			if (tmp>=min && tmp<=max){
				printThis = true;
			}
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
				if (printThis){
				document.getElementById("optimiseTable").innerHTML+="<tr class=\""+borderStyle+"\"><td class=\"str\" align='right'>" + timePrint + "</td><td class=\"sfx\" align='left'>"+suffix+"</td><td class=\"centerThis\"><img src=\"http://simpleicon.com/wp-content/uploads/umbrella-rain-64x64.png\" height='60%'/><p class=\"noSpace\">"+this.state.pop+"%</p></td><td><p class=\"noSpace\">"+this.state.cond+"</p><img src=\""+this.state.icn+"\" height='70%'/></td><td class=\"str\">"+this.state.tmp+"°</td></tr>";

			}
			})
		})
	})
	}

	//Loops from the next hour of the day for 12 hours and on each iteration it retrieves weather data from api and sets bottom border if it is not the last hour.
	getForecast(min, max){
		var now = this.getTime() + 1;
		var suffix ="";
		var time = now;
		for (var i=now; i<=now+12; i++){
			time = i;
			if (i>=24){
				time =i-24;
			}
			if (time<12){
				suffix = "AM";
			} else {
				suffix = "PM";
			}
			if (time===(this.getTime()+13)){
				this.fetchData(time, suffix, "", min, max);
			} else {
				this.fetchData(time, suffix, "bottomBorder", min, max);
			}
		}
	}

	//Gets current hour
	getTime() {
		var d = new Date();
		var hour = d.getHours();
		return hour;
	}

	//Imports stop watch component
	//Created a table and form to get a min and max temperature
	//Find button gets data and then turns into return button that hides the data
  render() {
    return (
      <div className="Optimise">
			<br />
				<Stopwatch />
				<br /> <hr className="noMargin" width="90%"/><br />
				<form id="noMargin" action={this.tempSelect} >
					<table align="center" width="70%">
						<caption><h2>Enter Your Temperatures</h2></caption>
							<tr width="auto">
								<td>Min </td>
								<td>Max </td>
							</tr>
							<tr>
								<td><input type="number" id="min" className="matchCSS"/></td>
								<td><input type="number" id="max" className="matchCSS"/></td>
							</tr>
							<tr>

								<td colspan="2"> <br /><button className="button" type="button" onClick={this.getHours}>{(this.state.running) ? "Return":"Find"} </button></td>
							</tr>
					</table>
					</form>
					<br /> <hr className="noMargin" width="90%"/>
					<div id="running" className={(this.state.running) ? "":"dontDisplay" }>
						<table id="optimiseTable" align="center">
						</table>
					</div>
		  </div>
    );
  }
}
