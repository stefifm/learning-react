import { useState } from 'react'
import confetti from 'canvas-confetti';

import { Square } from './components/Square'

import { TURNS } from './constants';

import { checkEndGame, checkWinner } from './logic/board'
import { WinnerModal } from './components/WinnerModal';
import { resetStorage, saveGameToStorage } from './logic/storage';


function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage 
      ? JSON.parse(boardFromLocalStorage)
      : Array(9).fill(null)  
  })
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage 
      ?? TURNS.X
  })

  // null porque no hay ganador y false para el caso de empate
  const [winner, setWinner] = useState(null) 

  const updateBoard = (index) => {
    // Para que no se actualice la posición
    // es decir, no se sobreescriba el cuadro
    if (board[index] || winner) return

    // Para llenar el Array con X u O
    // Debe ser un array nuevo para no modificar el estado
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Para cambiar los turnos 
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Guardar la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    // Revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      // Aquí se revisa si hay un empate
      // Y con setWinner en false establecemos el empate
      setWinner(false)
    }
  }
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetStorage()
  }
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Resetear el juego</button>
      <section className='game'>
        {board.map((square, index) => (
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
            {square}
          </Square>
        ))}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X} >{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O} >{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App
