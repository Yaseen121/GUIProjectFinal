import React, { Component } from 'react';

export class TimeComponent extends Component {
    constructor() {
        super();
        var today = new Date();
        var min = today.getMinutes();
        if (min < 10){
          min = "0" + min;
        }
        var  time = today.getHours() + ":" + min;
        this.state = {time: time };

    }

    render() {
        return (
            <div>
                <h1 className="noSpace">{this.state.time}</h1>
            </div>
        );
    }
}
