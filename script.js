const Gameboard = (function () {
	const board = ['', '', '', '', '', '', '', '', ''];

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

const createCounter = function () {
	let count = 1; // Variable in the outer function's scope

	function increment() {
		newCount = count + 1;
		count = newCount;
		// display();
	}

	function display() {
		console.log(count);
	}

	function value() {
		return count;
	}

	return { increment, display, value }; // Return an object with the functions
};

const GameController = (function () {
	const board = Gameboard; // Create an instance of the gameboard
	const turnCounter = createCounter();
	let gameStart = false;
	let gameOver = false;

	// Create player objects
	const player1 = player('Andrew');
	const p1mark = player1.marker;
	console.log(player1);
	const player2 = player('Computer');
	const p2mark = player2.marker;
	console.log(player2);
	let playerMark;

	const start = () => console.log(board.getBoard()); // Call getBoard() and log the result

	function getCurrentPlayer() {
		if (turnCounter.value() % 2 == 1) {
			console.log('turn: ' + turnCounter.value());
			playerMark = p1mark;
			return playerMark;
		} else {
			console.log('turn: ' + turnCounter.value());
			playerMark = p2mark;
			return playerMark;
		}
	}

	const switchPlayer = () => turnCounter.increment();

	function playRound(index) {
		if (gameOver == false) {
			const currentPlayerMark = getCurrentPlayer();
			// Wtf so this runs the function AND reads the return value at the same time?
			if (board.setCell(index, currentPlayerMark)) {
				const winner = checkWin();
				if (winner) {
					console.log('winner: ' + winner);
					gameOver = true;
					return;
				}
				if (checkTie()) {
					console.log('tie');
					gameOver = true;
					return;
				}
				console.log(board.getBoard());
				switchPlayer();
			} else {
				console.log('invalid move, try again');
			}
		} else {
			console.log('game over');
		}
	}

	const checkWin = () => board.checkWin();

	const checkTie = () => board.checkTie();

	function resetBoard() {
		board.resetBoard();
		console.log(board.getBoard());
		gameOver = false;
	}

	return {
		start,
		getCurrentPlayer,
		switchPlayer,
		playRound,
		resetBoard,
		gameOver,
	};
})();

// Handles DOM manipulation
const DisplayController = function () {
	const Board = Gameboard;
	const Controller = GameController;

	const gameBoard = document.querySelector('#gameBoard');

	function printBoard() {
		const getBoard = Board.getBoard();

		const ul = document.createElement('ul');
		let cellIndex = 0;
		for (const cell of getBoard) {
			const li = document.createElement('li');
			li.classList.add('cell');
			li.setAttribute('id', cellIndex);
			li.textContent = cell; // Displays playerMark in cell
			li.addEventListener('click', (event) => eventHandler(event));
			gameBoard.appendChild(li);
			cellIndex++;
		}
	}

	function clearBoard() {
		while (gameBoard.firstChild) {
			gameBoard.removeChild(gameBoard.lastChild);
		}
	}

	function refreshBoard() {
		clearBoard();
		printBoard();
	}

	// Each time a square is clicked, call playRound()
	function eventHandler(event) {
		const target = event.target;
		const cell = Number(target.getAttribute('id'));

		Controller.playRound(cell);

		refreshBoard();
	}

	printBoard();

	return { refreshBoard };
};

const Game = (() => {
	const game = GameController;
	let displayControllerInstance = null;

	const StartGame = document.getElementById('StartGame');
	StartGame.addEventListener('click', () => {
		// Prevent starting multiple games simultaneously
		if (game.gameStart != true) {
			displayControllerInstance = DisplayController();
			game.start();
			game.gameStart = true;
		} else {
			return;
		}
	});

	const Reset = document.getElementById('Reset');
	Reset.addEventListener('click', () => {
		game.resetBoard();
		console.log(displayControllerInstance);
		// const displayController = DisplayController; // Problem is it's calling DisplayController() every time
		displayControllerInstance.refreshBoard();
	});

	console.log("Instructions: Start game with 'Game.start()");
	console.log("Instructions: Place marker with 'game.playRound(index)");

	const start = () => {
		DisplayController();
		game.start();
	};

	const play = (index) => {
		game.playRound(index);
		// const displayController = DisplayController; // Problem is it's calling DisplayController() every time
		displayControllerInstance.refreshBoard();
	};

	return { start, play };
})();
