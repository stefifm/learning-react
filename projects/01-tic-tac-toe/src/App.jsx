import { useState } from 'react'

const TURNS = {
  X: 'x',
  O: 'o',
}

const Square = ({ children,isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected': ''}`
  const handleClick = () => {
    updateBoard(index)
  }
  return <div className={className} onClick={handleClick}>{children}</div>
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  //----------
  [0,3,6],
  [1,4,7],
  [2,5,8],
  //----------
  [0,4,8],
  [2,4,6]
]


function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  // null porque no hay ganador y false para el caso de empate
  const [winner, setWinner] = useState(null) 

  const checkWinner = (boardToCheck) =>  {
    // Para ver si hay un ganador
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if (
        boardToCheck[a] && // Si es 0
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
      
    }

    return null
  }

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

    // Revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
  } 
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {board.map((_, index) => (
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
            {board[index]}
          </Square>
        ))}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X} >{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O} >{TURNS.O}</Square>
      </section>
    </main>
  )
}

export default App
