import { useState } from "react";
import Square from "./Square";

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draw, setDraw] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    const winner = calculateWinner(nextSquares);
    if (winner === "X") {
      setXWins(xWins + 1);
      setModalMessage("Player X wins!");
      setModalOpen(true);
    } else if (winner === "O") {
      setOWins(oWins + 1);
      setModalMessage("Player O wins!");
      setModalOpen(true);
    } else if (nextSquares.every(square => square !== null)) {
      setDraw(draw + 1);
      setModalMessage("It's a draw!");
      setModalOpen(true);
    }
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(square => square !== null)) {
    status = 'It\'s a draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function handleResetScore() {
    setXWins(0);
    setOWins(0);
    setDraw(0);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      <div className="mainWrapper">
        <div className="gameScreenWrapper">

          <div className="status">{status}</div>
          <div className="gameTable">
            <div className="board-row">
              <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
              <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
              <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
              <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
              <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
              <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
              <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
              <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
              <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
          </div>
          <button className="btnStyle" onClick={handleReset}>Restart the game</button>
        </div>

        <div className="scoreCounter">
          <div className="resultsWrapper">
            <div className="result">Player X Wins: {xWins}</div>
            <div className="result">Player O Wins: {oWins}</div>
            <div className="result">Draw: {draw}</div>
          </div>
          <button className="btnStyle" onClick={handleResetScore}>Reset the score</button>
        </div>
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modalContent">
            <p className="modalContentMessage">{modalMessage}</p>
            <button className="modalBtnStyle" onClick={closeModal}>OK</button>
          </div>
        </div>
      )}
    </>
  )
}
