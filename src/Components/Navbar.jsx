import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import logo from '../Photos/logo3.png'
import c1 from '../Photos/c1.jpg'
import { useCookies } from 'react-cookie';
export default function Navbar() {
  let navigate = useNavigate()
  const [search, setsearch] = useState("")
  const [data, setdata] = useState([])
  const [result, setresult] = useState(false)
  const [menu, setmenu] = useState(false)
  // const [cookie, setcookie, removecookie] = useCookies()

  const handlesearch = async (value) => {
    setsearch(value)
    if (value !== "") {
      setresult(true)
      console.log(`value : `, value)
      const response = await fetch("http://localhost:8080/search/userdata", {
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
    <div className="container-fluid c1 mt-md-0 mt-0 px-0">
      <div className="row navbar  justify-content-md-around align-items-center p-0 px-2 m-0">
        <div className="col-md-auto col-2 d-md-flex text-center align-items-center p-0 me-md-none me-0 justify-content-around ">
          <img src={logo} alt="" width={50} height={40} onClick={() => {
            navigate('/hodo')
          }} />
          <div className="d-md-inline d-none pt-2 m-2 name">
            <h4 className='d-inline-block'>HODO</h4>
          </div>
        </div>
        <div className="col-md-4 col-5 col-lg-5 col-xl-4 mx-0 search text-md-start p-0 text-center ms-auto ms-md-0">
          <input type="text" className='m-0 w-100 rounded-5 ps-2 position-relative' placeholder='search' value={search} name='search' onChange={(e) => handlesearch(e.target.value)} />
          <div className={result ? "results d-block text-start position-absolute rounded-1 py-1 px-2 w-100" : "d-none"}>
            {
              data.map((item) => {
                return (
                  <div className='d-flex dipdop flex-row justify-content-start bg bg-white text-black mb-1 w-md-auto w-100 rounded-3s' onClick={() => navigate('/usersprofile', { state: item[0].Username })} >
                    <div className="image">
                      <img src={c1} width={40} height={40} className='d-inline rounded-5 my-1 mx-2' alt="" />
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
          <Link to={'/hodo'} className=" text-decoration-none text-black fs-5 mx-md-3 mx-1 ">Home</Link>
          <Link to={'/chat'} className=" text-decoration-none text-black fs-5 mx-md-3 mx-1">Chat</Link>
          <Link to={'/privacy'} className="d-md-inline d-none text-decoration-none text-black fs-5 mx-md-3 mx-1">Privacy</Link>

          <button className=" fs-4 mx-md-2 mx-0 p-0 cursor-pointer text-decoration-none text-danger w-auto  d-lg-inline d-none" onClick={() => {
            localStorage.removeItem('username')
            localStorage.removeItem('token')
            navigate('/auth')
          }}>Logout</button>
          <Link to={'/profile'} className="fs-5 mx-0 cursor-pointer text-decoration-none text-black "> <AccountCircleIcon
            className="m-0" sx={{ fontSize: 40 }} />
          </Link>
        </div>

        <div className="m-0 col-2 text-center menu d-md-none d-inline">
          <MenuTwoToneIcon className='m-0' sx={{ fontSize: 40 }} onClick={() => handlemenu()} />
        </div>

        <div className={menu ? "menubar d-flex flex-column gap-2 col-4 col-sm-3 m-0 py-1 text-white show d-md-none d-inline rounded-1" : "menubar d-flex flex-column gap-2 col-4 col-sm-3 m-0 py-1 text-white hide d-md-none d-inline rounded-1"}>
          <Link to={'/hodo'} className='text-decoration-none text-black fs-4'>Home</Link>
          <Link to={'/chat'} className='text-decoration-none text-black fs-4'>Chat</Link>
          <Link to={'/privacy'} className='text-decoration-none text-black fs-4'>Privacy</Link>
          <Link to={'/profile'} className='text-decoration-none text-black fs-4'>Profile</Link>
          <button className=" fs-4 cursor-pointer text-decoration-none text-danger text-start p-0  m-0" onClick={() => {
            localStorage.removeItem('username')
            localStorage.removeItem('token')
            // console.log(cookie.username)
            // removecookie("username")
            navigate('/auth')
          }}>Logout</button>
        </div>
      </div>

    </div >

  )
}