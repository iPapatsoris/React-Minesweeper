import React from 'react';
import styles from './Result.css';

const result = (props) => {
    const result = <h1 className={styles.Result}>
        {(props.win ? "You win!" : "You lose!")}
    </h1>;
    return result;
}

export default result;