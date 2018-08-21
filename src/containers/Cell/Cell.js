import React, {Component} from 'react';

class Cell extends Component {
    state = {
        mine: false,
        flag: false,
        clicked: false,
        number: 0
    };


    render() {
        let cell;
        if (this.state.clicked) {
            cell = this.state.number
        } else if (this.state.flag) {
            cell = 'F';
        }
        return (
            {cell}
        ); 
    }
}

export default Cell;