import type { WinnerType } from "@/assets/types/types"
import { useState, useEffect } from "react"

const useDisableSquare = (disabled: boolean, winner: WinnerType) => {
    const [disabledState, setDisabled] = useState(disabled)

    useEffect(() => {
        setDisabled(disabled)
    }, [disabled, winner])

    return {disabledState, setDisabled}
}

export default useDisableSquare