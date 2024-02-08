import { memo, useEffect, useState } from "react"
import { builderColorTurnVarCSS, defaultPlayers } from "@/assets/ts/constants"
import type { BoardType, PieceType } from "@/assets/types/types"
import { nextIndex, randomTurns } from "@/assets/ts/functions"
import React from "react"

const SquareWithOutLogics = memo(({ children }: { children: PieceType }) => {
    
    /* min-h-9 min-w-9 */
    const classNameSquare = `
    flex aspect-square 
    justify-center items-center
    text-[calc(100%)]
    border-2 border-black rounded
    transition-colors duration-200
    bg-base-100`

    const pieceSymbol = typeof children === "number" && defaultPlayers[children]?.symbol

    const styles = {} as React.CSSProperties

    if (typeof children === "number") {
        styles.backgroundColor = `var(${builderColorTurnVarCSS(children)})`
    }

    return (
        <span
            className={classNameSquare}
            style={{ ...styles }}>
            {pieceSymbol}
        </span>
    )
})

export default function AnimBoard({ boards }: { boards: BoardType[] }) {
    const [currentBoard, setCurrentBoard] = useState<number>(0)
    const [playerIndex, setPlayerIndex] = useState<number>(randomTurns(defaultPlayers))

    useEffect(() => {
        if (boards.length <= 1) return;

        const interval = setInterval(() => {
            setPlayerIndex((currentState) => (nextIndex(currentState, defaultPlayers)))
            setCurrentBoard((currentState) => (nextIndex(currentState, boards)))
        }, 1000)
        return () => { clearInterval(interval) }
    }, [])

    if (
        !boards[currentBoard] ||
        boards[currentBoard]?.length === 0 ||
        !boards[currentBoard]?.[0] ||
        boards[currentBoard]?.[0]?.length === 0
    ) {
        return null;
    }

    const style = {
        gridTemplateRows: `repeat(${boards[currentBoard]!.length}, 2fr)`,
        gridTemplateColumns: `repeat(${boards[currentBoard]![0]!.length}, 2fr)`,
        ...defaultPlayers.reduce<Record<string, string>>((acc, element, index) => {
            acc[builderColorTurnVarCSS(index)] = element.color
            return acc
        }, {}),
    } as React.CSSProperties

    return (
        <div draggable={false} className={`
        grid gap-1 justify-center size-full 
        max-w-96 max-h-96 select-none`} style={style}>
            {
                boards[currentBoard]!.map((row, x) =>
                    row.map((square, y) =>
                        <SquareWithOutLogics
                            key={`${x} squareWOL ${y}`}>
                            {square === 1000 ? playerIndex : null}
                        </SquareWithOutLogics>
                    )
                )
            }
        </div>
    )
}