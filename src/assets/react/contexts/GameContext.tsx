import { createContext } from "react";
import type { BoardType, PlayersType, WinnerType, WinningPositionsType } from "@/assets/types/types";
import { defaultPlayers } from "@/assets/ts/constants";

interface IGameContext {
    turn: number
    winningLineLength: number
    dropPieceMode: boolean
    winningPositions: WinningPositionsType
    players: PlayersType
    board: BoardType
    winner: WinnerType
    setTurn: (value: number) => void
    setDropPieceMode: (value: boolean) => void
    setBoard: (value: BoardType) => void
    setWinner: (value: WinnerType) => void
    setWinningPositions: (value: WinningPositionsType) => void
    resetGame: () => void
}

/**
* The code is creating a context object called `GameContext` using the `createContext` function from
* React. The context object is initialized with a default value that conforms to the `IGameContext`
* interface.
*/
const GameContext = createContext<IGameContext>({
    turn: 0,
    winningPositions: null,
    winningLineLength: 3,
    players: defaultPlayers,
    winner: null,
    board: [[]],
    dropPieceMode: false,
    setTurn: () => { },
    setDropPieceMode: () => { },
    setWinningPositions: () => { },
    setWinner: () => { },
    setBoard: () => { },
    resetGame: () => { }
})

export default GameContext