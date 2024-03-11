import React, { useEffect, useState } from 'react'
import Post from './Post'
import axios from 'axios'
import usericon from '../Photos/bg1.png'
import c1 from '../Photos/c1.jpg'
import Personalpost from './Personalpost'
export default function Personal({ username }) {
    const [user, setuser] = useState({})
    const owner = localStorage.getItem('username')
    const [found, setfound] = useState(false)
    const getuserdata = async () => {
        const response = await fetch("http://localhost:8080/user/userdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorisation': `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ username })
        })

        const json = await response.json()
        setfound(true)
        // console.log(json.user)
        setuser(json.user)
    }


    useEffect(() => {
        getuserdata()
    }, [])

    return (
        <>

            <div className="container-fluid profile">
                <div className="row prow justify-content-around pt-2 ps-2 ">
                    <div className="col-xxl-4 col-xl-4 col-lg-5 col-12 position-lg-sticky position-static info d-flex flex-column justify-content-start p-0 text-align-center p-2">
                        <div className="image d-flex flex-row justify-content-start gap-0 ">
                            <img src={usericon} className='mx-1 ' width={145} height={145} alt="" />
                            <span className="mx-2 name text-start ">
                                <h4 className='mb-0 '>{user.Username}</h4>
                                <h5 className='opacity-75 m-0 '>{user.Name}</h5>
                                <button className='rounded-2 text-white bg bg-primary my-2 border border-none'>Follow+ </button> <br />
                                <button className='rounded-1 bg bg-primary text-white me-2' ><span>{found ? user.Followers.length : null}</span> Followers</button>
                                <button className='rounded-1 bg bg-primary text-white me-2' ><span >{found ? user.Following.length : null}</span> Following</button>
                            </span>

                        </div>


                        <div className="infor text-start mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, dolorem ullam! Nulla, ratione. At, et laboriosam quidem eius quasi facilis sequi aut quo voluptatem odio neque sapiente ipsam officiis autem?
                        </div>

                        <div className="interests text-start mt-2">
                            <h5>Interests : </h5>
                            <button className='bg bg-primary text-white mx-2'>kashmir</button>
                            <button className='bg bg-primary text-white mx-2'>Las vegas</button>
                            <button className='bg bg-primary text-white mx-2'>Paris</button>
                            <button className='bg bg-primary text-white mx-2'>Dubai</button>
                        </div>
                    </div>
                    <div className="col-xl-5 col-md-7 col-sm-10 col-12 posts mt-lg-0 mt-3">
                        <Personalpost username={username} />
                    </div>
                    <div className=" col-xl-3 col-lg-3 col-md-4 d-xl-inline d-lg-none d-md-inline d-none mt-lg-0 mt-3 chater border border-black">
                        Live Chat Section
                    </div>
                </div>
            </div>
        </>
    )
}