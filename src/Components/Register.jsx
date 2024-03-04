import React, { useState } from 'react'
import cover from '../Photos/cover.jpg'
import { useNavigate } from "react-router-dom"
const ref = React.createRef()
export default function Login() {
  const [logindata, setlogindata] = useState({ username: "", password: "" })
  const [userdata, setuserdata] = useState({ username: "", password: "", name: "", email: "" })
  const navigate = useNavigate()
  const [leftposition, setleftposition] = useState(true)
  // console.log(logindata);
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
    setleftposition(false)
  }
  const handlealreadyuser = (e) => {
    e.preventDefault()
    setleftposition(true)
  }

  const handleloginsubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/register/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ logindata })
    })

    const json = await response.json()

    if (!json.success)
      alert(json.message);

    else {
      localStorage.setItem('token', json.token)
      localStorage.setItem('username', logindata.username)
      navigate('/hodo');
    }
  }
  const handlesign = async (e) => {
    // console.log("data : ", userdata);

    e.preventDefault();
    const response = await fetch("http://localhost:8080/register/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userdata }),
    })

    const json = await response.json()

    if (!json.success)
      alert(json.message);

    else {
      alert("registered successfully")
      localStorage.setItem('token', json.token)
      localStorage.setItem('username', userdata.username)
      navigate('/hodo');
    }

  }



  return (
    <div className="register ">

      <div class={leftposition ? "overlay cover-right " : "overlay cover-left "} ref={ref}>
        <img src={cover} class="image-overlay" alt="Overlay Image" />
      </div>
      <section className="vh-100">
        <div className="container-fluid full">
          <div className="row d-flex justify-content-around align-items-center flex-row-reverse py-5">

            <div className="col-md-8 col-lg-6 col-xl-4 py-3 left-login-card mt-5 rounded-2 ">
              <form>
                <h2 style={{ "textAlign": "center" }} className="mb-4">Login</h2>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="leftForm3Example3"
                    className="form-control form-control-lg"
                    placeholder="username"
                    name="username"
                    value={logindata.username}
                    onChange={(e) => handlelogin(e)}
                  />
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="text"
                    id="leftForm3Example4"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={logindata.password}
                    onChange={(e) => handlelogin(e)}
                  />
                </div>

                <div
                  className="d-flex justify-content-between align-items-center mb-4"
                >
                  <div>
                    <a href="#" onClick={(e) => handlenewuser(e)} ref={ref} className=" text-decoration-none text-primary">New user</a>
                  </div>
                  <div>
                    <a href="#" className=" text-decoration-none text-primary">Forgot password?</a>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary my-3 btn-lg rounded-pill custom-button px-5"
                    onClick={(e) => handleloginsubmit(e)}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 right-login-card  py-3 mt-5 rounded-2">
              <form>
                <h2 style={{ "textAlign": "center" }} className="mb-4">Sign Up</h2>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="rightForm3Example3"
                    className="form-control form-control-lg"
                    placeholder="Full Name"
                    onChange={(e) => handlesignup(e)}
                    name="name"
                    value={userdata.name}
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="rightForm3Example3"
                    className="form-control form-control-lg"
                    placeholder="username"
                    onChange={(e) => handlesignup(e)}
                    name="username"
                    value={userdata.username}
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="rightForm3Example3"
                    className="form-control form-control-lg"
                    placeholder="email"
                    onChange={(e) => handlesignup(e)}
                    name="email"
                    value={userdata.email}
                  />
                </div>
                <div className="form-outline mb-3">
                  <input
                    type="text"
                    id="rightForm3Example4"
                    className="form-control form-control-lg"
                    placeholder="password"
                    onChange={(e) => handlesignup(e)}
                    name="password"
                    value={userdata.password}
                  />
                </div>
                <div
                  className="d-flex justify-content-between align-items-center mb-4"
                >
                  <a href="#!" onClick={(e) => handlealreadyuser(e)} ref={ref} className=" text-decoration-none text-primary">already have an account?</a>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary my-3 btn-lg rounded-pill custom-button px-5"
                    // style="padding-left: 2.5rem; padding-right: 2.5rem"
                    onClick={(e) => handlesign(e)}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className="d-flex bott flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div>

          </div>
        </div>
      </section>

    </div>
  )

}