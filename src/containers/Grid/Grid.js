import React, {Component} from 'react';

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

        for (let i = 0 ; i < this.rows ; i++) {
            this.numbersGrid.push([]);
            for (let j = 0 ; j < this.columns ; j++) {
                this.numbersGrid[i].push(0);
            }
        }

        for (let mine = 0 ; mine < this.mines ; mine++) {
            const mineRow = getRandomInt(this.rows); 
            const mineColumn = getRandomInt(this.columns);
            this.updateNumbersGrid(mineRow, mineColumn)
        }
    }

    updateNumbersGrid = (mineRow, mineColumn) => {
        for (let i = mineRow - 1 ; i < this.rows && i <= mineRow + 1 ; i++) {
            if (i < 0) {
                continue;
            }
            for (let j = mineColumn - 1 ; j < this.columns && j <= mineColumn + 1 ; j++) {
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
        console.log(this);
        return (
            <p></p>
        );
    }
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

export default Grid;