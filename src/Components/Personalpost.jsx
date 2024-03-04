import React, { useEffect, useState } from 'react'
import Post from './Post'
export default function Personalpost() {
    const [data, setdata] = useState({})
    const userdata = async () => {
        console.log("rofile afh")
        const username = localStorage.getItem("username")
        console.log(`username : `, username)

        const response = await fetch("http://localhost:8080/post/getuserdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorisation': `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ username })
        })

        const json = await response.json()
        const data2 = json.data
        // console.log(`data2 : `, data2)
        setdata(data2)
    }

    var result = []
    if (data.length > 0) {
        result = Object.keys(data).map((key) => [key, data[key]]);
        console.log(result)
    }

    useEffect(() => {
        userdata()
    }, [])


    if (data.length <= 0)
        return null;

    return (
        <>
            {
                result.map((data) => {
                    return (
                        <Post image={data[1].image} description={data[1].description} username={data[1].user} Tags={data[1].Tags} likes={data[1].likes.numbers} />
                    )
                })
            }
        </>
    )
}
