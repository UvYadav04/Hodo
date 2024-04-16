import React from 'react'

export default function Messagebox({ message, time, seen, sender, owner }) {
    // console.log(time)
    return (
        <>
            <div className={sender === owner ? 'bg bg-white mbox mb-2 mx-2 rounded-3 px-2 ms-auto d-flex flex-column' : 'bg bg-white mbox mb-2 mx-2 rounded-3 px-2 me-auto d-flex flex-column'}>
                <p className='p-0 w-100  m-0 fs-6'>{message} </p>
                <h6 className='bg m-0 p-0 text-end fs-6'>{time.slice(16, 21)}</h6>
            </div>

        </>
    )
}
