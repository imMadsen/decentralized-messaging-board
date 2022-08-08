import { useContext, useEffect, useRef, useState } from "react";
import { SettingsContext } from "../contexts/Settings.context";
import { SearchIcon } from "../icons/Search.icon";
import { user } from "../user";
import "./Navbar.component.css"

function CreateNewIdentity() {
    // Generate random string of given length
    function randomString(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    // Create user
    const [alias, password] = [randomString(8), randomString(8)]
    user.create(alias, password, null, () => user.auth(alias, password))
    setTimeout(() => window.location = window.location + '?', 1000)
}

export const Navbar = () => {
    const { updateBoard } = useContext(SettingsContext)
    const boardRef = useRef()
    const [userData, setUserData] = useState();

    useEffect(() => {
        if (user.is)
            setUserData(user.is)
    }, [])

    function submitBoard() {
        updateBoard(boardRef.current.value)
    }

    return (
        <div className="navbar">
            <div className="navbar-contents">
                <div className="navbar-board">
                    <input ref={boardRef} placeholder="Discover a new board" onKeyDown={(({ code }) => code === 'Enter' && submitBoard())} />
                    <button onClick={submitBoard}>
                        <SearchIcon />
                    </button>
                </div>
                <div className="navbar-profile">
                    {
                        /*<p>{userData?.alias?.substring(1, 7)}</p>*/
                        /* Hidden until a better way of fetching alias is found 😁 */
                    }
                    <img className="navbar-avatar" onDoubleClick={CreateNewIdentity} src={`https://avatars.dicebear.com/api/miniavs/${userData?.pub}.svg`} />
                </div>
            </div>
        </div>
    )
}