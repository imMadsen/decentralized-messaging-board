import { useContext, useRef } from "react";
import { gun, user } from "../user";
import { SEA } from "gun";
import "./PostForm.component.css";
import { NoiseIcon } from "../icons/Noise.icon";
import { SettingsContext } from "../contexts/Settings.context";

export const PostForm = () => {
    const { board } = useContext(SettingsContext)
    const messageRef = useRef()

    async function submitMessage() {
        const { pub, priv } = user._.sea

        user.get('messages').set({ contents: messageRef.current.value }).once(async (_, ref) => {
            const signedData = await SEA.sign({
                owner: pub,
                refrence: ref
            }, { pub, priv })

            let hash = await SEA.work(signedData, null, null, { name: 'SHA-256' })
            gun.get(board + '#messages').get(hash).put(signedData)

            // Clear the message input
            messageRef.current.value = '';
        })
    }

    return (
        <div className="postform">
            <div className="postform-send">
                <input ref={messageRef} placeholder="Message" onKeyDown={(({ code }) => code === 'Enter' && submitMessage())} />
                <button onClick={submitMessage}>
                    <NoiseIcon />
                </button>
            </div>
        </div>
    )
}
