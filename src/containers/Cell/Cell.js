import React, { Component } from 'react';
import styles from './Cell.css';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            clicked: false,
        }
        this.mine = false;
        this.number = props.number;
    }
    render(props) {
        let cell;
        if (this.state.clicked) {
            cell = this.number
        } else if (this.state.flag) {
            cell = 'F';
        } else {
            cell = '-';
        }
        return (
            <div className={styles.Cell}>
                {this.number}
            </div>
        );
    }
}

export default Cell;