import { useContext, useRef } from "react";
import { SettingsContext } from "../contexts/Settings.context";
import { UserContext } from "../contexts/User.context";
import { SearchIcon } from "../icons/Search.icon";
import "./Navbar.component.css"

export const Navbar = () => {
    const user = useContext(UserContext)
    const { updateBoard } = useContext(SettingsContext)
    const boardRef = useRef()

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
                {
                    (!!user?.is) &&
                        <div className="navbar-profile">
                            <img className="navbar-avatar" src={`https://avatars.dicebear.com/api/miniavs/${user.is.pub}.svg`} />
                        </div>
                }
            </div>
        </div>
    )
}