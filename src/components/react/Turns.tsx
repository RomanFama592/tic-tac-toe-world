import GameContext from "@/assets/react/contexts/GameContext"
import Square from "./Square"
import { useContext } from "react"



/**
 * The `defaultPlayers` component renders a container with a `Square` component that displays the current turn.
 * @redefaultPlayers The `defaultPlayers` component is returning a JSX element, specifically a `<div>` element with the
 * className "defaultPlayers-container". Inside the `<div>`, there is a `<Square>` component with the `select`
 * prop set to `true` and the `color` prop set to `true`. The content of the `<Square>` is the value of
 * the `turn` variable.
 */
export default function Turns() {
    const { turn } = useContext(GameContext)

    return (
        <div className="flex flex-row justify-evenly text-center">
            <Square
                disabled={true}>
                {turn}
            </Square>
        </div>
    )
}