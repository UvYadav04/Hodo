import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Register from './Components/Register.jsx'
import Postform from './Components/Postform.jsx'
import cheetah from './Photos/cheetah2.gif'
import deer from './Photos/deer.gif'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Homepage from './Screens/Homepage';
// import '../node_modules/boostrap/'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Privacy from './Components/Privacydocs.jsx';
import Auth from './Screens/Auth.jsx';
import Profile from './Screens/Profile.jsx';
import Home from './Screens/Home.jsx'
import SWR from './Screens/SWR.jsx';
import Usersprofile from './Screens/Usersprofile.jsx';
import Search from './Screens/Search.jsx'
import Chat from './Screens//Chat.jsx'
import io from 'socket.io-client'
import React, { useEffect, useState } from 'react';
import Nearbys from './Screens/Nearbys.jsx';
import Chatlist from './Screens/Chatlist.jsx';
const socket = io.connect("https://hodobackend.onrender.com")

export const Locationcontext = React.createContext()

function App() {
  // **********locatoin area****************

  const [actives, setactives] = useState([])
  const [location, setlocation] = useState({})
  const [nears, setnears] = useState([])
  const owner = localStorage.getItem("username")
  const [loading, setloading] = useState(true)


  const getactiveusers = async () => {
    const response = await fetch("https://hodobackend.onrender.com/activeuser", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'authorisation': `bearer ${localStorage.getItem('token')}`
      }
    })

    const json = await response.json()
    if (json.success) {
      setactives(json.active)
      // console.log(json.active)
      getlocation(json.active)
    }
    // else if (!json.success)
    // console.log("no user")
  }

  const getlocation = async (actives) => {
    let longitude = 0, latitude = 0

    navigator.geolocation.getCurrentPosition(showPosition);
    async function showPosition(position) {
      longitude = position.coords.longitude
      latitude = position.coords.latitude

      const response = await fetch("https://hodobackend.onrender.com/user/getlocation", {
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
    const response = await fetch("https://hodobackend.onrender.com/user/getnears", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'authorisation': `bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ actives, longitude, latitude, owner })
    })

    const json = await response.json()
    if (json.success) {
      // console.log(json)
      setnears(json.data)
    }
  }

  // **********locatoin area****************

  useEffect(() => {
    socket.emit("setup", { username: localStorage.getItem("username") })
    getactiveusers()
    setTimeout(() => {
      setloading(false)
    }, 2000)
  }, [])

  let received = false
  const receiveMessage = (data) => {
    if (!received) {
      received = true;
      alert(`${data.from} sent you a message :\n${data.message.Text}`)
    }
    else
      received = false
  };


  useEffect(() => {
    socket.on("receive", receiveMessage);
  }, [socket]);

  if (loading)
    return (
      <div className={loading ? "homeloader d-flex align-items-center p-0" : "d-none"}>
        <img width={150} height={50} src={cheetah} alt="" />
        <img width={100} height={50} src={deer} alt="" />
      </div>
    )
  else

    return (
      <Locationcontext.Provider value={{ actives, location, nears }}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/hodo' element={<Homepage />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/newpost' element={<Postform />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/error' element={<SWR />} />
            <Route path='/usersprofile' element={<Usersprofile />} />
            <Route path='/search' element={<Search />} />
            <Route path='/chat' element={<Chat socket={socket} />} />
            <Route path='/nearby' element={<Nearbys />} />
            <Route path='/friends' element={<Chatlist socket={socket} />} />
          </Routes>
        </Router>
      </Locationcontext.Provider>
    );
}

export default App;
