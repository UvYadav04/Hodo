import React from 'react'

export default function Messagebox({ message, time, seen, sender, owner }) {
    // console.log(time)
    return (
        <>
            <div className={sender === owner ? 'bg bg-white mbox my-2 rounded-3 px-2 py-1 ms-auto' : 'bg bg-white mbox my-2      rounded-3 px-2 py-1 me-auto'}>
                {message} <sub>{seen ? "seen" : ""} {time.slice(16, 21)}</sub>
            </div>

        </>
    )
}
