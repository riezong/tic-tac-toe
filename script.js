const Gameboard = (function () {
	const board = ['', '', '', '', '', '', '', '', '']; // 1D array instead of 2D

	const getBoard = () => board;

	function setCell(index, playerMark) {
		if (index >= 9) {
			console.log('out of bounds');
		} else {
			let targetCell = board[index];
			if (targetCell === 0) {
				board[index] = playerMark;
			} else {
				console.log("can't do that");
			}
		}
		return 0;
	}

	function checkWin() {
		const winConditions = [
			[0, 1, 2], // Top row
			[3, 4, 5], // Middle row
			[6, 7, 8], // Bottom row
			[0, 3, 6], // Left column
			[1, 4, 7], // Middle column
			[2, 5, 8], // Right column
			[0, 4, 8], // Top-left to bottom-right diagonal
			[2, 4, 6], // Top-right to bottom-left diagonal
		];

		for (const condition of winConditions) {
			let length = condition.length;
			for (let l = 0; l < length; l++) {
				let index = condition[l];

				// Check if empty
				if (board[index] == false) {
					console.log(board[index]);
				} else {
					console.log('filled');
				}
			}
		}
	}

	function checkTie() {
		let length = board.length;
		let emptyCounter = 0;
		for (let i = 0; i < length; i++) {
			// Check if empty
			if (board[i] == false) {
				emptyCounter++;
				console.log(emptyCounter);
			} else {
			}
		}

		if (emptyCounter == 0) {
			console.log('board is full');
		}
	}
	checkTie();

	function resetBoard() {
		board = ['', '', '', '', '', '', '', '', ''];
	}

	return { getBoard, setCell, resetBoard };
})();

function player(name) {
	const marker = name.charAt(0);
	return { name, marker };
}

const GameController = (function () {
	let turnCount = 1;
	const player1 = player('Andrew');
	const p1mark = player1.marker;
	console.log(player1);
	const player2 = player('Computer');
	const p2mark = player2.marker;
	console.log(player2);
	let playerMark;

	const board = Gameboard(); // Create an instance of the gameboard

	const start = () => console.log(board.getBoard()); // Call getBoard() and log the result

	function playRound(row, column) {
		getCurrentPlayer();
		board.setCell(column, row, playerMark);
		checkWin();
		checkTie();
		switchTurn();
	}

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

	const switchTurn = () => turnCount++;

	function checkWin() {}
	function checkTie() {}

	return { start, playRound };
})();

const DisplayController = (function () {})(); // Handles DOM manipulation

const game = GameController();
game.start();
game.playRound(1, 1);
game.playRound(1, 2);
game.playRound(1, 0);
