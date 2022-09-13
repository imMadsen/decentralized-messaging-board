
import { useState, createContext, useEffect } from "react";

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const [value, update] = useState({
        board: '',
        updateBoard: function (board) {
            update({ ...value, board })
        },
    });

    // Set the board based off the users current location
    useEffect(() => {
        function getLocalizedBoard() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((async location => {
                    const { longitude, latitude } = location.coords
    
                    // Should avoid using this API in the future, instead have fixed cities in a file
                    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1` 
    
                    const response = await fetch(url)
                    const data = await response.json()
                    
                    update((value) => {return { ...value, board: data.address.city }})
                }))
            }
        }
    
        getLocalizedBoard()
    }, [])

    return (
        <SettingsContext.Provider
            value={value}
        >{children}</SettingsContext.Provider >
    )
}