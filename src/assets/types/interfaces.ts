import type { BoardType, PlayersType, SizeDeclarationBoard } from "@/assets/types/types"


export interface IGame {
    size?: SizeDeclarationBoard,
    winningLineLength?: number,
    players?: PlayersType,
    initialTurn?: number,
    disabledReset?: boolean,
    board?: BoardType
}