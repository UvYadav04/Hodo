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
import { useEffect, useState } from 'react';
const socket = io.connect("http://localhost:3001")

function App() {

  useEffect(() => {
    socket.emit("setup", { username: localStorage.getItem("username") })
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
    <>
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
