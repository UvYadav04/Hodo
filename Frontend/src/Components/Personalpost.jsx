import React, { useEffect, useState } from 'react'
import Post from './Post'
export default function Personalpost({ username }) {
    const [data, setdata] = useState([])
    // console.log(data)
    const userdata = async () => {
        // const username = localStorage.getItem("username")

        const response = await fetch("https://hodobackend.onrender.com0/post/getuserdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorisation': `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ username })
        })

        const json = await response.json()
        const data2 = json.data
        // console.log(data2)
        setdata(data2)
    }

    var result = []
    if (data.length > 0) {
        result = Object.keys(data).map((key) => [key, data[key]]);
        // console.log(result)
    }

    useEffect(() => {
        userdata()
    }, [])


    if (data.length <= 0) {
        return (
            <>
                <h5 className='mt-5 fs-1 opacity-50 w-100   text-center'>No Posts Yet</h5>
            </>
        )
    }

    return (
        <>
            {
                result.map((data, i) => {
                    return (
                        <Post key={i} image={data[1].image} description={data[1].description} username={data[1].user} Tags={data[1].Tags} likes={data[1].likes} id={data[1]._id} Comments={data[1].comment} />
                    )
                })
            }
        </>
    )
}
