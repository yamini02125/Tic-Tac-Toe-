const boardElement = document.getElementById('gameBoard');
const statusText = document.getElementById('status');
const xScoreEl = document.getElementById('xScore');
const oScoreEl = document.getElementById('oScore');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let xScore = 0, oScore = 0;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function createBoard() {
  boardElement.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handlePlayerMove);
    boardElement.appendChild(cell);
  }
}

function handlePlayerMove(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  updateBoard();
  if (checkWin()) return;

  currentPlayer = "O";
  statusText.textContent = "CPU's turn...";
  setTimeout(cpuMove, 600);
}

function cpuMove() {
  if (!gameActive) return;

  let emptyIndices = board.map((v, i) => v === "" ? i : null).filter(i => i !== null);
  let index = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  board[index] = "O";

  updateBoard();
  if (checkWin()) return;

  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
}

function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, i) => {
    cell.textContent = board[i];
  });
}

function checkWin() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      const cells = document.querySelectorAll('.cell');
      [a, b, c].forEach(i => cells[i].classList.add('winning'));
      gameActive = false;

      if (board[a] === "X") {
        statusText.textContent = "Player X wins!";
        xScore++;
        xScoreEl.textContent = xScore;
      } else {
        statusText.textContent = "CPU wins!";
        oScore++;
        oScoreEl.textContent = oScore;
      }
      return true;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return true;
  }

  return false;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  createBoard();
}


