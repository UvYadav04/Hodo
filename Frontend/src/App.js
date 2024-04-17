import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Register from './Components/Register.jsx'
import Postform from './Components/Postform.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Homepage from './Screens.jsx/Homepage';
// import '../node_modules/boostrap/'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Privacy from './Components/Privacydocs.jsx';
import Auth from './Screens.jsx/Auth.jsx';
import Profile from './Screens.jsx/Profile.jsx';
import Home from './Screens.jsx/Home.jsx'
import SWR from './Screens.jsx/SWR.jsx';
import Usersprofile from './Screens.jsx/Usersprofile.jsx';
import Search from './Screens.jsx/Search.jsx'
import Chat from './Screens.jsx//Chat.jsx'
import io from 'socket.io-client'
import React, { useEffect, useState } from 'react';
import Nearbys from './Screens.jsx/Nearbys.jsx';
import Chatlist from './Screens.jsx/Chatlist.jsx';
const socket = io.connect("https://hodobackend.onrender.com")

export const Locationcontext = React.createContext()

function App() {
  // **********locatoin area****************

  const [actives, setactives] = useState([])
  const [location, setlocation] = useState({})
  const [nears, setnears] = useState([])
  const owner = localStorage.getItem("username")

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
    else if (!json.success)
      console.log("no user")
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
