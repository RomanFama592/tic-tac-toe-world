import type { BoardType, PlayersType, SizeDeclarationBoard, WinnerType, WinningPositionsType } from "@/assets/types/types"


export interface IGameContext {
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

export interface IGame {
    size?: SizeDeclarationBoard,
    winningLineLength?: number,
    players?: PlayersType,
    initialTurn?: number,
    disabledReset?: boolean,
    board?: BoardType
}