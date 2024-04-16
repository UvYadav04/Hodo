import React from 'react'
import { useLocation } from 'react-router-dom'
import Personal from '../Components/Personal'
import Navbar from '../Components/Navbar'

export default function Usersprofile() {
    let location = useLocation()
    const data = location.state
    // console.log(data)
    return (
        <>
            <Navbar />
            <Personal username={data} />
        </>
    )
}
