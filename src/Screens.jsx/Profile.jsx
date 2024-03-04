import React from 'react'
import Navbar from '../Components/Navbar'
import Personal from '../Components/Personal'
import Post from '../Components/Post'

export default function Profile() {
  return (
    <div className='profile2 text-center'>
      <Navbar />
      <Personal />
      {/* <Post /> */}
    </div>
  )
}
