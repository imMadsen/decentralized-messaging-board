import { useState, createContext, useEffect } from "react";
import { createAnonymousUser, user } from "../user";
export const UserContext = createContext();

export function UserProvider({ children }) {
    const [value, update] = useState()

    useEffect(() => {
        let _user; 

        setInterval(() => {
            if (_user?.is !== user?.is) {
                _user = user;
                update(user)
            }

            if (_user?.is === undefined) {
                createAnonymousUser()
            }
        }, 1000)
    }, [])
    
    return (
        <UserContext.Provider
            value={value}
        >{children}</UserContext.Provider >
    )
}
