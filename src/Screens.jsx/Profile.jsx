import React from 'react'
import Navbar from '../Components/Navbar'
import Personal from '../Components/Personal'
import Post from '../Components/Post'

export default function Profile() {
  const username = localStorage.getItem('username')
  return (
    <div className='profile2 text-center'>
      <Navbar />
      {/* <hr className="m-0" /> */}
      <Personal username={username} />
      {/* <Post /> */}
    </div>
  )
}
