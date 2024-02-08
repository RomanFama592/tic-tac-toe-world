import Square from "./Square"
import JSConfetti from 'js-confetti'
import { useContext, useEffect, useMemo } from "react"
import GameContext from "@/assets/react/contexts/GameContext"
import { builderColorTurnVarCSS, tieValue } from "@/assets/ts/constants"

export default function WinningModal() {
    const { winner, winningPositions, winningLineLength, players } = useContext(GameContext)

    const confetti = useMemo(() => (new JSConfetti()), [])
    const valueColor = `var(${builderColorTurnVarCSS(winner ?? tieValue)})`
    //const symbols = useMemo(() => players.map((element) => (element.symbol)), [players])


    const multiplexWinner = useMemo(
        () => (winningPositions
            ? winningPositions.reduce((prevValue, value) => {
                return prevValue + Math.floor(value.length / winningLineLength)
            }, 0)
            : 0), [winningPositions])

    const winnerText = "WINNER " + (
        (multiplexWinner > 1)
            ? "x" + multiplexWinner
            : "") + "!"

    useEffect(() => {
        if (
            winner !== null
            && winner !== -1
            && winner >= 0
            && winner < players.length
        ) {
            confetti.addConfetti({
                //emojis: symbols,
                emojis: [players[winner]!.symbol]
            })
        }
    }, [winner])

    return (
        <div className="absolute size-full overflow-hidden">
            <div className={`group absolute
            top-[1%] h-[30%] w-[35%]
            ${winner !== null ? "left-[-15%]" : "left-[-50%]"}
            bg-base-200 border-2 rounded-lg shadow-lg
            border-current z-10 animate-pulse
            flex flex-row p-2 gap-2 justify-end items-center
            hover:left-[1%] hover:w-[50%] hover:opacity-100
            hover:justify-center hover:animate-none 
            transition-all duration-300 delay-75`}
                style={{ color: valueColor }}>
                {
                    // evaluate if there is a tie
                    winner! > tieValue ?
                        <>
                            <h1
                                className={`group-hover:opacity-100 opacity-0 
                                font-semibold max-w-[50%] text-current text-nowrap self-center 
                                transition-all duration-300 delay-200`}>
                                {winnerText}
                            </h1>
                            <div className="size-full *:top-0 *:left-0 *:absolute *:size-full *:transition-all *:duration-150">
                                <div className={`flex flex-col items-center group-hover:opacity-0 *:size-full`}>
                                    <h1>WIN</h1>
                                    <Square
                                        disabled={true}
                                        color={true}>
                                        {winner}
                                    </Square>
                                </div>
                                <div className="group-hover:opacity-100 opacity-0 *:size-full">
                                    <Square
                                        disabled={true}
                                        color={true}>
                                        {winner}
                                    </Square>
                                </div>

                            </div>
                        </>
                        : <h1 className="text-2xl font-semibold">TIE</h1>
                }
            </div>
        </div>
    )
}
