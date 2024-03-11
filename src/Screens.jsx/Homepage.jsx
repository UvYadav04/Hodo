import React from 'react'
import Navbar from '../Components/Navbar'
import Carousel from '../Components/Carousel'
import Main from '../Components/Main'
import Footer from '../Components/Footer'
export default function Homepage() {
  return (
    <div className="Home ">
      <Navbar />
      {/* <hr className="hr mt-0 w-100" /> */}
      <Main className=" text-center" />
      {/* <Footer /> */}
    </div>
  )
}
