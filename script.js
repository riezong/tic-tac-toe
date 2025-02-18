const Gameboard = (function () {
	const rows = 3;
	const columns = 3;
	const board = [];

	// 2D array
	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < columns; j++) {
			board[i].push('');
		}
		board.push[i];
	}

	const getBoard = () => board;

	function setCell(column, row, playerMark) {
		if (column >= columns || row >= rows) {
			console.log('out of bounds');
			return false; // Invalid move
		} else {
			if (board[row][column] === '') {
				board[row][column] = playerMark;
				return true; // Valid move
			} else {
				console.log("can't do that");
				return false; // Invalid move
			}
		}
	}

	// Had help here
	function checkWin() {
		const winConditions = [
			// Rows
			[
				[0, 0],
				[1, 0],
				[2, 0],
			],
			[
				[0, 1],
				[1, 1],
				[2, 1],
			],
			[
				[0, 2],
				[1, 2],
				[2, 2],
			],
			// Columns
			[
				[0, 0],
				[0, 1],
				[0, 2],
			],
			[
				[1, 0],
				[1, 1],
				[1, 2],
			],
			[
				[2, 0],
				[2, 1],
				[2, 2],
			],
			// Diagonals
			[
				[0, 0],
				[1, 1],
				[2, 2],
			],
			[
				[0, 2],
				[1, 1],
				[2, 0],
			],
		];

		for (const condition of winConditions) {
			const [a, b, c] = condition;
			const [colA, rowA] = a;
			const [colB, rowB] = b;
			const [colC, rowC] = c;
			if (
				board[colA][rowA] &&
				board[colA][rowA] === board[colB][rowB] &&
				board[colA][rowA] === board[colC][rowC]
			) {
				return board[colA][rowA]; // Return the winning marker
			}
		}
		return null; // No winner yet
	}

	// Had help here
	function checkTie() {
		for (const row of board) {
			return row.every((cell) => cell !== '');
		}
		// return board.every((cell) => cell !== '');
	}

	function resetBoard() {
		for (let i = 0; i < rows; i++) {
			board[i] = [];
			for (let j = 0; j < columns; j++) {
				board[i].push('');
			}
			board.push[i];
		}
	}

	return { getBoard, setCell, checkWin, checkTie, resetBoard };
})();

function player(name) {
	const marker = name.charAt(0);
	return { name, marker };
}

const GameController = (function () {
	let turnCount = 1;

	// Create player objects
	const player1 = player('Andrew');
	const p1mark = player1.marker;
	console.log(player1);
	const player2 = player('Computer');
	const p2mark = player2.marker;
	console.log(player2);
	let playerMark;

	const board = Gameboard; // Create an instance of the gameboard

	const start = () => console.log(board.getBoard()); // Call getBoard() and log the result

	function getCurrentPlayer() {
		if (turnCount % 2 == 1) {
			console.log('turn: ' + turnCount);
			playerMark = p1mark;
			// turnCount++;
			return playerMark;
		} else {
			console.log('turn: ' + turnCount);
			playerMark = p2mark;
			// turnCount++;
			return playerMark;
		}
	}

	function playRound(row, column) {
		const currentPlayerMark = getCurrentPlayer();
		// Wtf so this runs the function AND reads the return value at the same time?
		if (board.setCell(row, column, currentPlayerMark)) {
			const winner = checkWin();
			if (winner) {
				console.log('winner: ' + winner);
				return;
			}
			if (checkTie()) {
				console.log('tie');
				return;
			}
			console.log(board.getBoard());
			switchTurn();
		} else {
			console.log('invalid move, try again');
		}
	}

	const switchTurn = () => turnCount++;

	const checkWin = () => board.checkWin();

	const checkTie = () => board.checkTie();

	function resetBoard() {
		board.resetBoard();
		console.log(board.getBoard());
	}

	return { start, playRound, resetBoard };
})();

const DisplayController = (function () {})(); // Handles DOM manipulation

console.log("Instructions: Place marker with 'game.playRound(x,y)");

const game = GameController;
game.start();
