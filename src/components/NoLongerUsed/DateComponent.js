import React, { Component } from 'react';

export class DateComponent extends Component {
    constructor() {
        super();
        var today = new Date();
        var dat = today.getDate();
        if (dat < 10){
          dat = "0" + dat;
        }
        var mon = today.getMonth()+1;
        if (mon < 10){
          mon = "0" + mon;
        }
        var  date = dat + "/" + mon;
        this.state = {date: date };

    }

    render() {
        return (
            <p className="noSpace">{this.state.date}</p>
        );
    }

}
