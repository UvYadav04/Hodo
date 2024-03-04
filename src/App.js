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
import Privacy from './Components/Privacy.jsx';
import Auth from './Screens.jsx/Auth.jsx';
import Profile from './Screens.jsx/Profile.jsx';
import Home from './Screens.jsx/Home.jsx'
import SWR from './Screens.jsx/SWR.jsx';

function App() {
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

        </Routes>
      </Router>
    </>
  );
}

export default App;
