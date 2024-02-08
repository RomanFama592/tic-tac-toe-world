import GameContext from '@/assets/react/contexts/GameContext'
import useDisableSquare from '@/assets/react/hooks/useDisableSquare'
import { builderColorTurnVarCSS } from '@/assets/ts/constants'
import type { UpdateBoardType } from '@/assets/types/types'
import React, { useContext } from 'react'

export interface ISquareProps {
    children: number | null
    indexs?: [number, number]
    color?: boolean
    disabled?: boolean
    updateBoard?: UpdateBoardType
}

export default function Square({
    children,
    color = true,
    disabled = false,
    indexs = [-1, -1],
    updateBoard = () => { }
}: ISquareProps) {
    const { winner, players } = useContext(GameContext)
    const { disabledState, setDisabled } = useDisableSquare(disabled, winner)

    const nameButton = `square-index ${indexs[0]} ${indexs[1]}`
    const ariaLabel = `Square at index ${indexs[0]}, ${indexs[1]}`;

    const pieceSymbol = typeof children === "number" && players[children]?.symbol

    const classNameSquare = `
    flex aspect-square 
    justify-center items-center
    text-[calc(100%)]
    min-h-11 min-w-11
    border-2 border-black rounded
    transition-colors duration-200
    bg-base-100`


    const styles = {} as React.CSSProperties

    if (typeof children === "number" && color) {
        styles.backgroundColor = `var(${builderColorTurnVarCSS(children)})`
    }

    const handlerClick = () => {
        if (children !== null || winner !== null) return;
        updateBoard(indexs)
        setDisabled(false)
    }

    return (
        <button
            onClick={handlerClick}
            disabled={disabledState}

            name={nameButton}
            aria-disabled={disabledState}
            aria-label={ariaLabel}

            className={classNameSquare}
            style={{ ...styles }}>
            {pieceSymbol}
        </button>
    )
}