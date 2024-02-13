import { useEffect, useMemo, useState } from "react";
import type { OptionsToggle } from "@/assets/types/types";
import { generateOptions } from "@/assets/ts/functions";

export type OptionsGroup = {
    [key: string]: {
        title: string;
        index: number;
        options: OptionsToggle;
        handler: (index: number) => void;
    };
    size: {
        title: string;
        index: number;
        options: OptionsToggle;
        handler: (index: number) => void;
    }
    players: {
        title: string;
        index: number;
        options: OptionsToggle;
        handler: (index: number) => void;
    }
    winningLineLength: {
        title: string;
        index: number;
        options: OptionsToggle;
        handler: (index: number) => void;
    }
    fallingPieceMode: {
        title: string;
        index: number;
        options: OptionsToggle;
        handler: (index: number) => void;
    }
}

const useGameOptions = () => {

    // declarate states 
    const [sizeIndex, setSizeIndex] = useState(0);
    const [playersIndex, setPlayersIndex] = useState(0);
    const [winningLineLengthIndex, setWinningLineLengthIndex] = useState(0);
    const [fallingPieceModeIndex, setFallingPieceModeIndex] = useState(0);

    // create handlers
    const handleSizeToggle = (index: number) => { setSizeIndex(index) }
    const handlePlayersToggle = (index: number) => { setPlayersIndex(index) }
    const handleWinningLineLengthToggle = (index: number) => { setWinningLineLengthIndex(index) }
    const handleFallingPieceModeToggle = (index: number) => { setFallingPieceModeIndex(index) }

    // initialize options
    const initialGroupOptions = useMemo(() => generateOptions(playersIndex, sizeIndex, fallingPieceModeIndex, winningLineLengthIndex), [])

    const [sizeOptions, setSizeOptions] = useState<OptionsToggle>(
        initialGroupOptions.valueSize
    );
    const [playersOptions, setPlayersOptions] = useState<OptionsToggle>(
        initialGroupOptions.valuePlayers
    );
    const [winningLineLengthOptions, setWinningLineLengthOptions] = useState<OptionsToggle>(
        initialGroupOptions.valueWinningLineLength
    );

    const [fallingPieceModeOptions, setFallingPieceModeIndexOptions] = useState<OptionsToggle>(
        initialGroupOptions.valueFallingPieceMode
    );

    // reset function
    const resetOptions = () => {
        handleSizeToggle(0);
        handlePlayersToggle(0);
        handleWinningLineLengthToggle(0);
        handleFallingPieceModeToggle(0);

        setSizeOptions(initialGroupOptions.valueSize);
        setPlayersOptions(initialGroupOptions.valuePlayers);
        setWinningLineLengthOptions(initialGroupOptions.valueWinningLineLength);
        setFallingPieceModeIndexOptions(initialGroupOptions.valueFallingPieceMode);
    };

    // update available options 
    useEffect(() => {
        const options = generateOptions(playersIndex, sizeIndex, fallingPieceModeIndex, winningLineLengthIndex);
        setSizeOptions(options.valueSize);
        setPlayersOptions(options.valuePlayers);
        setWinningLineLengthOptions(options.valueWinningLineLength);
        setFallingPieceModeIndexOptions(options.valueFallingPieceMode);
    }, [sizeIndex, playersIndex, winningLineLengthIndex, fallingPieceModeIndex]);

    // construct options group object
    const optionsGroup: OptionsGroup = {
        size: {
            title: "Tamaño del tablero:",
            index: sizeIndex,
            options: sizeOptions,
            handler: handleSizeToggle,
        },
        players: {
            title: "Cantidad de jugadores:",
            index: playersIndex,
            options: playersOptions,
            handler: handlePlayersToggle,
        },
        winningLineLength: {
            title: "Cantidad de piezas conectadas para ganar:",
            index: winningLineLengthIndex,
            options: winningLineLengthOptions,
            handler: handleWinningLineLengthToggle,
        },
        fallingPieceMode: {
            title: "Caida de piezas:",
            index: fallingPieceModeIndex,
            options: fallingPieceModeOptions,
            handler: handleFallingPieceModeToggle,
        }
    }

    return {
        optionsGroup,
        resetOptions,
    };
};

export default useGameOptions;
