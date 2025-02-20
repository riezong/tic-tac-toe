const Gameboard = (function () {
	const board = ['', '', '', '', '', '', '', '', ''];

	const getBoard = () => board;

	function setCell(cellIndex, playerMark) {
		if (cellIndex >= 9) {
			console.log('out of bounds');
			return false; // Invalid move
		} else {
			let targetCell = board[cellIndex];
			if (targetCell === '') {
				board[cellIndex] = playerMark;
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

const Players = (function () {
	// Create player objects
	let player1Name;
	let player2Name;
	let p1mark;
	let p2mark;

	// Set player 1
	const setPlayer1InputButton = document.getElementById('setPlayer1');
	setPlayer1InputButton.addEventListener('click', () => setPlayer1());
	const setPlayer1 = function () {
		player1Name = document.getElementById('player1').value;
		let newPlayer1 = player(player1Name);
		p1mark = newPlayer1.marker;
		console.log('Player 1:', newPlayer1);
		// return p1mark;

		const player1 = document.querySelector('.player1');
		if (player1.lastChild) {
			player1.removeChild(player1.lastChild);
		}
		const player1P = document.createElement('p');
		player1P.textContent = 'Player 1: ' + player1Name;
		player1.appendChild(player1P);
	};

	// Set player 2
	const setPlayer2InputButton = document.getElementById('setPlayer2');
	setPlayer2InputButton.addEventListener('click', () => setPlayer2());
	const setPlayer2 = function () {
		player2Name = document.getElementById('player2').value;
		let newPlayer2 = player(player2Name);
		p2mark = newPlayer2.marker;
		console.log('Player 2:', newPlayer2);
		// return p2mark;

		const player2 = document.querySelector('.player2');
		if (player2.lastChild) {
			player2.removeChild(player2.lastChild);
		}
		const player2P = document.createElement('p');
		player2P.textContent = 'Player 2: ' + player2Name;
		player2.appendChild(player2P);
	};

	const getPlayerMarks = () => ({ p1mark, p2mark });

	return { getPlayerMarks, setPlayer1, setPlayer2 };
})();

const createCounter = function () {
	let count = 0; // Variable in the outer function's scope

	function increment() {
		newCount = count + 1;
		count = newCount;
		// display();
	}

	function reset() {
		count = 0;
	}

	function display() {
		console.log(count);
	}

	function value() {
		return count;
	}

	return { increment, reset, display, value }; // Return an object with the functions
};

const GameController = (function () {
	const gameboard = Gameboard; // Create an instance of the gameboard
	const turnCounter = createCounter();
	let gameStart = false;
	let gameOver = false;

	const start = () => {
		console.log(gameboard.getBoard()); // Call getBoard() and log the result
		getMarks();
	};

	const getMarks = function () {
		// Get player marks
		const players = Players;
		let playerMark;
		const marks = players.getPlayerMarks();
		console.log(marks);
		p1mark = marks.p1mark;
		p2mark = marks.p2mark;
	};

	function getCurrentPlayer() {
		if (turnCounter.value() % 2 == 0) {
			console.log('turn: ' + turnCounter.value());
			playerMark = p1mark;
			return playerMark;
		} else {
			console.log('turn: ' + turnCounter.value());
			playerMark = p2mark;
			return playerMark;
		}
	}

	const switchTurn = () => turnCounter.increment();

	function playRound(cellIndex) {
		if (gameOver == false) {
			// getMarks();
			if (!p1mark || !p2mark) {
				// Check if marks are set
				console.log('Player marks not set yet!');
				return null; // Or handle this case appropriately
			}

			const currentPlayerMark = getCurrentPlayer();
			// Wtf so this runs the function AND reads the return value at the same time?
			if (gameboard.setCell(cellIndex, currentPlayerMark)) {
				switchTurn();
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
				console.log(gameboard.getBoard());
			} else {
				console.log('invalid move, try again');
			}
		} else {
			// console.log('game over');
		}
	}

	const checkWin = () => gameboard.checkWin();

	const checkTie = () => gameboard.checkTie();

	function gameOverValue() {
		return gameOver;
	}

	function resetBoard() {
		gameboard.resetBoard();
		turnCounter.reset();
		getMarks();
		console.log(gameboard.getBoard());
		gameOver = false;
	}

	return {
		start,
		getMarks,
		turnCounter,
		getCurrentPlayer,
		switchTurn,
		playRound,
		resetBoard,
		gameOverValue,
	};
})();

// Handles DOM manipulation
const DisplayController = function () {
	const gameboard = Gameboard;
	const controller = GameController;

	const turnCounter = document.querySelector('.turnCounter');
	const turnCounterP = document.createElement('p');
	turnCounterP.textContent = 'Turn: ' + controller.turnCounter.value();
	turnCounter.appendChild(turnCounterP);

	const gameOverMsg = document.createElement('p');

	const gameBoard = document.querySelector('#gameBoard');
	function printBoard() {
		const getBoard = gameboard.getBoard();

		if (controller.gameOverValue() != true) {
			console.log(controller.gameOverValue());
			// turnCounter.removeChild(turnCounter.lastChild);
			turnCounterP.textContent = 'Turn: ' + controller.turnCounter.value();
			turnCounter.appendChild(turnCounterP);
		} else {
			console.log('game over');
			// turnCounter.removeChild(turnCounter.lastChild);
			gameOverMsg.textContent = 'GG';
			turnCounter.appendChild(gameOverMsg);
		}

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

		while (turnCounter.firstChild) {
			turnCounter.removeChild(turnCounter.lastChild);
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

		if (!p1mark) {
			const player1 = document.querySelector('.player1');
			if (player1.lastChild) {
				player1.removeChild(player1.lastChild);
			}
			const player1P = document.createElement('p');
			player1P.textContent = 'Player 1: NOT SET';
			player1.appendChild(player1P);
		}

		if (!p2mark) {
			const player2 = document.querySelector('.player2');
			if (player2.lastChild) {
				player2.removeChild(player2.lastChild);
			}
			const player2P = document.createElement('p');
			player2P.textContent = 'Player 2: NOT SET';
			player2.appendChild(player2P);
		}

		controller.playRound(cell);

		refreshBoard();
	}

	printBoard();

	return { refreshBoard };
};

const GameUI = (() => {
	const game = GameController;
	let displayControllerInstance = null;

	const StartGame = document.getElementById('StartGame');
	StartGame.addEventListener('click', () => {
		game.getMarks();
		// Prevent starting multiple games simultaneously
		if (game.gameStart != true) {
			const gameBoard = document.querySelector('#gameBoard');
			gameBoard.setAttribute('class', 'showGameBoard');
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
		displayControllerInstance.refreshBoard();
	});

	console.log("Instructions: Start game with 'Game.start()");
	console.log("Instructions: Place marker with 'game.playRound(index)");

	const start = () => {
		DisplayController();
		game.start();
	};

	const play = (cellIndex) => {
		game.playRound(cellIndex);
		displayControllerInstance.refreshBoard();
	};

	return { start, play };
})();
