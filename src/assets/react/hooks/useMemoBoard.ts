import { useMemo, useState } from "react"
import { constructEmptyBoard } from "@/assets/ts/functions"
import type { BoardType, SizeDeclarationBoard } from "@/assets/types/types"


export default function useMemoBoard(size: SizeDeclarationBoard, boardExisting?: BoardType) {
    const boardEmpty = useMemo(() => {
        if (boardExisting) {
            return boardExisting
        }
        return constructEmptyBoard(...size)
    }, [size, boardExisting])

    const [board, setBoard] = useState(boardEmpty)

    return { board, setBoard, boardEmpty }
}
