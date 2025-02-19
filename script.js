const Gameboard = (function () {
	// const rows = 3;
	// const columns = 3;
	const board = ['', '', '', '', '', '', '', '', ''];

	// // 2D array
	// for (let i = 0; i < rows; i++) {
	// 	board[i] = [];
	// 	for (let j = 0; j < columns; j++) {
	// 		board[i].push('');
	// 	}
	// 	board.push[i];
	// }

	const getBoard = () => board;

	function setCell(index, playerMark) {
		if (index >= 9) {
			console.log('out of bounds');
			return false; // Invalid move
		} else {
			let targetCell = board[index];
			if (targetCell === '') {
				board[index] = playerMark;
				return true; // Valid move
			} else {
				console.log("can't do that");
				return false; // Invalid move
			}
		}
	}

	// function setCell(column, row, playerMark) {
	// 	if (column >= columns || row >= rows) {
	// 		console.log('out of bounds');
	// 		return false; // Invalid move
	// 	} else {
	// 		if (board[row][column] === '') {
	// 			board[row][column] = playerMark;
	// 			return true; // Valid move
	// 		} else {
	// 			console.log("can't do that");
	// 			return false; // Invalid move
	// 		}
	// 	}
	// }

	// Had help here
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

	// Had help here
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
	const Board = Gameboard; // Create an instance of the gameboard
	let turnCount = 1;

	// Create player objects
	const player1 = player('Andrew');
	const p1mark = player1.marker;
	console.log(player1);
	const player2 = player('Computer');
	const p2mark = player2.marker;
	console.log(player2);
	let playerMark;

	const start = () => console.log(Board.getBoard()); // Call getBoard() and log the result

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
		// Wtf so this runs the function AND reads the return value at the same time?
		if (Board.setCell(index, currentPlayerMark)) {
			const winner = checkWin();
			if (winner) {
				console.log('winner: ' + winner);
				return;
			}
			if (checkTie()) {
				console.log('tie');
				return;
			}
			console.log(Board.getBoard());
			switchTurn();
		} else {
			console.log('invalid move, try again');
		}
	}

	const switchTurn = () => turnCount++;

	const checkWin = () => Board.checkWin();

	const checkTie = () => Board.checkTie();

	function resetBoard() {
		Board.resetBoard();
		console.log(Board.getBoard());
	}

	return { start, playRound, resetBoard };
})();

// Handles DOM manipulation
const DisplayController = (function () {
	const game = Gameboard;

	const gameBoard = document.querySelector('#gameBoard');

	function clearBoard() {
		while (gameBoard.firstChild) {
			gameBoard.removeChild(gameBoard.lastChild);
		}
	}
	function printBoard() {
		const getBoard = game.getBoard();
		// console.log(typeof getBoard);
		const ul = document.createElement('ul');
		let cellIndex = 0;
		for (const cell of getBoard) {
			const li = document.createElement('li');
			li.classList.add('cell');
			li.setAttribute('id', cellIndex);
			li.addEventListener('click', (event) => eventHandler(event));
			cellIndex++;
			gameBoard.appendChild(li);
		}
	}

	function refreshBoard() {
		clearBoard();
		printBoard();
	}

	function eventHandler(event) {
		const target = event.target;
		console.log(target.getAttribute('id'));
		// cell.textContent = game.playerMark;
		// console.log(playerMark);
		refreshBoard();
	}

	printBoard();
})();

function handleClick() {}

console.log("Instructions: Place marker with 'game.playRound(x,y)");

const game = GameController;
game.start();

const renderGame = DisplayController;
