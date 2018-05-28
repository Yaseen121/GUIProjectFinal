import React, { Component } from 'react';

export class DayComponent extends Component {
    constructor() {
        super();
        var today = new Date();

        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tueday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var day = weekday[today.getDay()];
        this.state = {day: day };

    }

    render() {
        return (
            <p className="noSpace">{this.state.day}</p>
        );
    }

}
