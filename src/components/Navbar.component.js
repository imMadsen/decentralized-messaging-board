import { useContext, useEffect, useRef, useState } from "react";
import { SettingsContext } from "../contexts/Settings.context";
import { UserContext } from "../contexts/User.context";
import { SearchIcon } from "../icons/Search.icon";
import "./Navbar.component.css"

const Board = () => {
    const { board, updateBoard } = useContext(SettingsContext)
    const [value, update] = useState();
    const boardRef = useRef()

    function submitBoard() {
        updateBoard(boardRef.current.value)
    }

    useEffect(() => {
        update(board)
    }, [board])

    return (
        <div className="navbar-board">
            <input ref={boardRef} placeholder="Discover a new board" value={value || ""} onChange={(e) => update(e.target.value)} onKeyDown={(({ code }) => code === 'Enter' && submitBoard())} />
            <button onClick={submitBoard}>
                <SearchIcon />
            </button>
        </div>
    )
}

const Profile = () => {
    const user = useContext(UserContext)
    useEffect(() => console.log(user?.is), [user])

    return <>
        {
            (!!user?.is) &&
            <div className="navbar-profile">
                <img className="navbar-avatar" alt="avatar" src={`https://avatars.dicebear.com/api/miniavs/${user.is.pub}.svg`} />
            </div>
        }
    </>
}   

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-contents">
                <Board />
                <Profile/>
            </div>
        </div>
    )
}