import type { BoardType, PlayersType, GeneratedOptions, GridOfBoardType, SizeDeclarationBoard, BucketTypeN, PosMovN } from "@/assets/types/types.ts"
import { movementSchemaN, schemaSumsN } from "./constants";

//TODO: do tests

export const constructEmptyBoard = (rows: number, columns: number,): BoardType => {
    return Array(columns).fill(Array(rows).fill(null))
}

export const randomTurns = (players: PlayersType): number => {
    return Math.floor(Math.random() * players.length)
}

const generateAllTrueOptions = () => {
    const options = {} as GeneratedOptions;

    options.valueSize =
        ["3", "4", "5", "6", "7"].map((value) => {
            return [value, true]
        })

    options.valuePlayers =
        ["2", "3", "4"].map((value) => {
            return [value, true]
        })

    options.valueWinningLineLength =
        ["3", "4", "5"].map((value) => {
            return [value, true]
        })

    options.valueFallingPieceMode =
        ["true", "false"].map((value) => {
            return [value, true]
        })

    return options
}

//TODO: replace to use a Json or javascript object to make it easier to extend configurations
// @ts-ignore
export const generateOptions = (
    playersIndex: number,
    sizeIndex: number,
    fallingPieceModeIndex: number,
    winningLineLengthIndex: number
) => {
    const options = generateAllTrueOptions()

    const valuePlayers = Number(options.valuePlayers[playersIndex]![0])
    const valueSize = Number(options.valueSize[sizeIndex]![0])
    // @ts-ignore
    const valueWinningLineLength = Number(options.valueWinningLineLength[winningLineLengthIndex]![0])
    // @ts-ignore
    const valueFallingPieceMode = Boolean(options.valueFallingPieceMode[fallingPieceModeIndex]![0])

    options.valueSize = [
        ["3", valuePlayers <= 3],
        ["4", valuePlayers <= 3],
        ["5", valuePlayers <= 3],
        ["6", valuePlayers <= 4],
        ["7", valuePlayers <= 4],
    ];

    options.valuePlayers = [
        ["2", valueSize >= 3],
        ["3", valueSize >= 5],
        ["4", valueSize >= 6],
    ];

    options.valueWinningLineLength = [
        ["3", valueSize >= 3],
        ["4", valueSize >= 4],
        ["5", valueSize >= 5],
    ];

    options.valueFallingPieceMode = [
        ["true", true],
        ["false", true],
    ];

    return options;
};

export const nextIndex = (currentIndex: number, array: unknown[]) => {
    return currentIndex < array.length - 1
        ? currentIndex + 1
        : 0
}

export const createCopyBoard = (board: BoardType) => {
    return board.map((v) => ([...v]))
}

export const checkTie = (board: BoardType): boolean => {
    return board.flat().every(square => square !== null);
};

export const piecesFalling = (
    board: BoardType,
    piecePositionAbs: SizeDeclarationBoard
): { board: BoardType, indexs: SizeDeclarationBoard } => {
    const pieceMain = board[piecePositionAbs[0]]![piecePositionAbs[1]]

    let iters = 1

    while (
        board[(piecePositionAbs[0] + iters)] !== undefined
        && board[(piecePositionAbs[0] + iters)]![piecePositionAbs[1]] === null
    ) {
        iters = iters + 1;
    }

    board[piecePositionAbs[0]]![piecePositionAbs[1]] = null
    board[(piecePositionAbs[0] + iters - 1)]![piecePositionAbs[1]] = pieceMain ?? null

    return { board, indexs: [(piecePositionAbs[0] + iters - 1), piecePositionAbs[1]] }
}

function get3x3GridOfABoard(
    board: BoardType,
    [initialRow, initialCol]: SizeDeclarationBoard
): GridOfBoardType | null {

    const grid3x3: GridOfBoardType = [];


    if (
        !board[0]?.length
        || initialRow < 0
        || initialCol < 0
        || initialRow >= board.length
        || initialCol >= board[0]?.length) {
        return null;
    }

    for (let i = initialRow - 1; i <= initialRow + 1; i++) {
        const row: (number | null | undefined)[] = [];

        for (let j = initialCol - 1; j <= initialCol + 1; j++) {
            row.push(
                board[i]?.[j]
            );
        }

        grid3x3.push(row);
    }

    return grid3x3;
}

function evalIfBucketFull(winningLineLength: number, bucket: BucketTypeN): SizeDeclarationBoard[][] | null {
    type keysBucket = keyof BucketTypeN

    const winningPlays = []

    for (const orientation in bucket) {
        const orientationArray = bucket[orientation as keysBucket]

        if (orientationArray.length >= winningLineLength) {
            winningPlays.push(orientationArray)
        }
    }

    return winningPlays.length > 0 ? winningPlays : null
}

function searchInSchemaMovement<T extends keyof PosMovN>(positionToSearch: SizeDeclarationBoard): T | null {
    for (const orientation in movementSchemaN) {
        const [row, col] = movementSchemaN[orientation as T];

        if (row === positionToSearch[0]
            && col === positionToSearch[1]) return orientation as T
    }

    return null;
}

export const checkWinner = (
    board: BoardType,
    piecePositionAbs: SizeDeclarationBoard,
    winningLineLength: number
): SizeDeclarationBoard[][] | null => {

    const bucket: BucketTypeN = {
        top: [],
        bottom: [],
        left: [],
        right: [],
        leftTop: [],
        rightTop: [],
        leftBottom: [],
        rightBottom: [],
    }

    const mainPiece: number = board[piecePositionAbs[0]]![piecePositionAbs[1]]!

    if (mainPiece === null || mainPiece === undefined) return null

    const grid = get3x3GridOfABoard(board, piecePositionAbs)

    if (!grid) return null;

    grid.forEach((row, indexLocalRow) => {
        row.forEach((borderingPiece, indexLocalCol) => {
            //if the position piece in the loop is equal to the main piece

            if (indexLocalCol === 1 && indexLocalRow === 1) return;

            if (borderingPiece !== mainPiece) return;

            const orientation: keyof PosMovN | null = searchInSchemaMovement([indexLocalRow, indexLocalCol]);

            if (orientation === null) return;

            let currentPiece: number | null | undefined = borderingPiece

            let currentPiecePositionAbs: SizeDeclarationBoard = [
                piecePositionAbs[0] + schemaSumsN[orientation][0],
                piecePositionAbs[1] + schemaSumsN[orientation][1]
            ]

            bucket[orientation].push(piecePositionAbs)

            while (currentPiece === mainPiece) {
                bucket[orientation].push(currentPiecePositionAbs)

                currentPiecePositionAbs = [
                    currentPiecePositionAbs[0] + schemaSumsN[orientation][0],
                    currentPiecePositionAbs[1] + schemaSumsN[orientation][1]
                ]

                currentPiece = board[currentPiecePositionAbs[0]]?.[currentPiecePositionAbs[1]]
            }
        })
    })

    return evalIfBucketFull(winningLineLength, bucket)
}