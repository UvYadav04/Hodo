import React, { useEffect, useState } from 'react'
import c1 from '../Photos/c1.jpg'
import c2 from '../Photos/c2.jpg'
import c3 from '../Photos/c3.jpg'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import axios from 'axios'
import Commentor from './Commentor';

export default function Post({ image, Tags, likes, description, username, id, Comments }) {
    // console.log(likes)
    const [like, setlike] = useState(likes.length)
    const [liked, setliked] = useState(false)
    const [commented, setcommented] = useState(false)
    const [newcomment, setnewcomment] = useState("")
    const [tags, settags] = useState({})
    const [upcomment, setupcomment] = useState({})
    const user = localStorage.getItem('username')
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
            // console.log(data.data.p.likes)
            const newlike = json.data.p.likes
            setlike(newlike.length)

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
            // console.log(data.postdata.q.likes)
            const newlike = json.data.q.likes
            setlike(newlike.length)

        }
    }

    const handlecomment = async () => {
        const response = await fetch("http://localhost:8080/update/comment/add", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorisation': `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ user, newcomment, id })
        })

        const json = await response.json()
        console.log(json)
        setupcomment(json.data.q.comment)
    }

    useEffect(() => {
        let tag = JSON.parse(Tags)
        let tag2 = Object.values(tag)
        settags(tag2)
        console.log(`commented : `, Comments)
        setupcomment(Comments)
        if (likes.includes(user))
            setliked(true)
    }, [])

    return (
        <div className="post p-0 container text-center">

            <div className="row user m-0 p-3 justify-content-start align-items-center mb-0 pb-0">
                <div className="col-auto logo p-0">
                    <img src={c1} alt="" width={40} height={40} />
                </div>
                <div className="col-auto text-start font-weight-bold">
                    {username}
                </div>
                <div className="col-auto fs-5 text-start opacity-75">
                    4w.ago
                </div>
                <div className=" col-1 text-center">
                    <button className='d-inline text-decoration-none border border-primary bg bg-primary text-white rounded-3'>Follow+</button>
                </div>
            </div>

            <div className="row r2 tags justify-content-start p-0 m-0 text-primary ">
                <div className="col-auto mx-3 mt-2">
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
                    <p className='m-0 px-3 fs-6'>
                        {description}
                    </p>
                </div>
            </div>

            <div className="row photo px-3 justify-content-center m-0">
                <div className="col-auto text-center w-100 p-2">
                    <img src={"http://localhost:8080/Images/" + image} className="d-block " alt="..." />
                </div>
            </div>


            <div className="row r4 like justify-content-around mt-2 mb-0">
                <div className="col-10 d-flex justify-content-between align-content-start">
                    <button className={!liked ? "text-decoration-none text-danger px-2 border border-none bg bg-transparent rounded-0 " : "d-none"} onClick={() => handlelikes()}><FavoriteBorderIcon /> {like} </button>
                    <button className={liked ? "text-decoration-none text-danger px-2 border border-none bg bg-transparent   rounded-0" : "d-none"} onClick={() => handlelikes()}><FavoriteOutlinedIcon /> {like} </button>
                    <button className="text-decoration-none text-primary px-2  border border-none bg bg-transparent  rounded-0 " onClick={() => setcommented(!commented)}>Comment <ChatOutlinedIcon /></button>
                    <a href="/hodo" className="text-decoration-none text-primary px-2  rounded-0">Share <ShareOutlinedIcon />    </a>
                </div>
            </div >

            <div className={commented ? "row justify-content-center mt-2 " : "d-none"}>
                <div className="col-10 border border-black rounded-2 p-1">
                    <span className="commented">
                        {
                            Comments.users.map((item, i) => {
                                return (
                                    <Commentor username={item} comment={Comments.comment[i]} />
                                )
                            })
                        }
                    </span>
                    <span className="addcmnt mt-5">
                        <input className='px-2 py-0 mx-3 rounded-5' type="text" name="newcomment" value={newcomment} onChange={(e) => setnewcomment(e.target.value)} placeholder="Add a new comment here" />
                        <button className="text-decoration-none bg bg-transparent text-primary fs-5" onClick={() => handlecomment()}>Comment</button>
                    </span>
                </div>
            </div>
            <hr />
        </div >

    )
}
