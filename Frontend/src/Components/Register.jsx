import React, { useState } from 'react'
import covers from '../Photos/covers.jpg'
import cover from '../Photos/cover.jpg'
import logo from '../Photos/logo.jpg'
import { createSearchParams, useNavigate, Link } from "react-router-dom"
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
    <div className="loginpage container-fluid m-0 text-center" style={{
      minHeight: "100vh", maxHeight: "100vh", backgroundColor: "#a8a5a5"
    }} >

      <div className={!loading ? "row register justify-content-around align-items-md-center align-items-start mx-auto bg bg-white" : "d-none"} style={{
        backgroundColor: "beige"
      }}>
        <div className="col-xl-4 col-5 d-lg-inline d-none p-0 ">
          <img src={covers} className='w-100 m-0 rounded-2 h-100 ' alt="" />
        </div>
        <div className={show && !forgot ? "col-xl-4 col-lg-5 col-md-7 col-sm-7 col-10 login d-flex flex-column justify-content-center h-100 text-center show " : "d-none"}>
          <img src={usericon} className='mx-auto w-25 rounded-5' alt="" />
          <h4 className='fs-sm-1 fs-3'>Welcome back!</h4>
          <input className='my-md-3 my-sm-2 my-2 fs-sm-5 fs-6' type="text" name='username' placeholder='username' value={logindata.username} onChange={(e) => handlelogin(e)} />
          <input className='my-md-3 my-sm-2 my-2 fs-sm-5 fs-6' type="password" name='password' placeholder='password' value={logindata.password} onChange={(e) => handlelogin(e)} />
          <div
            className="d-flex justify-content-between align-items-center mb-lg-4 mb-1 "
          >
            <div>
              <Link href="/" onClick={(e) => handlenewuser(e)} ref={ref} className=" text-decoration-none text-primary fs-6">New user</Link>
            </div>
            <div>
              <Link href="/" className=" text-decoration-none text-primary fs-6" onClick={() => setforgot(true)}>Forgot password?</Link>
            </div>
          </div>
          <button className='w-50 mx-auto rounded-5 bg bg-primary text-white fs-sm-4 fs-5 mt-3' onClick={(e) => handleloginsubmit(e)}>Login</button>
        </div>

        <div className={!show && !forgot ? "col-xl-4 col-lg-5 col-md-7 col-sm-7 col-10 signup  d-flex flex-column show text-center justify-content-center h-100" : "d-none"} >
          <h1 className='fs-sm-1 fs-3'>Signup</h1>
          <input className='my-md-3 my-sm-2 my-2 fs-sm-5 fs-6' type="text" name='name' placeholder='Full Name' value={userdata.name} onChange={(e) => handlesignup(e)} />
          <input className='my-md-3 my-sm-2 my-2 fs-sm-5 fs-6' type="text " name='username' placeholder='username' value={userdata.username} onChange={(e) => handlesignup(e)} />
          <input className='my-md-3 my-sm-2 my-2 fs-sm-5 fs-6' type="text" name='email' placeholder='email' value={userdata.email} onChange={(e) => handlesignup(e)} />
          <input className='my-md-3 my-sm-2 my-2 fs-sm-5 fs-6' type="password" name='password' placeholder='password' value={userdata.password} onChange={(e) => handlesignup(e)} />
          <div
            className="d-flex justify-content-between align-items-center mb-lg-2 mb-1"
          >
            <a href="#!" onClick={(e) => handlealreadyuser(e)} ref={ref} className=" text-decoration-none text-primary mb-0  fs-6">already have an account?</a>
          </div>
          <button className='w-50 mx-auto rounded-5 bg bg-primary text-white fs-sm-4 fs-6 mt-4' onClick={(e) => handlesign(e)}>Sign up</button>
        </div>

        <div className={forgot ? "col-xl-4 col-lg-5 col-md-7 col-sm-7 col-10 signup  d-flex flex-column show text-center justify-content-start h-50" : "d-none"}>
          <img src={usericon} className='mx-auto w-25 rounded-5 my-3' alt="" />
          <input type="text" placeholder='Enter username' name="fusername" value={fusername} onChange={(e) => setfusername(e.target.value)} />
          <button className='my-3 w-25 text-white rounded-2 mx-auto bg bg-primary' onClick={() => handleforgot()} >Forgot</button>
        </div>

      </div>
      <div className={loading ? "row loader w-100 p-0 m-0 opacity-50 d-flex justify-content-center gap-0 align-items-center text-dark" : "d-none"}>
        <div className="load m-0"></div>
      </div>
    </div >
  )

}

