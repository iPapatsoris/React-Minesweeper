import React, { Component } from 'react';
import Cell from '../Cell/Cell';
import styles from './Grid.css';

const rows = 8;
const columns = 8;
const mines = 5;

class Grid extends Component {
    constructor(props) {
        super(props);

        this.rows = rows;
        this.columns = columns;
        this.mines = mines;//getRandomInt((rows-1) * (columns-1));
        this.numbersGrid = [];

        for (let i = 0; i < this.rows; i++) {
            this.numbersGrid.push([]);
            for (let j = 0; j < this.columns; j++) {
                this.numbersGrid[i].push(0);
            }
        }

        for (let mine = 0; mine < this.mines; mine++) {
            const mineRow = getRandomInt(this.rows);
            const mineColumn = getRandomInt(this.columns);
            this.updateNumbersGrid(mineRow, mineColumn)
        }
    }

    updateNumbersGrid = (mineRow, mineColumn) => {
        for (let i = mineRow - 1; i < this.rows && i <= mineRow + 1; i++) {
            if (i < 0) {
                continue;
            }
            for (let j = mineColumn - 1; j < this.columns && j <= mineColumn + 1; j++) {
                if (j < 0) {
                    continue;
                }
                if (i === mineRow && j === mineColumn) {
                    this.numbersGrid[i][j] = -1;
                } else if (this.numbersGrid[i][j] !== -1) {
                    this.numbersGrid[i][j]++;
                }
            }
        }
    }

    render() {
        const grid = this.numbersGrid.map((row, rowIndex) => {
            return row.map((number, columnIndex) => {
                return <Cell key={rowIndex * this.columns + columnIndex} number={number} />;
            });
        });
        grid.forEach((rowElements, index, array) => {
            array[index] = <div key={index}> {rowElements} </div>;
        })

        // debug start
        const revealedGrid = this.numbersGrid.map((row, rowIndex) => {
            return row.map((number, columnIndex) => {
                return <Cell key={rowIndex * this.columns + columnIndex} number={number} revealed />;
            });
        });
        revealedGrid.forEach((rowElements, index, array) => {
            array[index] = <div key={index}> {rowElements} </div>;
        })
        // debug end

        return (
            <React.Fragment>
                <div className={styles.Grid}>
                    {grid}
                </div>
                <div className={styles.Grid}>
                    {revealedGrid}
                </div>
            </React.Fragment>
        );
    }
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

export default Grid;