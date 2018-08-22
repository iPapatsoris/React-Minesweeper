export const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

export const clone2DArrayOfObjects = (array)  => (
    array.map((row) => (
        row.map((value) => (
            {...value}    
        ))
    ))
)

export const init2DArray = (rows, columns, value) => {
    const array = [];
    for (let i = 0; i < rows; i++) {
        array.push([]);
        for (let j = 0; j < columns; j++) {
            array[i].push(value);
        }
    }
    return array;
}