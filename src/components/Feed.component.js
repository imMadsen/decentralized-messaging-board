import { useContext, useEffect, useState } from 'react';
import GUN, { SEA } from 'gun'
import { gun } from "../user";
import { SettingsContext } from '../contexts/Settings.context';

import { Post } from './Post.component';
import "./Feed.component.css";

export const Feed = () => {
    const { board } = useContext(SettingsContext)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setMessages([])
        gun.get(board.toLowerCase() + '#messages').on(messages => {
            const entries = Object.entries(messages).slice(1)
            const validEntries = [];
            entries.forEach(([key, value]) => {
                try {
                    const { owner, refrence } = JSON.parse(value.slice(3)).m
                    const isValid = SEA.verify(value, owner)

                    if (!isValid)
                        throw new Error("Invalid signature");

                    const createdAt = GUN.state.is(messages, key);
                    validEntries.push({ owner, refrence, createdAt })
                } catch (error) { String('Probably some troll passing invalid Data to the graph 😘') }
            })

            // Filter entries by creation date
            setMessages(validEntries)
        })
    }, [board])

    return (                                                                                                                                                                                 
        <div className='Feed'>
            {
                messages.sort((a, b) => a.createdAt - b.createdAt)
                .reverse()
                .map((props, key) => <Post key={props.refrence} {...props} />)
            }
        </div>
    )
}