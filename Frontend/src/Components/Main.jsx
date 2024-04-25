import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Poster from './Poster'
import usericon from '../Photos/bg1.png'
import PlaceIcon from '@mui/icons-material/Place';
import EditIcon from '@mui/icons-material/Edit';

import { Locationcontext } from '../App';
export default function Main() {
  let navigate = useNavigate()
  const [Friends, setFriends] = useState([])
  const [loading, setloading] = useState(false)
  const [nofrnds, setnofrnds] = useState(false)
  const [fnames, setfnames] = useState([])
  const { actives, nears, location } = useContext(Locationcontext)
  const owner = localStorage.getItem("username")

  const getuserdata = async () => {
    setloading(true)
    const response = await fetch("https://hodobackend.onrender.com/user/userdata", {
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
      // console.log("no user")
    }
  }


  useEffect(() => {
    getuserdata()
  }, [])
  return (
    <div className="main2 mt-2 container-fluid p-0 m-0 position-relative">

      <div className="position-fixed bottom-0 end-0 me-4 mb-5 adddpost text-white px-2 text-primary fs-2 rounded-2 d-md-block d-none" onClick={() => navigate('/newpost')}>
        Add a post <EditIcon className='fs-1 pb-1' />
      </div>

      <div className={!loading ? "row w-100 p-0 m-0" : "d-none"}>
        <div className="userinfo col-lg-3 col-4 d-md-inline d-none border border-dark pt-2 px-0 bg bg-white">

          <span className="w-100 px-1 rounded-2 bg bg-white d-block text-center mt-4"><h5>Active users in your nearby location</h5> </span>
          <h6 className='w-100 m-0 p-0'><PlaceIcon className='m-0 p-0 text-success' />{location.state}</h6>
          <div className="actives mt-3">
            {nears.map((item, i) => <li key={i} className='d-block p-0 ps-2 my-2 fs-4 rounded-3 bg bg-white' onClick={() => navigate('/usersprofile', { state: item[0] })}>{item[0]} <span className='ms-5 p-0'>~{item[2]}km</span></li>)}
          </div>

        </div>

        <div className=" col-lg-6 col-md-8 col-sm-10 col-12 mx-auto mb-5">
          <Poster />
        </div>

        <div className="chatn d-lg-inline d-none col-3 bg bg-white">
          <input type="text" name="search" placeholder="search friends" className=" fs-5 ps-2 w-100 bg bg-white rounded-4 mt-2 mx-0" />
          <div className="activefriends mt-2 ">
            {Friends.map((item, i) => item.Username !== owner && actives.includes(item.Username) ? <li key={i} className=' p-1 fs-4 w-100 text-start d-inline'>  <img className='border border-success border-3 rounded-5' src={"https://hodobackend.onrender.com/Images/" + item.image} width={40} height={40} alt="" onClick={() => navigate('/chat', { state: item.Username })} /></li> : null)}

          </div>
          <ul className={!loading && !nofrnds ? "p-1 mt-0 " : "d-none"}>
            {

              Friends.map((item, i) => {
                return (<li key={i} className="text-dark cursor-pointer frnditem ms-1 my-2 p-1  rounded-2 px-2 d-flex flex-row" onClick={() => navigate('/chat', { state: item.Username })} >
                  {item.image !== "" ? <img src={"https://hodobackend.onrender.com/Images/" + item.image} width={50} height={50} className=" rounded-5 me-2" alt="" /> : <img src={usericon} width={50} height={50} className=" rounded-5 me-2" alt="" />}
                  <section className="details cursor-pointer p-0 fs-5">
                    <h5 className='m-0'>{item.Username} </h5>
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
      </div>
      <div className={loading ? "row loader w-100 p-0 m-0 opacity-50 d-flex justify-content-center align-items-center text-dark" : "d-none"}>
        <div className="load m-0"></div>
        <h5 className='text-center'>Please wait</h5>
      </div>
    </div>
  )
}
