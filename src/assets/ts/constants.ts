import type { PlayersType, PosMovN } from "../types/types";


/* links */
export const email = "famaroman@gmail.com"
export const goals = "https://famaroman.notion.site/Tic-Tac-Toe-World-Goals-e38d5dbfee724d88a7dff6290a3d15b7"
export const linkedIn = "http://www.linkedin.com/in/romanfama"

export const usernameGithub = "RomanFama592"
export const nameRepoGithub = "tic-tac-toe-world"

export const github = "https://github.com/" + usernameGithub
export const repoGithub = github + "/" + nameRepoGithub

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

export const movementSchemaN: PosMovN = {
  top: [0, 1],
  bottom: [2, 1],
  left: [1, 0],
  right: [1, 2],
  leftTop:[0, 0],
  leftBottom:[2, 0],
  rightTop:[0, 2],
  rightBottom:[2, 2]
}

export const schemaSumsN: PosMovN = {
  top: [-1, 0],
  bottom: [1, 0],
  left: [0, -1],
  right: [0, 1],
  leftTop:[-1, -1],
  leftBottom:[1, -1],
  rightTop:[-1, 1],
  rightBottom:[1, 1]
}
