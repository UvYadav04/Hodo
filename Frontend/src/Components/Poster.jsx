import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Post from './Post'
export default function Poster() {
    const [postdata, setpostdata] = useState([])
    let navigate = useNavigate()

    const loaddata = async () => {
        const response = await fetch("https://hodobackend.onrender.com/post/getpostdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorisation': `bearer ${localStorage.getItem('token')}`
            },
        })

        const json = await response.json();
        if (json.success) {
            // console.log(`data : `, json.data)
            json.data.reverse()
            setpostdata(json.data)
        }
        else if (!json.success) {
            // console.log("got an error")
            return navigate('/error')
        }
    }

    useEffect(() => {
        loaddata()
    }, [])

    if (postdata.length <= 0)
        return null;

    var result = []
    if (postdata.length > 0) {
        result = Object.keys(postdata).map((key) => [key, postdata[key]]);
    }

    return (
        <div className="poster mt-1">
            {
                result.map((data, i) => {
                    return (
                        <Post key={i} image={data[1].image} description={data[1].description} username={data[1].user} Tags={data[1].Tags} likes={data[1].likes} id={data[1]._id} Comments={data[1].comment} date={data[1].Date} />
                    )
                })
            }
        </div>
    )
}
