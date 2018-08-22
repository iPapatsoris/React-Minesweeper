import React from 'react';
import styles from './Result.css';

const result = (props) => {
    const result = <h1> {(props.win ? "You win!" : "You lose!")}</h1>;
    return (
        <div className={styles.Result}>
            {result}
            <button className={styles.PlayAgain} onClick={props.resetGridHandler}>Play again </button>
        </div>
    );
}

export default result;