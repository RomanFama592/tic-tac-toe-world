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

export type PosMovN = {
    top: SizeDeclarationBoard,
    bottom: SizeDeclarationBoard,
    left: SizeDeclarationBoard,
    right: SizeDeclarationBoard,
    leftTop: SizeDeclarationBoard,
    rightTop: SizeDeclarationBoard,
    leftBottom: SizeDeclarationBoard,
    rightBottom: SizeDeclarationBoard,
}

export type BucketTypeN = {
    top: SizeDeclarationBoard[],
    bottom: SizeDeclarationBoard[],
    left: SizeDeclarationBoard[],
    right: SizeDeclarationBoard[],
    leftTop: SizeDeclarationBoard[],
    rightTop: SizeDeclarationBoard[],
    leftBottom: SizeDeclarationBoard[],
    rightBottom: SizeDeclarationBoard[],
}

export type GenerateOptionsParams = {
    valuePlayers: number;
    valueSize: number,
    valueWinningLineLength: number
};

export type GeneratedOptions = {
    [props in keyof GenerateOptionsParams]: OptionsToggle;
};