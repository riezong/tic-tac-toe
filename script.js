function Gameboard() {
    
    // Create array to represent the board
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        }
        board.push[i];
    }

    function getBoard() {
        return console.log(board);
    }

    function setCell(column, row, playerMark) {
        // let targetCell = board[row][column];
        // console.log(targetCell);
        // if (targetCell === 0) {
        //     console.log("empty");
        //     board[row][column] = 1;
        //     console.log(board);
        //     endTurn();
        // } else {
        //     console.log("can't do that");
        // }
        return 0;
    }

    function resetBoard() {

    }

    getBoard();
}

Gameboard();

function player(name) {
    const mark = name.charAt(0);
    return { name, mark };
}

console.log(player("Andrew"));
console.log(player("Computer"));