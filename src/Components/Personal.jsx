import React, { useEffect, useState } from 'react'
import Post from './Post'
import axios from 'axios'
import usericon from '../Photos/bg1.png'
import c1 from '../Photos/c1.jpg'
import Personalpost from './Personalpost'
export default function Personal() {
    const [user, setuser] = useState({})
    const username = localStorage.getItem('username')
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
        <div className='profile'>
            <div className="container profile">
                <div className="row p1" style={{
                    backgroundImage: `url(${c1})`,
                    backgroundSize: '1300px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}>
                    {/* <img src={c1} alt="" /> */}
                </div>
                <div className="row p2 justify-content-between">
                    <div className="col-auto usericon">
                        <img src={usericon} alt="" className='d-inline' />
                    </div>
                    <div className="col-auto name text-start">
                        <h5 className='m-0 mt-1'>{user.Username}</h5>
                        <h6 className='m-0 opacity-75'>{user.Name}</h6>
                    </div>
                    <div className="col-8 follow text-center d-flex justify-content-around ">
                        <button className=' border border-primary text-white bg bg-primary'>Follow+</button>
                        <button><span className="text-black">{found ? user.Followers.length : null}</span> Followers</button>
                        <button><span className="text-black">{found ? user.Following.length : null}</span> Following</button>
                    </div>

                </div>
                <div className="row p3 bio justify-content-between pb-3">
                    <div className="col-6 ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quis corrupti commodi earum quisquam maxime nisi, accusamus nulla possimus, velit provident numquam dolorum architecto quod iste, rem eveniet optio voluptatem!
                    </div>
                    <div className="col-2">
                        <button className='bg bg-primary '>Edit Profile</button>
                    </div>
                </div>
            </div>


            <div className="data row justify-content-end gap-3 px-3">
                <div className="posts mt-5 col-6 ">
                    {/* <Personalpost /> */}
                </div>

                <div className="chats col-3 ">
                    <h3 className='mx-3 mt-3'>Chat section</h3>
                </div>

            </div>
        </div>
    )
}