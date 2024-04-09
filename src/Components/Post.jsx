import React, { useEffect, useMemo, useReducer, useState } from 'react'
import c1 from '../Photos/c1.jpg'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Commentor from './Commentor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client'
const socket = io.connect(`http://localhost:3001`, {
})


export default function Post({ image, Tags, likes, description, username, id, Comments, date }) {
    let navigate = useNavigate()
    const [like, setlike] = useState(likes.length)
    const [liked, setliked] = useState(false)
    const [commented, setcommented] = useState(false)
    const [newcomment, setnewcomment] = useState("")
    const [tags, settags] = useState({})
    const [cuser, setcuser] = useState([])
    const [comments, setcomments] = useState([])
    const user = localStorage.getItem('username')
    const [following, setfollowing] = useState(false)
    const [follower, setfollower] = useState(false)
    const [time, settime] = useState("...")

    const handletime = () => {
        let d = new Date().getTime()
        let f = parseInt(date)
        const T = d - f;

        const Y = Math.floor(T / (1000 * 60 * 60 * 24 * 365));
        if (Y !== 0) {
            settime(Y + "y")
            return
        }
        const M = Math.floor(T / (1000 * 60 * 60 * 24 * 31));
        if (M !== 0) {
            settime(M + "months")
            return
        }
        const D = Math.floor(T / (1000 * 60 * 60 * 24));
        if (D !== 0) {
            settime(D + "d")
            return
        }
        const H = Math.floor(T / (1000 * 60 * 60));
        if (H !== 0) {
            settime(H + "h")
            return
        }
        const m = Math.floor(T / (1000 * 60));
        if (m !== 0) {
            settime(m + "min")
            return
        }
        const S = Math.floor(T / (1000));
        if (S !== 0) {
            settime(S + "s")
            return
        }

    }

    const getuserdata = async () => {
        const response = await fetch("http://localhost:8080/user/userdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorisation': `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ username: user })
        })

        const json = await response.json()
        if (json.user.Following.includes(username))
            setfollowing(true)
        if (json.user.Followers.includes(username))
            setfollower(true)
    }

    const handlelikes = async () => {
        if (!liked) {
            setlike(like + 1)
            setliked(true)
            const response = await fetch("http://localhost:8080/update/like", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorisation': `bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ user, id })
            })

            const json = await response.json()
            if (json.success) {
                const newlike = json.data.p.likes
                setlike(newlike.length)

            }
            else if (!json.success)
                alert("something went wrong")

        }
        else if (liked) {
            setlike(like - 1)
            setliked(false)
            const response = await fetch("http://localhost:8080/update/unlike", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorisation': `bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ user, id })

            })
            const json = await response.json()
            if (json.success) {
                const newlike = json.data.q.likes
                setlike(newlike.length)
            }
            else if (!json.success)
                alert("something went wrong")
        }
    }

    const handlecomment = async () => {
        if (newcomment === "")
            return
        const response = await fetch("http://localhost:8080/update/comment/add", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorisation': `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ user, newcomment, id })
        })

        const json = await response.json()
        if (json.success) {
            setcuser(json.data.q.comment.users)
            setnewcomment(" ")
            setcomments(json.data.q.comment.comment)
        }
        else if (!json.success)
            alert("something went wrong")
    }


    const handledelete = async (item, index) => {
        const response = await fetch("http://localhost:8080/update/comment/delete", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorisation': `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ username, item, index, id })
        })
        const json = await response.json()
        if (json.success) {
            setcuser(json.data.comment.users)
            setcomments(json.data.comment.comment)
        }
        else if (!json.success)
            alert("something went wrong")

    }

    const handleshare = async (text) => {
        if ('clipboard' in navigator) {
            alert("link copied")
            return await navigator.clipboard.writeText(text);
        } else {
            alert("link copied")
            return document.execCommand('copy', true, text);
        }
    }

    const handleuser = () => {
        navigate('/usersprofile', { state: username })
    }

    const handlefollow = async () => {

        if (!following) {
            const response = await fetch("http://localhost:8080/follow/new", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorisation': `bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ username, owner: user })
            })
            const json = await response.json()
            if (json.success) {
                setfollowing(true)
                socket.emit("newfollow", { user: username, owner: user })
            }
            else if (!json.success)
                alert("something went wrong")
        }

        if (following) {
            const response = await fetch("http://localhost:8080/follow/following", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorisation': `bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ username, owner: user })
            })
            const json = await response.json()
            if (json.success) {
                setfollowing(false)
            }
            else if (!json.success)
                alert("something went wrong")
        }

    }

    useEffect(() => {
        // console.log("effect seen somewhere  ")
        let tag = JSON.parse(Tags)
        let tag2 = Object.values(tag)
        settags(tag2)
        setcuser(Comments.users)
        setcomments(Comments.comment)
        // console.log(Comments.comment)
        if (likes.includes(user))
            setliked(true)
        getuserdata()
        handletime()
    }, [])


    return (
        <div className="post p-0 container text-center">
            <div className="row user m-0 p-0 justify-content-start align-items-center mb-0 ps-sm-1 ps-0 pb-0  ">
                <div className="col-auto logo p-0">
                    <img src={c1} alt="" width={40} height={40} />
                </div>
                <div className="col-auto p-0 text-start font-weight-bold">
                    <button className='mx-1 text-decoration-none text-black fs-5 font-weight-bold h-auto m-0 p-0 bg bg-transparent' onClick={() => handleuser()}>{username}</button>
                </div>
                <div className="col-auto fs-6 text-start opacity-75">
                    {time} ago
                </div>
                <div className=" col-1 text-center ">
                    <button className={user !== username && !following ? 'd-inline text-decoration-none border border-primary bg bg-primary text-white rounded-3' : "d-none"} onClick={() => handlefollow()} >Follow+</button>
                    <button className={user !== username && following ? 'd-inline text-decoration-none border border-primary bg bg-primary text-white rounded-3' : "d-none"} onClick={() => handlefollow()} >Following</button>
                    {/* <button className={user !== username && following && follower ? 'd-inline text-decoration-none border border-primary bg bg-primary text-white rounded-3' : "d-none"} >Message</button> */}
                </div>
            </div>

            <div className="row r2 tags justify-content-start p-0 m-0 text-primary ">
                <div className="col-auto mt-2">
                    <ul className="d-inline p-0 m-0 d-flex flex-row flex-nowrap gap-3">
                        {tags.length > 0 ?
                            tags.map((item, i) => {
                                return (
                                    item.length > 0 ? <li key={i} >#{item}</li> : null
                                )

                            })
                            : null
                        }
                    </ul>
                </div>
            </div>

            {/* <hr className='m-0' /> */}

            <div className="row desc justify-content-start m-0">
                <div className="col-12 text-start m-0">
                    <p className='m-0 fs-6'>
                        {description}
                    </p>
                </div>
            </div>

            <div className="row photo px-0 justify-content-center m-0">
                <div className="col-12 text-center w-100 px-0 py-2 ">
                    <img src={"http://localhost:8080/Images/" + image} className="d-block " alt="..." />
                </div>
            </div>


            <div className="row r4 like justify-content-around mt-2 mb-0">
                <div className="col-10 d-flex justify-content-between align-content-start">
                    <button className={!liked ? "text-decoration-none text-danger px-2 border border-none bg bg-transparent rounded-0 " : "d-none"} onClick={() => handlelikes()}><FavoriteBorderIcon /> {like} </button>
                    <button className={liked ? "text-decoration-none text-danger px-2 border border-none bg bg-transparent   rounded-0" : "d-none"} onClick={() => handlelikes()}><FavoriteOutlinedIcon /> {like} </button>
                    <button className="text-decoration-none text-primary px-2  border border-none bg bg-transparent  rounded-0 " onClick={() => setcommented(!commented)}>Comment <ChatOutlinedIcon /></button>
                    <button className="text-decoration-none text-primary px-2 border border-none bg bg-transparent    rounded-0" onClick={() => handleshare(window.location.href)}>Share <ShareOutlinedIcon />    </button>
                </div>
            </div >

            <div className={commented ? "row justify-content-center Commentss mt-2 mb-0 m-0" : "d-none"}>
                <div className="col-10 first rounded-2 p-1">
                    {/* <Commentor cuser={cuser} comment={comments} deleter={((item, i) => handledelete(item, i))} /> */}
                    <div className=" p-2 m-2 container commentsection m-0">
                        {cuser.length > 0 ? cuser.map((item, i) => {
                            return (
                                <div className="row user justify-content-start comment p-1 mb-2 rounded-2 " key={i}>
                                    <div className="col-12 text-start">
                                        <img src={c1} width={30} height={30} className='d-inline rounded-5' alt="" />
                                        <button className='d-inline bg bg-transparent font-weight-bold text-primary mx-3 my-0'>{item}</button>
                                        <button className={user === item ? "d-inline w-auto delete bg bg-transparent " : "d-none"} onClick={() => handledelete(comments[i], i)}><DeleteIcon sx={{ color: 'red' }} /> </button>
                                    </div>
                                    <div className="col-11 text-start offset-1 ">
                                        {comments[i]}
                                    </div>
                                </div>
                            )
                        }) : null}
                    </div>


                </div>
            </div>
            <div className={commented ? "row justify-content-center m-0 " : "d-none"}>
                <span className="addcmnt mt-1">
                    <input className='px-2 py-0 mx-3 rounded-5 w-75' type="text" name="newcomment" value={newcomment} onChange={(e) => setnewcomment(e.target.value)} placeholder="Add a new comment here" />
                    <button className="text-decoration-none bg bg-primary rounded-2 text-white  fs-5" onClick={() => handlecomment()}>Comment</button>
                </span>
            </div>
            <hr />
        </div >

    )
}
