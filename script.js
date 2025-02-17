function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
        }
        board.push[i];
    }

    function Cell() {
        return 0;
    }

    console.log(board);
    return;
}

Gameboard();