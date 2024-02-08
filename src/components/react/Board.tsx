import Square from './Square'
import { useCallback, useContext } from 'react'
import GameContext from '@/assets/react/contexts/GameContext'
import { checkTie, checkWinner, createCopyBoard, nextIndex } from '@/assets/ts/functions'
import type { BoardType, SizeDeclarationBoard, UpdateBoardType } from '@/assets/types/types'
import { sizeBoardColumnsVarCSS, sizeBoardRowsVarCSS, tieValue } from '@/assets/ts/constants'
import WinnerMessage from './WinnerMessage'

export default function Board() {
    const {
        turn,
        players,
        winner,
        board,
        winningLineLength,
        winningPositions,
        setWinningPositions,
        setWinner,
        setBoard,
        setTurn
    } = useContext(GameContext)

    const gridTemplateRows = `repeat(var(${sizeBoardRowsVarCSS}), 2fr`
    const gridTemplateColumns = `repeat(var(${sizeBoardColumnsVarCSS}), 2fr`

    const checkBoard = (indexs: [number, number], board: BoardType) => {
        const pieceswinning = checkWinner(board, indexs, winningLineLength)

        if (pieceswinning !== null) {
            setWinningPositions(pieceswinning)
            setWinner(turn);
            setTurn(turn);
            return;
        }

        if (checkTie(board)) {
            setWinner(tieValue);
            setTurn(tieValue);
            return;
        }
    }

    const verifyIfPosIsWinningPiece = (pos: SizeDeclarationBoard) => {
        if (!winningPositions) return false;

        const winningPositionsFlat = winningPositions.flat();

        return winningPositionsFlat.some(winningPos =>
            winningPos[0] === pos[0] && winningPos[1] === pos[1]
        );
    };

    const updateBoard: UpdateBoardType = useCallback((indexs) => {
        const boardPos = board[indexs[0]]?.[indexs[1]]

        // evaluate if there is a piece in the square or if there is a winner
        if (boardPos || boardPos === undefined || winner) return;

        const newBoard = createCopyBoard(board)

        newBoard[indexs[0]]![indexs[1]] = turn

        setBoard(newBoard)

        setTurn(
            nextIndex(turn, players)
        )

        checkBoard(indexs, newBoard)
    }, [turn, winner, board, players])

    return (
        <div
            draggable={false}
            className={`grid gap-1 justify-center content-center
            size-full max-w-96 max-h-96 select-none`}
            style={{ gridTemplateColumns, gridTemplateRows }}>
            <WinnerMessage />
            {
                board.map((row, x) =>
                    row.map((square, y) =>
                        <Square
                            key={`${x} square ${y}`}
                            indexs={[x, y]}
                            disabled={winner !== null
                                || typeof square === 'number'}
                            color={winner !== null
                                ? verifyIfPosIsWinningPiece([x, y])
                                : true}
                            updateBoard={updateBoard}>
                            {square}
                        </Square>
                    )
                )
            }
        </div>
    )
}
