import React, { useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import Navbar from "../Components/Navbar";
import Messagebox from "../Components/Messagebox";
import logo from '../Photos/c6.jpg'
import usericon from '../Photos/bg1.png'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
function Chat({ socket }) {

    let location = useLocation()

    const [currentMessage, setCurrentMessage] = useState("");
    const [Friends, setFriends] = useState([])
    const [currentuser, setSelected] = useState("uvyadav")
    const [display, setdisplay] = useState(false)
    const [loading, setloading] = useState(false)
    const [nofrnds, setnofrnds] = useState(false)
    const [messages, setmessages] = useState([])
    const [actives, setactives] = useState([])
    // console.log(currentuser)

    const owner = localStorage.getItem("username")
    let received = false
    const navigate = useNavigate()


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
            setloading(false)
            setFriends(json.user.friends)
            if (json.user.friends.length === 0) {
                setnofrnds(true)
                setloading(false)
            }
        }
        else if (!json.success) {
            setloading(false)
        }
    }


    useEffect(() => {
        socket.emit("setup", { username: localStorage.getItem("username") })
        getuserdata()
    }, [])

    return (
        <div className="friendslist mx-auto border border-black d-flex flex-column justify-content-start px-2">
            <div className="search">
                <button className="mb-2 bg bg-transparent" onClick={() => navigate('/hodo')}><ArrowBackIcon sx={{ fontSize: 33 }} className="bg-transparent pb-1" /></button>
                <input type="text" name="search" placeholder="search friends" className="w-75 ps-2 ms-2 bg bg-white rounded-4 mt-2" />
            </div>
            <ul className={!loading && !nofrnds ? "p-1 mt-2 friendsul" : "d-none"}>
                {
                    Friends.map((item) => {
                        return (<li key={item} className={actives.includes(item) ? "text-dark cursor-pointer ms-1 my-0 p-1 bg bg-white rounded-2 px-2 d-flex flex-row active" : "text-dark cursor-pointer ms-1 my-2 p-1 bg bg-white rounded-2 px-2 d-flex flex-row"} onClick={() => navigate('/chat', { state: item.Username })}>
                            {item.image !== "" ? <img src={"https://hodobackend.onrender.com/Images/" + item.image} width={50} height={50} className=" rounded-5 me-2" alt="" /> : <img src={usericon} width={50} height={50} className=" rounded-5     me-2" alt="" />}
                            <section className="details cursor-pointer">
                                {item.Username}
                                <span className="opacity-75 d-block fs-6">
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
                <h4 className="mx-auto opacity-75">Loading...</h4>
            </section>
        </div>
    );
}

export default Chat;
