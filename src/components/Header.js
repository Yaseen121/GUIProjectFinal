//import React from "react";
import React, { Component } from 'react';

//export const Header = (props) => {
export class Header extends Component {
  //Functions that cchange the page
  toggleHome() {
    window.location.href="./";
    //array of all buttons
    var kids = document.getElementById('myDIV').children;
    for(var i=0; i<kids.length; i++){
      kids[i].className="MenuButton";
    }
    kids[0].className="active";
  }
  toggleForecast() {
    window.location.href="./Forecast";
    //array of all buttons
    var kids = document.getElementById('myDIV').children;
    for(var i=0; i<kids.length; i++){
      kids[i].className="MenuButton";
    }
    kids[1].className="active";
  }
  toggleOptimise() {
    window.location.href="./Optimise";
    //array of all buttons
    var kids = document.getElementById('myDIV').children;
    for(var i=0; i<kids.length; i++){
      kids[i].className="MenuButton";
    }
    kids[2].className="active";
  }

    //Creates buttons that link to locations has an if statement to change the class depending on active page
    render() {
      return (
        <div id="myDIV">
          <button className={(window.location.pathname === "/") ? "active":"MenuButton" } onClick={this.toggleHome}>Home</button>
          <button className={(window.location.pathname === "/Forecast") ? "active":"MenuButton" } onClick={this.toggleForecast}>Forecast</button>
          <button className={(window.location.pathname === "/Optimise") ? "active":"MenuButton" } onClick={this.toggleOptimise}>Optimise</button>

        </div>
      );
  }
}
//};

// {
//   if (windows.location.href=="/"){
//     document.getElementsByTagName("button")[0].setAttribute("className", "active");
//   } else if (windows.location.href=="/Forecast") {
//     document.getElementsByTagName("button")[1].setAttribute("className", "active");
//   } else if (windows.location.href=="/Optimise") {
//     document.getElementsByTagName("button")[2].setAttribute("className", "active");
//   }
// }


// <button className="active" onClick={this.toggleHome}>Home</button>
// <button className="button" onClick={this.toggleForecast}>Forecast</button>
// <button className="button" onClick={this.toggleOptimise}>Optimise</button>


//
// <button className={(window.location.href === "http://localhost:3000/") ? "active":"button" } onClick={this.toggleHome}>Home</button>
// <button className={(window.location.href === "http://localhost:3000/Forecast") ? "active":"button" } onClick={this.toggleForecast}>Forecast</button>
// <button className={(window.location.href === "http://localhost:3000/Optimise") ? "active":"button" } onClick={this.toggleOptimise}>Optimise</button>
