import React, { useEffect, useRef, useState } from "react";
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
    const chatref = useRef(null)


    const owner = localStorage.getItem("username")
    let received = false
    const navigate = useNavigate()

    const handleselect = async (item) => {
        // console.log(item)
        setSelected(item)
        setdisplay(true)
        const request = await fetch("https://hodobackend.onrender.com/chat/fetchchats", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorisation': `bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ user: item, owner: owner })
        })

        const json = await request.json();
        if (json.success) {
            // console.log(json)

            if (!json.nochats) {
                setmessages(json.data.message)
                chatref.current.scrollTop = chatref.current.scrollHeight;
            }
            else {
                setmessages([])
            }
        }
    }

    const handlesent = async () => {
        if (currentMessage !== "") {
            const response = await fetch("https://hodobackend.onrender.com/chat/newmessage", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorisation': `beare ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ message: currentMessage, sender: owner, receiver: currentuser })
            })
            const json = await response.json()
            if (json.success) {
                setmessages((data) => {
                    return [...data, json.message]
                })
                setCurrentMessage("")
                sendMessage(json.message)
                chatref.current.scrollTop = chatref.current.scrollHeight;
            }
        }

    };

    const sendMessage = async (message) => {
        try {
            socket.emit("message", { message: message, username: currentuser, owner: localStorage.getItem("username") });
        }
        catch (e) {
            console.log(e)
        }
    };


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
            // console.log(json.active)
            setactives(json.active)
        }
    }

    const receiveMessage = (data) => {
        if (!received) {
            received = true;
            // console.log(currentuser)
            setmessages((prev) => {
                return [...prev, data.message]
            })
        }
        else
            received = false
    };


    useEffect(() => {
        socket.on("receive", receiveMessage);
    }, [socket]);


    useEffect(() => {
        // console.log("got started")

        socket.emit("setup", { username: localStorage.getItem("username") })
        getuserdata()
        getactiveusers()

        const state = location.state
        if (state)
            handleselect(state)
    }, [])

    return (

        <div className="container-fluid chatpage p-0">
            <div className="navbar m-0 p-0 d-md-inline d-none w-100"><Navbar /></div>
            <div className="row justify-content-start chatrow  p-0 m-0">
                <div className="col-lg-3 col-4 d-md-inline d-none friends pb-0">
                    <input type="text" name="search" placeholder="search friends" className=" ps-2 w-100  bg bg-white rounded-4 mt-2" />
                    <ul className={!loading && !nofrnds ? "p-1 mt-4 friendsul" : "d-none"}>
                        {

                            Friends.map((item) => {
                                return (<li key={item} className={actives.includes(item) ? "text-dark cursor-pointer ms-1 my-2 p-1  rounded-2 px-2 d-flex flex-row active frnditem" : "text-dark cursor-pointer ms-1 my-2 p-1 rounded-2 px-2 d-flex flex-row frnditem"} onClick={() => handleselect(item.Username)}>
                                    {item.image !== "" ? <img src={"https://hodobackend.onrender.com/Images/" + item.image} width={50} height={50} className=" rounded-5     me-2" alt="" /> : <img src={usericon} width={50} height={50} className=" rounded-5     me-2" alt="" />}
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
                        <h4 className="mx-auto opacity-75">Loading chats...</h4>
                    </section>
                </div>
                <div className={"col-lg-9 col-md-8 col-12 chatting d-flex flex-column position-relative justify-content-between p-0"}>
                    <div className={display ? "header py-1 px-1 d-flex justify-content-start align-items-center position-sticky top-0 w-100" : "d-none"}>
                        <button className="fs-5 bg bg-transparent border-none p-0 mx-2 d-md-none" onClick={() => navigate('/friends')}><ArrowBackIcon sx={{ fontSize: 35 }} /></button>
                        <img src={logo} width={40} height={40} alt="" className=" me-2 rounded-5" />
                        <button onClick={() => navigate('/usersprofile', { state: currentuser })} className="d-inline text-decoration-none text-black fs-5 bg bg-transparent border-none p-0 ">{currentuser}</button>
                        <button className={display ? "ms-auto fs-5 bg bg-transparent border-none p-0 mx-2 d-md-inline d-none" : "d-inline"} onClick={() => setdisplay(false)}><CloseIcon sx={{ fontSize: 35 }} /></button>
                    </div>
                    <div className={display ? "messages" : "d-none"} ref={chatref}>
                        {
                            messages.map((item, i) => {
                                return (
                                    <Messagebox key={i} message={item.Text} seen={item.seen} time={item.time} sender={item.sender} owner={owner} />
                                )
                            })
                        }
                    </div>
                    <div className={display ? "messenger pb-1 position-sticky bottom-0 text-start m-0 p-0 d-flex align-items-center w-100" : "d-none"} >
                        <input type="text" placeholder="type message here..." className="w-75 bg bg-white rounded-4 ms-2 px-2 mt-0 mb-0 " value={currentMessage} onChange={(event) => setCurrentMessage(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter")
                                    handlesent()

                            }} />
                        <button className="bg bg-transparent" onClick={() => handlesent()}> <SendIcon className="   p-0" sx={{ fontSize: 30 }} /></button>
                    </div>
                    <div className={!display ? "d-block text-center fs-2 opacity-75 my-auto" : "d-none"}>Tap on friends list to chat</div>
                </div>

            </div>
        </div >
    );
}

export default Chat;
