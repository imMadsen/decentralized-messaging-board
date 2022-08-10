import { useState, createContext, useEffect } from "react";
import { user } from "../user";
export const UserContext = createContext();

export function UserProvider({ children }) {
    const [value, update] = useState()

    useEffect(() => {
        let _user; 
        setInterval(() => {
            if (_user !== user) {
                _user = user;
                update(user)
            }
        }, 1000)
    }, [])

    return (
        <UserContext.Provider
            value={value}
        >{children}</UserContext.Provider >
    )
}
