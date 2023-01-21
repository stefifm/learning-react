import { WINNER_COMBOS } from '../constants'

export const checkWinner = (boardToCheck) => {
  // Para ver si hay un ganador
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] && // Si es 0
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }

  // si no hay ganador
  return null
}

export const checkEndGame = (newBoard) => {
  // revisamos si hay un empate
  // si no hay más espacios vacíos en el tablero
  return newBoard.every((square) => square !== null)
}
