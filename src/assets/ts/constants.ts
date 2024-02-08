import type { PlayersType, PosMov } from "../types/types";


/* links */
export const email =  "famaroman@gmail.com"
export const goals = "https://famaroman.notion.site/Tic-Tac-Toe-World-Goals-e38d5dbfee724d88a7dff6290a3d15b7?pvs=4"
export const linkedIn =  "http://www.linkedin.com/in/romanfama"

export const usernameGithub = "RomanFama592"
export const nameRepoGithub = "tic-tac-toe-world"

export const github =  "https://github.com/" + usernameGithub
export const repoGithub =  github + "/" + nameRepoGithub

export const tieValue = -1
export const tieColor = "#0f0f0f"
export const sizeBoardRowsVarCSS = "--size-board-x"
export const sizeBoardColumnsVarCSS = "--size-board-y"

export const builderColorTurnVarCSS = (indexPlayer: number) => ("--color-turn-" + indexPlayer)

export const defaultPlayers: PlayersType = [
  { symbol: '❌', color: "#c25d4d" },
  { symbol: '⚪', color: "#4e4ea7" },
  { symbol: '🟩', color: "#c6f5d2" },
  { symbol: '🔶', color: "#ffb861" }
]

export const movementSchema: PosMov = {
  vertical: [[0, 1], [2, 1]],
  horizontal: [[1, 0], [1, 2]],
  diagonalLtRb: [[0, 0], [2, 2]],
  diagonalRtLb: [[0, 2], [2, 0]]
}

export const schemaSums: PosMov = {
  vertical: [[-1, 0], [1, 0]],
  horizontal: [[0, -1], [0, 1]],
  diagonalLtRb: [[-1, -1], [1, 1]],
  diagonalRtLb: [[-1, 1], [1, -1]]
}
