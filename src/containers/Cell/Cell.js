import React from 'react';
import styles from './Cell.css';

const Cell = (props) => {
    let cell;
    if (props.clicked && props.number) {
        cell = props.number
    } else if (props.flagged) {
        cell = <img className={styles.Flag} src="/img/sigodu.png" alt="Flag" />;
    } else {
        cell = null;
    }

    const stylesArray = [];
    stylesArray.push(styles.Cell);
    if (props.clicked || props.revealed) {
        switch (props.number) {
            case 0: stylesArray.push(styles.Clicked); break;
            case 1: stylesArray.push(styles.NumberOne); break;
            case 2: stylesArray.push(styles.NumberTwo); break;
            case 3: stylesArray.push(styles.NumberThree); break;
            default: stylesArray.push(styles.NumberFour); break;
        }
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
        <div 
            className={stylesArray.join(' ')} 
            onClick={(!props.revealed ? props.cellClickedHandler : null)}
            onContextMenu={(e) => (contextMenuHandler(e, props))}>
            {cell}
        </div>
    );
}

const contextMenuHandler = (e, props) => {
    e.preventDefault();
    return (!props.revealed ? props.cellFlaggedHandler() : null);
}

export default Cell;