import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Main from '../Components/Main'


export default function Homepage() {
  return (
    <div className='homepage'>
      <Navbar />
      <Main className="text-center" />
    </div >
  )
}
