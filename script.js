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
	const Board = Gameboard; // Create an instance of the gameboard
	const turnCounter = createCounter();
	const turnCount = turnCounter.display();

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
		if (turnCounter.value() % 2 == 1) {
			console.log('turn: ' + turnCounter.value());
			playerMark = p1mark;
			// turnCount++;
			return playerMark;
		} else {
			console.log('turn: ' + turnCounter.value());
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

	const switchTurn = () => turnCounter.increment();

	const checkWin = () => Board.checkWin();

	const checkTie = () => Board.checkTie();

	function resetBoard() {
		Board.resetBoard();
		console.log(Board.getBoard());
	}

	return { start, getCurrentPlayer, playRound, resetBoard };
})();

// Handles DOM manipulation
const DisplayController = (function () {
	const Board = Gameboard; // Create an instance of the gameboard
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
			li.addEventListener('click', (event) => eventHandler(event));
			cellIndex++;
			gameBoard.appendChild(li);
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

	function eventHandler(event) {
		const currentPlayerMark = Controller.getCurrentPlayer();
		const target = event.target;
		console.log(target.getAttribute('id'));
		// cell.textContent = game.playerMark;
		console.log(currentPlayerMark);
		refreshBoard();
	}

	printBoard();
})();

function handleClick() {}

console.log("Instructions: Place marker with 'game.playRound(x,y)");

const game = GameController;
game.start();

const renderGame = DisplayController;
