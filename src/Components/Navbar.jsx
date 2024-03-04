import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../Photos/logo3.png'
export default function Navbar() {
  let navigate = useNavigate()
  return (
    <div className="container-fluid c1 mt-0 b ">
      <div className="row navbar justify-content-between  align-items-center">
        <div className="col-auto  d-flex align-items-center">
          <img src={logo} alt="" width={80} height={60} onClick={() => {
            navigate('/hodo')
          }} />
          <div className="d-inline pt-2 m-2 name">
            <h4 className='d-inline-block'>HODO</h4>
          </div>
        </div>
        <div className="col-4 search text-center p-0">
          <input type="text" placeholder='search for anything' />
          <button className='mx-2'>Search</button>
        </div>
        <div className=" col-5   navs text-end pt-0 ">
          <Link to={'/hodo'} className="text-decoration-none text-black fs-5 mx-3">Home</Link>
          <Link className="text-decoration-none text-black fs-5 mx-3">Chat</Link>
          <Link to={'/privacy'} className="text-decoration-none text-black fs-5 mx-3">Privacy</Link>

          <button className="fs-4 mx-0 p-0 cursor-pointer text-decoration-none text-danger w-25" onClick={() => {
            localStorage.removeItem('username')
            localStorage.removeItem('token')
            navigate('/auth')
          }}>Logout</button>
          <Link to={'/profile'} className="fs-5 mx-0 cursor-pointer text-decoration-none text-black "> <AccountCircleIcon
            className="m-0" sx={{ fontSize: 50 }} />
          </Link>

        </div>
      </div>

    </div>

  )
}
