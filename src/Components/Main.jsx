import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Poster from './Poster'
import logo from '../Photos/c6.jpg'
import PlaceIcon from '@mui/icons-material/Place';
import CreateIcon from '@mui/icons-material/Create';
export default function Main() {
  let navigate = useNavigate()
  const [Friends, setFriends] = useState([])
  const [loading, setloading] = useState(false)
  const [nofrnds, setnofrnds] = useState(false)
  const [actives, setactives] = useState([])
  const [nears, setnears] = useState([])
  const [fnames, setfnames] = useState([])
  const [location, setlocation] = useState({})
  const owner = localStorage.getItem("username")

  const getuserdata = async () => {
    setloading(true)
    const response = await fetch("http://localhost:8080/user/userdata", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'authorisation': `bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ username: owner })
    })

    const json = await response.json()
    if (json.success) {
      // console.log(json)
      if (json.user.friends.length === 0) {
        console.log("nofriends")
        setloading(false)
        setnofrnds(true)
      }
      else {
        setloading(false)
        setFriends(json.user.friends)
        let names = json.user.friends.map((item) => item.Username)
        setfnames(names)
      }
    }
    else if (!json.success) {
      console.log("no user")
    }
  }

  const getactiveusers = async () => {
    const response = await fetch("http://localhost:8080/activeuser", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'authorisation': `bearer ${localStorage.getItem('token')}`
      }
    })

    const json = await response.json()
    if (json.success) {
      setactives(json.active)
      console.log(json.active)
      getlocation(json.active)
    }
    else if (!json.success)
      console.log("no user")
  }

  const getlocation = async (actives) => {
    let longitude = 0, latitude = 0

    navigator.geolocation.getCurrentPosition(showPosition);
    async function showPosition(position) {
      longitude = position.coords.longitude
      latitude = position.coords.latitude

      const response = await fetch("http://localhost:8080/user/getlocation", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'authorisation': `bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ longitude, latitude, owner: owner })
      })

      const json = await response.json()
      if (json.success) {
        setlocation(json.data)
        getnears(actives, json.data.lon, json.data.lat)
      }
      else
        console.log("error")
    }
  }

  const getnears = async (actives, longitude, latitude) => {
    const response = await fetch("http://localhost:8080/user/getnears", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'authorisation': `bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ actives, longitude, latitude, owner })
    })

    const json = await response.json()
    if (json.success) {
      console.log(json)
      setnears(json.data)
    }
  }

  useEffect(() => {
    getuserdata()
    getactiveusers()
  }, [])
  return (
    <div className="main2 mt-2 container-fluid p-0 m-0">

      <div className="row w-100 p-0 m-0">
        <div className="userinfo col-lg-3 col-4 d-md-inline d-none border border-dark pt-2 px-0">

          <span className="w-100 px-1 rounded-2 bg bg-white d-block text-center mt-4"><h5>Active users in your nearby location</h5> </span>
          <h6 className='w-100 m-0 p-0 '><PlaceIcon className='m-0 p-0' />{location.state}</h6>
          <div className="actives mt-3">
            {nears.map((item, i) => <li key={i} className='d-block p-0 ps-2 my-2 fs-4 rounded-3 bg bg-white' onClick={() => navigate('/usersprofile', { state: item[0] })}>{item[0]} <span className='ms-5 p-0'>~{item[1]}km</span></li>)}
          </div>

        </div>

        <div className="post col-lg-6 col-md-8 col-sm-10 col-12 mx-auto">
          <Poster />
        </div>

        <div className="chatn d-lg-inline d-none col-3">
          <input type="text" name="search" placeholder="search friends" className=" ps-2 w-100 bg bg-white rounded-4 mt-2 mx-0" />
          <div className="activefriends mt-2 ">
            {Friends.map((item, i) => item.Username !== owner && actives.includes(item.Username) ? <li key={i} className=' p-1 fs-4 w-100 text-start d-inline'>  <img className='border border-success border-3 rounded-5' src={"http://localhost:8080/Images/" + item.image} width={40} height={40} alt="" onClick={() => navigate('/chat', { state: item.Username })} /></li> : null)}

          </div>
          <ul className={!loading && !nofrnds ? "p-1 mt-0 " : "d-none"}>
            {

              Friends.map((item, i) => {
                return (<li key={i} className="text-dark cursor-pointer ms-1 my-2 p-1 bg bg-white rounded-2 px-2 d-flex flex-row" onClick={() => navigate('/chat', { state: item.Username })} >
                  <img src={"http://localhost:8080/Images/" + item.image} width={50} height={50} className=" rounded-5 me-2" alt="" />
                  <section className="details cursor-pointer p-0">
                    {item.Username}
                    <span className="opacity-75 d-block fs-6 m-0">
                      Tap to chat</span>
                  </section>
                </li>
                )
              })
            }
          </ul>

          <section className={!loading && nofrnds ? "h-100 d-flex justify-content-center align-items-center" : "d-none"}>
            <h3 className="opacity-50">Connect Friends to Chat</h3>
          </section>

          <section className={loading ? "h-100 d-flex justify-content-center align-items-center" : "d-none"}>
            <h4 className="mx-auto opacity-75">Loading chats...</h4>
          </section>

        </div>

        <span className="material-symbols-outlined newpost position-fixed bottom-4 bg bg-white rounded-3 p-1" onClick={() => navigate('/newpost')}>
          <h4 className='m-0'>Add a post <CreateIcon className='p-0 m-0' sx={{ fontSize: 30 }} /></h4>
        </span>
      </div>
    </div>
  )
}
