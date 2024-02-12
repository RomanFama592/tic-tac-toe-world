import { createContext } from "react";
import { defaultPlayers } from "@/assets/ts/constants";
import type { IGameContext } from "@/assets/types/interfaces";

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
    setWinningPositions: () => { },
    setWinner: () => { },
    setBoard: () => { },
    resetGame: () => { }
})

export default GameContext