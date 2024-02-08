import Turns from "./Turns"
import Board from "./Board"
import ButtonResetGame from "./ButtonResetGame"
import React, { useEffect, useState } from "react"
import GameContext from "@/assets/react/contexts/GameContext"
import { randomTurns } from "@/assets/ts/functions"
import useMemoBoard from "@/assets/react/hooks/useMemoBoard.ts"
import { builderColorTurnVarCSS, defaultPlayers, sizeBoardRowsVarCSS, sizeBoardColumnsVarCSS, tieColor } from "@/assets/ts/constants"
import type { WinnerType, WinningPositionsType } from "@/assets/types/types"
import type { IGame } from "@/assets/types/interfaces"

export default function Game({
    size = [3, 3],
    winningLineLength = 3,
    players = defaultPlayers,
    initialTurn = randomTurns(players),
    disabledReset = false,
    board
}: IGame) {
    /* states */
    const [winner, setWinner] = useState<WinnerType>(null)
    const [turnState, setTurn] = useState(initialTurn)
    const [winningPositions, setWinningPositions] = useState<WinningPositionsType>(null)
    const { board: boardState, boardEmpty, setBoard } = useMemoBoard(size, board)

    const resetGame = () => {
        setWinner(null)
        setTurn(randomTurns(players))
        setBoard(boardEmpty)
        setWinningPositions(null)
    }

    /* styles color pieces & grid board */
    const style = {
        [sizeBoardColumnsVarCSS]: String(size[0]),
        [sizeBoardRowsVarCSS]: String(size[1]),
        ...players.reduce<Record<string, string>>((acc, element, index) => {
            acc[builderColorTurnVarCSS(index)] = element.color
            return acc
        }, {}),
        [builderColorTurnVarCSS(-1)]: tieColor
    } as React.CSSProperties

    useEffect(() => {
        resetGame()
    }, [size, players, winningLineLength, disabledReset])

    return (
        <GameContext.Provider value={{
            setTurn,
            setWinningPositions,
            resetGame,
            setWinner,
            setBoard,
            players,
            winningPositions,
            winner,
            winningLineLength,
            turn: turnState,
            board: boardState,
        }}>
            <div className="flex flex-col size-full
            gap-y-2 items-center justify-center" style={style}>
                <div className="flex flex-col gap-4 select-none 
                items-center justify-center size-full md:flex-row" >
                    <Board />
                    <div className="flex flex-row-reverse items-center
                    gap-4 select-none size-fit 
                    md:flex-col md:justify-center">
                        <Turns />
                        <ButtonResetGame className="max-w-20" disabled={disabledReset} />
                    </div>
                </div>
            </div>
        </GameContext.Provider>
    )
}
