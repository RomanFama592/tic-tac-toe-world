import { useContext } from "react"
import GameContext from "@/assets/react/contexts/GameContext"
import Button from "./Button"

export default function ButtonResetGame({
    className = "",
    disabled = false
}: { className?: string, disabled?: boolean }) {
    const { resetGame } = useContext(GameContext)

    return (
        <>
            {!disabled
                && <Button
                    className={className}
                    onClick={resetGame}>
                    Reset Game
                </Button>}
        </>
    )
}