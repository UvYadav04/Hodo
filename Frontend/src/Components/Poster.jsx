import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Post from './Post'
export default function Poster() {
    const [postdata, setpostdata] = useState([])
    const [loading, setloading] = useState(false)
    let navigate = useNavigate()

    const loaddata = async () => {
        setloading(true)
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
            setloading(false)
        }
        else if (!json.success) {
            // console.log("got an error")
            setloading(false)
            navigate('/error')
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

    if (loading)
        return (
            <div className={loading ? "row loader w-100 p-0 m-0 opacity-50 d-flex justify-content-center align-items-center text-dark" : "d-none"}>
                <div className="load m-0"></div>
                <h5 className='text-center'>Please wait</h5>
            </div>
        )
    else
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
