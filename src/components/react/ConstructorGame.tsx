import { useEffect, useState } from "react";
import { defaultPlayers } from "@/assets/ts/constants";
import useGameOptions, { type OptionsGroup } from "@/assets/react/hooks/useGameOptions";
import GameOptions from "./GameOptions"
import GameDisplay from "./GameDisplay"
import type { IGame } from "@/assets/types/interfaces";

//FIXME: improves code and readability
export default function ConstructorGame() {
    const [disabledButtonStart, setButtonStart] = useState(false);
    const [showOptions, setOptions] = useState(true);

    const { optionsGroup: { size, players, winningLineLength } } = useGameOptions();

    const handleSizeToggle = (index: number) => size.handler(index);
    const handlePlayersToggle = (index: number) => players.handler(index);
    const handleWinningLineLengthToggle = (index: number) => winningLineLength.handler(index);

    const newOptionsGroup: OptionsGroup = {
        size: { ...size, handler: handleSizeToggle },
        players: { ...players, handler: handlePlayersToggle },
        winningLineLength: { ...winningLineLength, handler: handleWinningLineLengthToggle },
    };

    useEffect(() => {
        const invalidSize = !size.options[size.index]?.[1];
        const invalidPlayers = !players.options[players.index]?.[1];
        const invalidWinningLineLength = !winningLineLength.options[winningLineLength.index]?.[1];

        if (invalidSize || invalidPlayers || invalidWinningLineLength) {
            setButtonStart(true)
        } else {
            setButtonStart(false)
        }

    }, [
        JSON.stringify(size.options),
        size.index,
        JSON.stringify(players.options),
        players.index,
        JSON.stringify(winningLineLength.options),
        winningLineLength.index
    ]);

    const onStart = () => {
        if (!disabledButtonStart) setOptions(false);
    };

    const propsGame: IGame = {
        size: [Number(size.options[size.index]![0]), Number(size.options[size.index]![0])],
        players: defaultPlayers.slice(0, Number(players.options[players.index]![0])),
        winningLineLength: Number(winningLineLength.options[winningLineLength.index]![0]),
    };

    return (
        <>
            {showOptions ? (
                <GameOptions {...{
                    optionsGroup: newOptionsGroup,
                    disabledButton: disabledButtonStart,
                    onStart
                }} />
            ) : (
                <GameDisplay
                    {...{
                        propsGame,
                        showOptions: () => {
                            setOptions(true);
                        },
                    }}
                />
            )}
        </>
    );
}