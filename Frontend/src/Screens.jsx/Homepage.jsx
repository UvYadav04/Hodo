import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Carousel from '../Components/Carousel'
import Main from '../Components/Main'
import Footer from '../Components/Footer'
import io from 'socket.io-client'
const socket = io.connect(`http://localhost:3001`, {
})

export default function Homepage() {

  // useEffect(() => {
  //   socket.emit("setup", { username: localStorage.getItem("username") })
  //   socket.on("follower", (data) => {
  //     alert(data.message)
  //   })
  // }, [])

  return (
    <div>
      <Navbar />
      <Main className=" text-center" />
      {/* <div className='w-100 text-center'>
        Welcome user!!!
      </div> */}
    </div >
  )
}
