import React, { Component } from 'react';
import {Header} from "./Header";

export class Root extends Component {
  render() {
    console.log(this.props.children)
      //Displays header and displays current page
    return (
      <div>    
        <Header/>
        <div id="pushDown">
          {this.props.children}
        </div>
      </div>

    );

  }

}
