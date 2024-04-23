import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import logo from '../Photos/logo3.png'
import c1 from '../Photos/c1.jpg'
import usericon from '../Photos/bg1.png'
import BoltIcon from '@mui/icons-material/Bolt';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NearMeIcon from '@mui/icons-material/NearMe';


import { useCookies } from 'react-cookie';
export default function Navbar() {
  let navigate = useNavigate()
  const [search, setsearch] = useState("")
  const [data, setdata] = useState([])
  const [result, setresult] = useState(false)
  const [menu, setmenu] = useState(false)
  const owner = localStorage.getItem("username")
  // const [cookie, setcookie, removecookie] = useCookies()

  const handlesearch = async (value) => {
    setsearch(value)
    if (value !== "") {
      setresult(true)
      // console.log(`value : `, value)
      const response = await fetch("https://hodobackend.onrender.com/search/userdata", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'authorisation': `bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ username: value })
      })
      const json = await response.json()
      let user = json.userdata
      let result = []
      result = Object.keys(user).map((key) => [user[key]]);
      // console.log(`result : `, result)
      setdata(result)
    }

    else if (value === "") {
      setresult(false)
      setdata([])
    }

  }

  const handlemenu = () => {
    setmenu(!menu)
  }

  return (
    <div className="container-fluid c1 mt-md-0 mt-0 px-0 mx-0">
      <div className="row navbar  justify-content-md-around justify-content-between align-items-center p-0 px-2 m-0  w-100">
        <div className="col-md-auto col-2 d-md-flex text-center align-items-center p-0 me-md-none me-0 justify-content-around ">
          <img src={logo} alt="" width={50} height={40} onClick={() => {
            navigate('/hodo')
          }} />
          <div className="d-md-inline d-none pt-2 m-2 name">
            <h4 className='d-inline-block'>HODO</h4>
          </div>
        </div>
        <div className="col-md-4 col-sm-5 col-7 col-lg-5 col-xl-4 mx-0 search text-md-start p-0 text-center ms-auto ms-md-0">
          <input type="text" className='m-0 w-100 rounded-5 ps-2 position-relative' placeholder='search' value={search} name='search' onChange={(e) => handlesearch(e.target.value)} />
          <div className={result ? "results d-block text-start position-absolute rounded-1 py-1 px-2 w-100" : "d-none"}>
            {
              data.map((item) => {
                return (
                  <div className='d-flex dipdop flex-row justify-content-start bg bg-white text-black mb-1 w-md-auto w-100 rounded-3s' onClick={() => navigate('/usersprofile', { state: item[0].Username })} >
                    <div className="image">
                      {item[0].image !== "" ? <img src={`https://hodobackend.onrender.com//Images/` + item[0].image} width={40} height={40} className='d-inline rounded-5 my-1 mx-2' alt="" /> : <img src={usericon} width={40} height={40} className='d-inline rounded-5 my-1 mx-2' alt="" />}
                    </div>
                    <div className="info">
                      <h5 className='my-0 fs-md-5 ' >{item[0].Username}</h5>
                      <h6 className='my-0 opacity-75  '>{item[0].Name}</h6>
                    </div>
                  </div>

                )
              })
            }
          </div>
        </div>
        <div className=" col-md-4 col-2 navs pt-0 d-md-flex align-items-center justify-content-around d-none px-md-2 px-0">
          <Link to={'/hodo'} className=" text-decoration-none text-black fs-5 mx-lg-3 mx-md-2 mx-1 ">Home</Link>
          <Link to={'/chat'} className=" text-decoration-none text-black fs-5 mx-lg-3 mx-md-2 mx-1">Chat</Link>
          <Link to={'/privacy'} className="text-decoration-none text-black fs-5 mx-lg-3 mx-md-2 mx-1">Privacy</Link>
          <Link to={'/profile'} className="fs-5 mx-0 cursor-pointer text-decoration-none text-black "> <AccountCircleIcon
            className="m-0" sx={{ fontSize: 40 }} />
          </Link>
        </div>

        <Link to={'/friends'} className="col-1 d-md-none text-decoration-none text-black fs-5 m-0 ms-2 me-1 mb-1 p-0 bg bg text-center"><BoltIcon className='p-0 m-0' sx={{ fontSize: 30 }} /></Link>

      </div>
      <div className="row d-md-none bar p-0 w-100 m-0 my-0">
        <div className="bottombar col-12 text-black d-flex m-0 justify-content-between px-2  w-100 py-0">
          <HomeIcon sx={{ fontSize: 35 }} onClick={() => navigate('/hodo')} />
          <NearMeIcon sx={{ fontSize: 35 }} onClick={() => navigate('/nearby')} />
          <AddCircleIcon className='position-relative bg rounded-5 addicon ' sx={{ fontSize: 35 }} onClick={() => navigate('/newpost')} />
          <NotificationsIcon sx={{ fontSize: 35 }} onClick={() => navigate('/')} />
          <AccountCircleIcon sx={{ fontSize: 35 }} onClick={() => navigate('/usersprofile', { state: owner })} />
        </div>
      </div>

    </div >

  )
}