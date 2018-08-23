import React from 'react';
import styles from './Cell.css';

const cell = (props) => {
    let cell;
    if (props.clicked && props.number) {
        if (props.number !== -1) {
            cell = props.number;
        } else {
            cell = <img className={styles.Flag} src="img/bomb.png" alt="Bomb" />;
        }
    } else if (props.flagged) {
        cell = <img className={styles.Flag} src="img/sigodu.png" alt="Flag" />;
    } else {
        cell = null;
    }

    const stylesArray = [];
    stylesArray.push(styles.Cell);
    if (props.clicked) {
        switch (props.number) {
            case 0: stylesArray.push(styles.Clicked); break;
            case 1: stylesArray.push(styles.NumberOne); break;
            case 2: stylesArray.push(styles.NumberTwo); break;
            case 3: stylesArray.push(styles.NumberThree); break;
            default: stylesArray.push(styles.NumberFour); break;
        }
    }

    return (
        <div 
            className={stylesArray.join(' ')} 
            onClick={props.cellClickedHandler}
            onContextMenu={(e) => (contextMenuHandler(e, props))}>
            {cell}
        </div>
    );
}

const contextMenuHandler = (e, props) => {
    e.preventDefault();
    return props.cellFlaggedHandler();
}

export default cell;