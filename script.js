const Gameboard = (function () {
	const board = ['', '', '', '', '', '', '', '', '']; // 1D array instead of 2D

	const getBoard = () => board;

	function setCell(index, playerMark) {
		if (index >= board.length) {
			console.log('out of bounds');
		} else {
			let targetCell = board[index];
			if (targetCell === '') {
				board[index] = playerMark;
			} else {
				console.log("can't do that");
			}
		}
		return 0, playerMark;
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
			const [a, b, c] = condition;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return board[a]; // Return the winning marker
			}
		}
		return null; // No winner yet
	}

	function checkTie() {
		return board.every((cell) => cell !== '');
	}

	function resetBoard() {
		board.splice(0, 9, '', '', '', '', '', '', '', '', '');
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

	function playRound(index) {
		const currentPlayerMark = getCurrentPlayer();
		board.setCell(index, currentPlayerMark);
		const winner = checkWin();
		if (winner) {
			console.log('winner: ' + winner);
			return;
		}
		if (checkTie()) {
			console.log('tie');
			return;
		}
		switchTurn();
	}

	const switchTurn = () => turnCount++;

	const checkWin = () => board.checkWin();

	const checkTie = () => board.checkTie();

	return { start, playRound };
})();

const DisplayController = (function () {})(); // Handles DOM manipulation

const game = GameController;
game.start();
