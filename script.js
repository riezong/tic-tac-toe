function Gameboard() {
	const rows = 3;
	const columns = 3;
	const board = [];

	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < columns; j++) {
			board[i].push(0);
		}
	}

	const getBoard = () => board;

	function setCell(column, row, playerMark) {
		if (column >= columns || row >= rows) {
			console.log('out of bounds');
		} else {
			let targetCell = board[row][column];
			if (targetCell === 0) {
				board[row][column] = playerMark;
				console.log(board);
			} else {
				console.log("can't do that");
			}
		}
		return 0;
	}

	function resetBoard() {
		for (let i = 0; i < rows; i++) {
			board[i] = [];
			for (let j = 0; j < columns; j++) {
				board[i].push(0);
			}
		}
	}

	return { getBoard, setCell, resetBoard };
}

function checkWin() {
	const win1 = [
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
	];
	const win2 = [
		[0, 0, 1],
		[0, 1, 0],
		[1, 0, 0],
	];
	const win3 = [
		[1, 0, 0],
		[1, 0, 0],
		[1, 0, 0],
	];
	const win4 = [
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 0],
	];
	const win5 = [
		[0, 0, 1],
		[0, 0, 1],
		[0, 0, 1],
	];
	const win6 = [
		[1, 1, 1],
		[0, 0, 0],
		[0, 0, 0],
	];
	const win7 = [
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 0],
	];
	const win8 = [
		[0, 0, 0],
		[0, 0, 0],
		[1, 1, 1],
	];
	console.log(win2);
}

function checkTie() {}

function player(name) {
	const mark = name.charAt(0);
	return { name, mark };
}

const GameController = function () {
	let turnCount = 1;
	const player1 = player('Andrew');
	const p1mark = player1.mark;
	console.log(player1);
	const player2 = player('Computer');
	const p2mark = player2.mark;
	console.log(player2);
	let playerMark;

	const board = Gameboard(); // Create an instance of the gameboard
	const start = () => console.log(board.getBoard()); // Call getBoard() and log the result
	function playRound(row, column) {
		getCurrentPlayer();
		board.setCell(column, row, playerMark);
	}

	// function checkWin() {} ;
	// function checkTie() {} ;

	function getCurrentPlayer() {
		if (turnCount % 2 == 1) {
			console.log('turn: ' + turnCount);
			playerMark = p1mark;
			turnCount++;
			return playerMark;
		} else {
			console.log('turn: ' + turnCount);
			playerMark = p2mark;
			turnCount++;
			return playerMark;
		}
	}

	const switchTurn = () => (playerMark = 'd');

	return { start, playRound, getCurrentPlayer };
};

const game = GameController();
game.start();
game.playRound(1, 1);
game.playRound(1, 2);
