import React from 'react'
import { useNavigate } from 'react-router-dom'
import Poster from './Poster'


export default function Main() {
  let navigate = useNavigate()
  return (
    <div className="main mt-2 d-flex justify-content-center gap-3">

      <div className="posts  ">
        <Poster />
      </div>

      <div className="chats d-lg-inline d-none">
        <h3 className='mx-3 mt-3'>Chat section</h3>
      </div>

      <span className="material-symbols-outlined newpost " onClick={() => navigate('/newpost')}>
        add_circle
      </span>
    </div>
  )
}
