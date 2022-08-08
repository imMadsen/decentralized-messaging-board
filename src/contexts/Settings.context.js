
import { useState, createContext } from "react";

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const [value, update] = useState({
        board: '',

        updateBoard: function (board) {
            update({ ...value, board: board.toLowerCase() })
        },
    })

    return (
        <SettingsContext.Provider
            value={value}
        >{children}</SettingsContext.Provider >
    )
}
