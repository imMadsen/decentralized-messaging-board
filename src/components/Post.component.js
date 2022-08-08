import { memo, useEffect, useState } from "react";
import { FlameIcon } from "../icons/Flame.icon";
import { PenIcon } from "../icons/Pen.icon";
import Gun from "gun";
import { gun, user } from "../user";
import "./Post.component.css";

const cache = {};

function getFromCache(key, setCache) {
    return new Promise(async resolve => {
        const element = cache[key];
        if (element) {
            resolve(element)
            return;
        }

        cache[key] = await setCache()
        resolve(cache[key])
    })
}


export const Post = memo(({ owner, refrence, createdAt }) => {
    const [contents, setContents] = useState('...')
    const [updatedAt, setUpdatedAt] = useState(new Date(0))
    const [alias, setAlias] = useState('...')
    const [me, setMe] = useState()

    useEffect(() => {
        gun.get('ready').once(data => {
            // Subscribe to the changes in the post
            gun.get(refrence).on(data => {
                setContents(data.contents)
                setUpdatedAt(Gun.state.is(data, 'contents'))
            })

            // Fetch the users alias
            getFromCache(owner, () => new Promise((res) => gun.get('~' + owner).once(d => res(d))).then(user => {
                setAlias(user.alias)
            }))

            // Update me to the current user
            setMe(user.is)
        })
    }, [])

    function Edit() {
        const edit = window.prompt("Enter new message:");
        if (!!edit)
            user.get('messages').get(refrence).put({ contents: edit })
    }

    function Invalidate() {
        if (window.confirm('Are you sure you want to invalidate this post?'))
            user.get('messages').get(refrence).put({ contents: null })
    }

    return (
        <div className="post">
            <div className="post-header">
                <img className="post-avatar" src={`https://avatars.dicebear.com/api/miniavs/${owner}.svg`} />
                <h4>{alias}</h4>
            </div>
            <div className="post-contents">
                <p>{contents || <b>Invalidated</b>}</p>
            </div>
            <div className="post-footer">
                <div>
                    <small>Created at: {new Date(createdAt).toLocaleString()}</small><br />
                    {
                        (createdAt <= updatedAt) &&
                        <small>Updated at: {new Date(updatedAt).toLocaleString()}</small>
                    }
                </div>
                {
                    (me?.pub === owner) &&
                    <div className="post-controls">
                        <div>
                            <PenIcon onClick={Edit} />
                            <FlameIcon onClick={Invalidate} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
})