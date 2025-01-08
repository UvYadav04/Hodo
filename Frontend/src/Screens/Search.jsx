import React, { useMemo, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useLocation } from 'react-router-dom'
// import ProfileCard from '../Components/ProfileCard'
import c1 from '../Photos/c1.jpg'


export default function Search() {
    let location = useLocation()
    const username = location.state
    const [users, setusers] = useState([])
    // console.log(`users : `, users)

    const getalldata = async () => {
        // console.log(`getting data with usernaem : `, username)
        const response = await fetch("https://hodobackend.onrender.com/search/userdata", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorisation': `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ username })
        })

        const json = await response.json()
        let user = json.userdata
        let result = []
        result = Object.keys(user).map((key) => [user[key]]);
        // console.log(result)
        setusers(result)
    }

    useMemo(() => {
        getalldata()
    }, [])

    return (
        <>
            <Navbar />
            <div className="container result p-0 mt-2">
                {
                    users.map((item) => {
                        return (
                            // console.log(item)
                            <>
                                <div className="row justify-content-start p-0 w-50 border border-black mb-2 py-1 px-2 rounded-2 m-auto">
                                    <div className="col-1 p-0 ">
                                        <img className='d-inline rounded-5' src={c1} width={50} height={50} alt="" />

                                    </div>
                                    <div className="col-3">
                                        <h5 className='mb-0'>{item[0].Name}</h5>
                                        <h6 className='d-inline opacity-75 my-0'>{item[0].Username}</h6>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }

            </div >
        </>
    )
}
