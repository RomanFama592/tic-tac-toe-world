export type PlayersType = { symbol: string, color: string }[]

export type WinnerType = number | null

export type PieceType = number | null

export type WinningPositionsType = SizeDeclarationBoard[][] | null

/**
 * also use for position of a piece
 * 
 * values: [ rows, cols ]
*/
export type SizeDeclarationBoard = [number, number]

export type BoardType = (number | null)[][]

export type GridOfBoardType = (number | null | undefined)[][]

export type UpdateBoardType = (index: SizeDeclarationBoard) => void

export type OptionsToggle = [string, boolean][];

/**
 * orientation: [[topPos], [bottomPos]]
 * 
 * format: [
 * 
 * [topPos, topPos, topPos],
 * 
 * [topPos, ---X---, bottomPos],
 * 
 * [bottomPos, bottomPos, bottomPos],
 * 
 * ]
*/
export type PosMov = {
    vertical: [SizeDeclarationBoard, SizeDeclarationBoard],
    horizontal: [SizeDeclarationBoard, SizeDeclarationBoard],
    diagonalLtRb: [SizeDeclarationBoard, SizeDeclarationBoard],
    diagonalRtLb: [SizeDeclarationBoard, SizeDeclarationBoard]
}

export type BucketType = {
    vertical: SizeDeclarationBoard[],
    horizontal: SizeDeclarationBoard[],
    diagonalLtRb: SizeDeclarationBoard[],
    diagonalRtLb: SizeDeclarationBoard[]
}

export type GenerateOptionsParams = {
    valuePlayers: number;
    valueSize: number,
    valueWinningLineLength: number
};

export type GeneratedOptions = {
    [props in keyof GenerateOptionsParams]: OptionsToggle;
};