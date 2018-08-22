import React from 'react';
import styles from './Cell.css';

const Cell = (props) => {
    let cell;
    if (props.clicked && props.number) {
        cell = props.number
    } else if (props.flag) {
        cell = 'F';
    } else {
        cell = null;
    }

    const stylesArray = [];
    stylesArray.push(styles.Cell);
    if (props.clicked && !props.number) {
        stylesArray.push(styles.Clicked);
    }

    if (props.revealed) {
        if (!props.number) {
            stylesArray.push(styles.Clicked);
            cell = null;
        }
        else {
            cell = props.number;
        }
    }

    return (
        <div className={stylesArray.join(' ')} onClick={(!props.revealed ? props.cellClickedHandler : null)}>
            {cell}
        </div>
    );
}

export default Cell;