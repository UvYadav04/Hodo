import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Carousel from '../Components/Carousel'
import Main from '../Components/Main'
import Footer from '../Components/Footer'
import io from 'socket.io-client'


export default function Homepage() {
  return (
    <div>
      <Navbar />
      <Main className=" text-center" />
    </div >
  )
}
