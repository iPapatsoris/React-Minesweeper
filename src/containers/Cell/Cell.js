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

    clickedHandler = () => {
        if (this.props)
        this.setState({clicked: true});
    }

    render(props) {
        let cell;
        if (this.state.clicked && this.number) {
            cell = this.number
        } else if (this.state.flag) {
            cell = 'F';
        } else {
            cell = null;
        }

        const stylesArray = [];
        stylesArray.push(styles.Cell);
        if (this.state.clicked && !this.number) {
            stylesArray.push(styles.Clicked);
        }

        return (
            <div className={stylesArray.join(' ')} onClick={(!this.props.revealed ? this.clickedHandler : null)}>
                {(this.props.revealed ? this.number : cell)}
            </div>
        );
    }
}

export default Cell;