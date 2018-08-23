import React, { Component } from 'react';
import Cell from '../../components/Cell/Cell';
import Result from '../../components/Result/Result';
import styles from './Grid.css';
import { getRandomInt, clone2DArrayOfObjects, init2DArray } from '../../shared/Utillity';

const rows = 8;
const columns = 8;
const mines = 10;

class Grid extends Component {
    constructor(props) {
        super(props);

        this.rows = rows;
        this.columns = columns;
        this.mines = mines; //getRandomInt((rows-1) * (columns-1));
        this.numbersGrid = this.fillNumbersGrid();

        this.state = {
            grid: init2DArray(this.rows, this.columns, {
                flagged: false,
                clicked: false
            }),
            cellsLeft: (this.rows * this.columns) - mines,
            loss: false
        }
    }

    /* Initialise grid with numbers and add mines */
    fillNumbersGrid = () => {
        const grid = init2DArray(this.rows, this.columns, 0);
        for (let mine = 0; mine < this.mines; mine++) {
            let mineRow, mineColumn;
            do {
                mineRow = getRandomInt(this.rows);
                mineColumn = getRandomInt(this.columns);
            } while (grid[mineRow][mineColumn] === -1);
            this.addMine(grid, mineRow, mineColumn)
        }
        return grid;
    }

    /* Add a mine, updating adjacent cell numbers */
    addMine = (grid, mineRow, mineColumn) => {
        for (let i = mineRow - 1; i < this.rows && i <= mineRow + 1; i++) {
            if (i < 0) {
                continue;
            }
            for (let j = mineColumn - 1; j < this.columns && j <= mineColumn + 1; j++) {
                if (j < 0) {
                    continue;
                }
                if (i === mineRow && j === mineColumn) {
                    grid[i][j] = -1;
                } else if (grid[i][j] !== -1) {
                    grid[i][j]++;
                }
            }
        }
    }

    cellFlaggedHandler = (row, column) => {
        if (this.state.grid[row][column].clicked) {
            return;
        }
        const updatedGrid = clone2DArrayOfObjects(this.state.grid);
        updatedGrid[row][column].flagged = !updatedGrid[row][column].flagged;
        this.setState({
            grid: updatedGrid
        });
    }

    cellClickedHandler = (row, column) => {
        if (this.state.grid[row][column].clicked) {
            return;
        }
        if (this.numbersGrid[row][column] === -1) {
            this.setState({ loss: true });
            this.revealGrid();
            return;
        }
        const updatedGrid = clone2DArrayOfObjects(this.state.grid);
        updatedGrid[row][column].clicked = true;
        updatedGrid[row][column].flagged = false;
        if (!this.numbersGrid[row][column]) {
            this.propagateEmptyCellClick(updatedGrid, row, column);
        }
        this.setState((prevState) => {
            return {
                grid: updatedGrid,
                cellsLeft: prevState.cellsLeft - 1
            };
        });
    }

    /* Expand consecutive adjacent cells on an empty cell click, revealing numbers */
    propagateEmptyCellClick = (grid, clickedRow, clickedColumn) => {
        const toExpand = [{
            row: clickedRow,
            column: clickedColumn
        }];

        while (toExpand.length) {
            const row = toExpand[toExpand.length - 1].row;
            const column = toExpand[toExpand.length - 1].column;
            toExpand.pop();

            for (let i = row - 1; i < this.rows && i <= row + 1; i++) {
                if (i < 0) {
                    continue;
                }
                for (let j = column - 1; j < this.columns && j <= column + 1; j++) {
                    if (j < 0 || (i === row && j === column) || grid[i][j].clicked) {
                        continue;
                    }
                    grid[i][j].clicked = true;
                    grid[i][j].flagged = false;
                    this.setState((prevState) => {
                        return {
                            cellsLeft: prevState.cellsLeft - 1
                        };
                    });
                    if (!this.numbersGrid[i][j]) {
                        toExpand.push({ row: i, column: j });
                    }
                }
            }
        }
    }

    revealGrid = () => {
        const updatedGrid = clone2DArrayOfObjects(this.state.grid);
        updatedGrid.forEach((row, rowIndex, grid) => {
            row.forEach((cell, columnIndex) => {
                cell.clicked = true;
            });
        });
        this.setState({ grid: updatedGrid });
    }

    resetGridHandler = () => {
        this.numbersGrid = this.fillNumbersGrid();
        const updatedGrid = init2DArray(this.rows, this.columns, {
            flagged: false,
            clicked: false
        });
        this.setState({
            grid: updatedGrid,
            cellsLeft: (this.rows * this.columns) - mines,
            loss: false
        })
    }

    render() {
        const grid = this.numbersGrid.map((row, rowIndex) => {
            return <div key={rowIndex}>
                {row.map((cell, columnIndex) => {
                    return <Cell
                        key={rowIndex * this.columns + columnIndex}
                        number={cell}
                        {...this.state.grid[rowIndex][columnIndex]}
                        cellClickedHandler={() => this.cellClickedHandler(rowIndex, columnIndex)}
                        cellFlaggedHandler={() => this.cellFlaggedHandler(rowIndex, columnIndex)} />;
                })}
            </div>;
        });

        let result = null;
        if (this.state.loss) {
            result = <Result loss resetGridHandler={this.resetGridHandler} />;
        }
        else if (!this.state.cellsLeft) {
            result = <Result win resetGridHandler={this.resetGridHandler} />;
        }

        return (
            <React.Fragment>
                <div className={styles.Grid}>
                    {grid}
                </div>
                {result}
            </React.Fragment>
        );
    }
}
export default Grid;