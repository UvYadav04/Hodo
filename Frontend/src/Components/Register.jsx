import React, { useState } from 'react'
import covers from '../Photos/cover2.jpg'
import care from '../Photos/care2.png'
import b21 from '../Photos/formside.jpg'
import logo from '../Photos/logo3.png'
import { createSearchParams, useNavigate, Link } from "react-router-dom"
import GoogleIcon from '@mui/icons-material/Google';
import usericon from '../Photos/bg1.png'
import { useCookies } from "react-cookie"

import io from 'socket.io-client'
const socket = io.connect(`https://hodobackend.onrender.com`, {
})
const ref = React.createRef()
export default function Login() {
  const [logindata, setlogindata] = useState({ username: "", password: "" })
  const [userdata, setuserdata] = useState({ username: "", password: "", name: "", email: "" })
  const navigate = useNavigate()
  const [show, setshow] = useState(true)
  const [cookie, setcookie, removecookie] = useCookies()
  const [forgot, setforgot] = useState(false)
  const [fusername, setfusername] = useState("")
  const [loading, setloading] = useState(false)
  // console.log(logindata);

  const handleforgot = async () => {
    // console.log(fusername)
    if (fusername !== "") {
      // console.log(fusername)
      setfusername("")
      setloading(true)
      const response = await fetch("https://hodobackend.onrender.com/forgetpassword", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fusername })
      })

      const json = await response.json()
      if (json.success) {
        setloading(false)
        setforgot(false)
      }
      else if (!json.success) {
        // console.log(json)
        setloading(false)
        alert(json.message)
      }
    }
  }

  const handlelogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setlogindata((data) => {
      return { ...data, [name]: value }
    })
  }
  const handlesignup = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setuserdata((data) => {
      return { ...data, [name]: value }
    })
  }

  const handlenewuser = (e) => {
    e.preventDefault()
    setshow(!show)
  }
  const handlealreadyuser = (e) => {
    e.preventDefault()
    setshow(!show)
  }

  const handleloginsubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    const response = await fetch("https://hodobackend.onrender.com/register/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ logindata })
    })

    const json = await response.json()

    if (!json.success) {
      setloading(false)
      alert(json.message);
    }

    else {
      setloading(false)
      localStorage.setItem('token', json.token)
      localStorage.setItem('username', logindata.username)
      navigate(`/hodo`,
        {
          state: {
            username: localStorage.getItem("username")
          }
        })
    }
  }
  const handlesign = async (e) => {
    // console.log("data : ", userdata);

    e.preventDefault();
    setloading(true)
    const response = await fetch("https://hodobackend.onrender.com/register/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userdata }),
    })

    const json = await response.json()

    if (!json.success) {
      setloading(false)
      alert(json.message);
    }

    else {
      setloading(false)
      localStorage.setItem('token', json.token)
      localStorage.setItem('username', userdata.username)
      navigate('/hodo');
    }

  }

  return (
    <div className="logincont w-100 p-0">
      <div className="loginpage container-fluid mx-auto text-center p-0 " >
        <div className={!loading ? "row register position-relative justify-content-around align-items-center mx-auto my-auto p-md-4 p-sm-4 p-3 bg bg-transparent " : "d-none"} >
          <div className={show && !forgot ? "col-xl-4 col-lg-4 col-md-5 col-sm-7 col-12 login d-flex flex-column justify-content-center py-3 text-center show rounded-2 bg bg-white " : "d-none"}>
            <img src={logo} width={90} height={70} className='mx-auto bg-transparent' alt="" />
            <h1 className='fs-sm-1 fs-1'>Welcome back!</h1>
            <input className='my-md-2 my-sm-2 mt-2 mb-1 fs-sm-5 fs-6 p-2 rounded-2' type="text" name='username' placeholder='username' value={logindata.username} onChange={(e) => handlelogin(e)} />
            <input className='my-md-2 my-sm-2 mt-1 mb-2 fs-sm-5 fs-6 p-2 rounded-2' type="password" name='password' placeholder='password' value={logindata.password} onChange={(e) => handlelogin(e)} />
            <div
              className="d-flex justify-content-between align-items-center mb-lg-4 mb-0 "
            >
              <div>
                <Link href="/" onClick={(e) => handlenewuser(e)} ref={ref} className=" text-decoration-none text-primary fs-6">New user</Link>
              </div>
              <div>
                <Link href="/" className=" text-decoration-none text-primary fs-6" onClick={() => setforgot(true)}>Forgot password?</Link>
              </div>
            </div>
            <button className='w-50 mx-auto rounded-5 bg bg-primary text-white fs-sm-4 fs-5 mt-0' onClick={(e) => handleloginsubmit(e)}>Login</button>
            <button className='w-100 mx-auto rounded-1 py-1 fs-sm-5 fs-4 mt-4' ><GoogleIcon className='pb-1' sx={{ fontSize: 35 }} />  Login with Google</button>
          </div>

          <div className={!show && !forgot ? "col-xl-4 col-lg-5 col-md-6 col-sm-7 col-12 signup d-flex flex-column justify-content-center py-3 text-center show rounded-2 bg bg-white " : "d-none"} >
            <h3 className='fs-sm-1 fs-3'>Welcome to HODO family</h3>
            <input className='mt-md-3 mt-2 fs-sm-5 fs-6 p-2 rounded-2' type="text" name='name' placeholder='Full Name' value={userdata.name} onChange={(e) => handlesignup(e)} />
            <input className='mt-md-3 mt-2 fs-sm-5 fs-6 p-2 rounded-2' type="text " name='username' placeholder='username' value={userdata.username} onChange={(e) => handlesignup(e)} />
            <input className='mt-md-3 mt-2 fs-sm-5 fs-6 p-2 rounded-2' type="text" name='email' placeholder='email' value={userdata.email} onChange={(e) => handlesignup(e)} />
            <input className='mt-md-3 mt-2 fs-sm-5 fs-6 p-2 rounded-2' type="password" name='password' placeholder='password' value={userdata.password} onChange={(e) => handlesignup(e)} />
            <div
              className="d-flex justify-content-between align-items-center mb-lg-2 mb-1"
            >
              <a href="#!" onClick={(e) => handlealreadyuser(e)} ref={ref} className=" text-decoration-none text-primary mb-0  fs-6">already have an account?</a>
            </div>
            <button className='w-50 mx-auto rounded-5 bg bg-primary text-white fs-sm-4 fs-5 mt-2' onClick={(e) => handlesign(e)}>Sign up</button>
            <button className='w-100 mx-auto rounded-1 py-1 fs-sm-5 fs-4 mt-4' ><GoogleIcon className='pb-1' sx={{ fontSize: 35 }} />  Login with Google</button>
          </div>

          <div className={forgot ? "col-xl-4 col-lg-5 col-md-6 col-sm-7 col-12 signup d-flex flex-column justify-content-center py-3 text-center show rounded-2 bg bg-white mt-5" : "d-none"}>
            <img src={care} width={120} height={100} className='mx-auto  rounded-5 my-3' alt="" />
            <input className='rounded-1 px-2 py-1' type="text" placeholder='Enter username' name="fusername" value={fusername} onChange={(e) => setfusername(e.target.value)} />
            <button className='mt-3 w-25 text-white rounded-2 mx-auto bg bg-primary' onClick={() => handleforgot()} >Forgot</button>
            <button className=' w-25 text-primary bg bg-transparent' onClick={() => setforgot(false)} >Back</button>
          </div>

        </div>
        <div className={loading ? "row loader w-100 p-0 m-0 opacity-50 d-flex justify-content-center gap-0 align-items-center text-dark" : "d-none"}>
          <div className="load m-0"></div>
        </div>
      </div >

      <div className="svgs position-absolute top-0">
        <svg width="100vw" height="100vh" viewBox="0 0">
          <path className='d-md-inline d-none' stroke='orange' fill='orange' d="M0,0 C150,500 400,200 600,735 H0 V0"></path>
          <circle className='circles' cx={1300} cy={150} r={40} fill='orange'></circle>
          <circle className='circles' cx={320} cy={10} r={40} fill='orange'></circle>
          <circle className='circles' cx={370} cy={250} r={40} fill='orange'></circle>
          <circle className='circles' cx={1200} cy={500} r={80} fill='orange' opacity={0.5}></circle>
          <circle className='circles' cx={900} cy={170} r={60} fill='orange' opacity={0.5}></circle>
          <circle className='circles' cx={700} cy={650} r={70} fill='orange' opacity={0.8}></circle>
          {/* <circle className='circles' cx={520} cy={450} r={30} fill='orange' opacity={0.5}></circle> */}
          <circle className='circles' cx={100} cy={300} r={60} fill='orange' opacity={0.5}></circle>
          <circle className='circles' cx={300} cy={500} r={70} fill='orange' opacity={0.8}></circle>
          <circle className='circles' cx={30} cy={670} r={70} fill='orange' opacity={0.4}></circle>
          <circle className='circles' cx={30} cy={50} r={70} fill='orange' opacity={0.6}></circle>
        </svg>
      </div>
    </div>
  )

}

