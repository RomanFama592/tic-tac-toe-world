import Game from "./Game";
import Button from "./Button";
import type { IGame } from "@/assets/types/interfaces";

interface IGameDisplay {
    propsGame: IGame
    showOptions: () => void
}

export default function GameDisplay({ propsGame, showOptions }: IGameDisplay) {
    return (
        <div className="flex flex-col gap-y-3 items-center size-full">
            <Game {...propsGame} />
            <Button onClick={showOptions}>
                Change options
            </Button>
        </div>
    )
}