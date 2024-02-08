import Button from "./Button";
import ToggleButtons from "./ToggleButtons";
import type { OptionsGroup } from "@/assets/react/hooks/useGameOptions";

interface IGameOptions {
    optionsGroup: OptionsGroup;
    disabledButton: boolean;
    onStart: () => void;
}

export default function GameOptions({
    optionsGroup,
    disabledButton,
    onStart,
}: IGameOptions) {
    return (
        <div className="flex flex-col justify-center items-center size-full">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 select-none justify-center text-center overflow-auto">
                {Object.entries(optionsGroup).map(([propName, { title, index, handler, options }]) => (
                    <div key={propName} className="flex flex-col gap-y-4 uppercase m-5">
                        <h1 title={title.slice(0, -1)} className="text-lg font-semibold">{title}</h1>
                        <ToggleButtons
                            _key={propName}
                            selection={index}
                            onToggle={handler}
                            options={options}
                        />
                    </div>
                ))}
            </div>
            <Button className="mt-5 px-10 py-8" onClick={onStart} disabled={disabledButton}>
                Start game!
            </Button>
        </div>
    );
}
