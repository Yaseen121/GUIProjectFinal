import React, { Component } from 'react';
import '../index.css';

export class Forecast extends Component {
	constructor(){
		super();
		this.state = {
			city: "",
			temp: "",
			running: false
		}
		this.getForecast = this.getForecast.bind(this);
	}

	componentDidMount(){
		//Loads on refresh and gets forecast data
		this.getForecast();
	}

	getTime() {
		//Gets hour of the day
		var d = new Date();
		var hour = d.getHours();
		return hour;
	}

	fetchData(time, suffix, borderStyle){
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
		getForecast(){
			//Gets the time plus 1 hour to start getting the forecast starting from the next hour
			var now = this.getTime() + 1;
			var suffix ="";
			var time = now;
			for (var i=now; i<=now+12; i++){
				time = i;
				//Sorts time into 12 hours and adds a suffix
				if (i>=24){
					time =i-24;
				}
				if (time<12){
					suffix = "AM";
				} else {
					suffix = "PM";
				}
				//Adds a bottom order unless its the last hour that it is getting (its gets 12 hours )
				if (time===(this.getTime()+13)){
					this.fetchData(time, suffix, "");
				} else {
					this.fetchData(time, suffix, "bottomBorder");
				}
			}
		}

	//Creates table to hold the data
  render() {
    return (
      <div className="Forecast">
					<table align='center' id='runTable'>
					</table>
			</div>
    );
  }
}
