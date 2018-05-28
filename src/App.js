import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route} from "react-router-dom";
import {Home} from "./components/Home";
import {Forecast} from "./components/Forecast";
import {Optimise} from "./components/Optimise";
import {Root} from "./components/Root";


class App extends Component {
  render() {
    return (
		<div>
    //Creates a router to go to different pages 
		<BrowserRouter>
			<Root>
				<Route exact path="/" component={Home} />
				<Route path={"/Forecast"} component={Forecast} />
				<Route path={"/Optimise"} component={Optimise} />
		  </Root>
		</BrowserRouter>
		</div>
    );
  }
}



export default App;
