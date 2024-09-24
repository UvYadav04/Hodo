import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SettingsIcon from '@mui/icons-material/Settings';
import CancelIcon from '@mui/icons-material/Cancel';
import edit from '../Photos/edit2.png'
import Post from './Post'
import axios from 'axios'
import usericon from '../Photos/bg1.png'
import c1 from '../Photos/c1.jpg'
import Personalpost from './Personalpost'
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom'
export default function Personal({ username }) {
    // console.log(navigator.geolocation)


    let navigate = useNavigate()
    const [user, setuser] = useState({})
    const owner = localStorage.getItem('username')
    const [found, setfound] = useState(false)
    const [following, setfollowing] = useState(false)
    const [file, setfile] = useState()
    const [image, setimage] = useState("")
    const [Edit, setEdit] = useState(false)
    const [newuser, setnewuser] = useState({})
    const [Friends, setFriends] = useState([])
    const [loading, setloading] = useState(false)
    const [loadingchat, setloadingchat] = useState(false)
    const [nofrnds, setnofrnds] = useState(false)
    const [actives, setactives] = useState([])
    const [interests, setinterests] = useState([])
    const [settings, setsettings] = useState(false)
    const [interest, setinterest] = useState("")
    const [passwording, setpasswording] = useState(false)
    const [currentp, setcurrentp] = useState("")
    const [newp, setnewp] = useState("")
    const [confp, setconfp] = useState("")
    const [cwrong, setcwrong] = useState(false)
    const [nwrong, setnwrong] = useState(false)
    const [pwrong, setpwrong] = useState(false)
    const [seefolls, setseefolls] = useState(false)


    const handlepassword = async (item) => {
        // console.log(currentp)
        // console.log(newp)
        // console.log(confp)
        if (newp.length < 8) {
            setpwrong(true)
            return;
        }

        else if (newp !== confp) {
            setnwrong(true)
            return
        }
        setloading(true)
        const response = await fetch("https://hodobackend.onrender.com/user/updatepassword", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorisation': `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ currentp, newp, confp, owner })
        })

        const json = await response.json()
        if (json.success) {
            alert("password updated successfully")
            setloading(false)
            setpasswording(false)
        }
        else if (!json.success) {
            alert(json.message)
        }
    }

    const handlechanges = async (event) => {
        setnewuser((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })
    }

    const addinterest = async () => {
        if (interest !== "") {
            setinterests((prev) => {
                return [...prev, interest]
            })
            setnewuser((prev) => {
                return { ...prev, Interest: [...prev.Interest, interest] }
            })
            setinterest("")
        }
    }

    const deleteinterest = async (item2) => {
        setinterests(() => {
            return interests.filter((ting) => ting !== item2)
        })

        setnewuser((prev) => {
            let arr = prev.Interest
            arr = arr.filter((item) => item !== item2)
            // console.log(arr)
            return { ...prev, Interest: arr }
        })
    }

    const handleupdation = async () => {
        setsettings(false)
        setloading(true)
        const response = await fetch("https://hodobackend.onrender.com/user/updateprofile", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorisation': `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ newuser })
        })

        const json = await response.json();
        if (json.success) {
            setuser(json.user)
            setimage(json.user.image)
            setinterests(json.user.Interest)
            setnewuser(() => {
                return {
                    owner: owner,
                    Username: json.user.Username,
                    Name: json.user.Name,
                    About: json.user.About,
                    Interest: json.user.Interest
                }
            })
            setEdit(false)
            setloading(false)
        }

        else {
            setloading(false)
            alert("somethign went wrong try after sometime")
        }
    }

    const getuserdata = async () => {
        setloading(true)
        const response = await fetch("https://hodobackend.onrender.com/user/userdata", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorisation': `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ username: username })
        })

        const json = await response.json()
        if (json.success) {
            setfound(true)
            setuser(json.user)
            setimage(json.user.image)
            setinterests(json.user.Interest)
            setloading(false)
            setnewuser((prev) => {
                return {
                    owner: owner,
                    Username: json.user.Username,
                    Name: json.user.Name,
                    About: json.user.About,
                    Interest: json.user.Interest
                }
            })
            if (json.user.Followers.includes(owner))
                setfollowing(true)
        }
        else if (!json.success) {
            setloading(false)
            alert("Something went wrong")
        }
    }

    const getownerdata = async () => {
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
        if (json.user.Followers.includes(owner))
            setfollowing(true)

        if (json.user.friends.length === 0) {
            // console.log("nofriends")
            setloading(false)
            setnofrnds(true)
        }
        else {
            setloading(false)
            setFriends(json.user.friends)
        }
    }

    const handlefollow = async () => {
        if (!following) {
            setloading(true)
            const response = await fetch("https://hodobackend.onrender.com/follow/new", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorisation': `bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ username, owner: owner })
            })
            const json = await response.json()
            // console.log(json)
            if (json.success) {
                setloading(false)
                setfollowing(true)
            }
        }

        if (following) {
            setloading(true)
            const response = await fetch("https://hodobackend.onrender.com/follow/following", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorisation': `bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ username, owner: owner })
            })
            const json = await response.json()
            // console.log(json)    
            if (json.success) {
                setloading(false)
                setfollowing(false)
            }
        }
    }

    const removefollower = async (item) => {

        setloading(true)
        const response = await fetch("https://hodobackend.onrender.com/follow/removefollower", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorisation': `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ item, owner })
        })
        const json = await response.json()
        if (json.success) {
            setloading(false)
            setfound(true)
            setuser(json.user)
            setimage(json.user.image)
            setinterests(json.user.Interest)
            setnewuser((prev) => {
                return {
                    owner: owner,
                    Username: json.user.Username,
                    Name: json.user.Name,
                    About: json.user.About,
                    Interest: json.user.Interest
                }
            })
            if (json.user.Followers.includes(owner))
                setfollowing(true)
        }

    }

    const handlephoto = async (e) => {
        setfile(e.target.files[0])
        const formdata = new FormData();
        formdata.append('file', e.target.files[0])
        formdata.append('userid', user._id)
        axios.post("https://hodobackend.onrender.com/update/photo",
            formdata, {
            headers: {
                'content-type': 'text/json',
                'authorisation': `bearer ${localStorage.getItem('token')}`
            }
        }).then(async (res) => {
            // const json = await res.json();
            // console.log(res)
            // console.log(json)
            setimage(file)
            // navigate(0)
        })
            .catch((e) => {
                console.log("something went wrong try again : ", e)
            })
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
            setactives(json.active)
        }
        else if (!json.success) {
            setloadingchat(false)
        }
    }



    useEffect(() => {
        getuserdata()
        getownerdata()
        getactiveusers()
    }, [])

    return (
        <>
            <div className="container-fluid profile">
                <div className={passwording || loading ? "d-none" : "row prow  justify-content-around pt-2  "}>
                    <div className={Edit ? "d-none" : "col-xxl-4 col-xl-4 col-lg-5 col-12 info d-flex flex-column justify-content-start text-align-center p-2 profilepage position-relative border"}>
                        <div className={settings ? "text-black position-absolute slider rounded-2  " : "d-none"}>
                            <ul className='p-0 pt-2 mt-2'>
                                <li className="d-block mb-1  fs-5   w-auto text-start mx-2" onClick={() => setEdit(true)} >Edit profile</li>
                                <li className="d-block  mb-1 fs-5   w-auto text-start mx-2" onClick={() => navigate('/privacy')}>Privacy</li>
                                <li className="d-block  mb-1 fs-5   w-auto text-start mx-2" onClick={() => setpasswording(true)} >Change password</li>
                                <li onClick={() => {
                                    localStorage.removeItem("username")
                                    localStorage.removeItem("token")
                                    navigate('/auth')
                                }} className="d-block mb-1  fs-5     w-auto text-start mx-2 text-danger mt-auto"
                                >Log Out</li>
                            </ul>
                        </div>
                        <div className="image d-flex flex-row justify-content-start gap-0 position-relative">
                            {
                                image !== "" ? <img src={user.image} className='rounded-1 border border-dark' alt="" /> :
                                    <img src={usericon} className='rounded-1 border border-dark' alt="" />
                            }
                            <span className="mx-2 name text-start w-100">
                                <h4 className='mb-0 w-100 '>{user.Username ? user.Username : "User inactive"} </h4>
                                <h5 className='opacity-75 m-0 mb-1'>{user.Name}</h5>
                                <button className={owner !== username && !following ? 'rounded-2 text-white bg bg-primary border border-none  d-block m-0' : "d-none"} onClick={() => handlefollow()} >Follow+</button>
                                <button className={owner !== username && following ? 'rounded-2 text-white bg bg-primary border border-none d-block ' : "d-none"} onClick={() => handlefollow()} >Following</button>

                                <span className="followers position-relative text-center p-0">
                                    <button className='rounded-0 bg bg-primary text-white me-2 mt-lg-2 mt-0' onClick={() => setseefolls(!seefolls)} ><span>{found ? user.Followers.length : null}</span> Followers</button>
                                    <button className='rounded-0 bg bg-primary text-white' onClick={() => setseefolls(!seefolls)}><span >{found ? user.Following.length : null}</span> Following</button>
                                </span>
                            </span>
                            <SettingsIcon className={owner === username ? settings ? "text-white sicon " : "text-black z-index-3 bg bg-transparent sicon" : "d-none"} onClick={() => setsettings(!settings)} />
                        </div>

                        <div className="infor text-start mt-2">
                            {user.About}
                        </div>

                        <div className="interests text-start mt-2">
                            <h5 className='opacity-75 mb-2'>Interests</h5>
                            <ul className='p-0'>
                                {
                                    interests.length > 0 ? interests.map((item, i) => {
                                        return <li key={i} className='w-25 list-style-none d-inline bg bg-primary text-white me-2 px-2 py-1 rounded-1'>{item}</li>
                                    }) : <h4 className='opacity-50'>Add interest to view here </h4>

                                }
                            </ul>
                        </div>
                    </div>
                    <div className={!Edit ? "d-none" : "col-xxl-4 col-xl-4 col-lg-5 col-12 position-lg-sticky position-static info d-flex flex-column justify-content-start p-0 text-align-center p-2"}>
                        <div className="image d-flex flex-row justify-content-start gap-0 position-relative">

                            <label htmlFor="image">
                                <img src={edit} className='mx-1 rounded-1 opacity-50 ' alt="..." />
                            </label>
                            <input type="file" onChange={(e) => handlephoto(e)} id='image' name='image' className='d-none' />
                            <span className="mx-2 name text-start ">

                                <input type="text" value={newuser.Username} name='Username' className='mb-0 d-block updateusername' onChange={(event) => handlechanges(event)} disabled />
                                <p className='updateusername text-danger mb-1'>Sorry can't change username, will be fixed soon.</p>
                                <input type="text" value={newuser.Name} name='Name' className='mb-2 ' onChange={(event) => handlechanges(event)} />

                                <button className={owner !== username && !following ? 'rounded-2 text-white bg bg-primary my-2 border border-none' : "d-none"} onClick={() => handlefollow()} >Follow+</button>
                                <button className={owner !== username && following ? 'rounded-2 text-white bg bg-primary my-2 border border-none' : "d-none"} onClick={() => handlefollow()} >Following</button>
                                <br />
                                <button className='rounded-1 bg bg-primary text-white me-2' ><span>{found ? user.Followers.length : null}</span> Followers</button>
                                <button className='rounded-1 bg bg-primary text-white me-2' ><span >{found ? user.Following.length : null}</span> Following</button>
                            </span>

                        </div>


                        <textarea name="About" id="bio" cols="10" rows="5" className='mt-3 rounded-3' value={newuser.About} placeholder='Add bio here' onChange={(event) => handlechanges(event)}  ></textarea>


                        <div className="interests mt-3 text-start w-100" key={"different"}>
                            <ul className='p-0' key={"down"}>
                                {
                                    interests.length > 0 ?
                                        interests.map((item, i) => {
                                            return (<>
                                                <li key={i} className='w-25 list-style-none d-inline bg bg-primary text-white me-0 px-2 py-1 rounded-5'>{item} <CancelIcon onClick={() => deleteinterest(item)} />  </li>

                                            </>
                                            )
                                        }) :
                                        <h5>Add interests to view here</h5>
                                }
                            </ul>

                            <div className="adder">
                                <input type="text" name='interest' value={interest} onChange={(event) => setinterest(event.target.value)} className='rounded-5 w-50 ps-2 my-auto bg' placeholder='add interest' />
                                <button className=' rounded-1 me-auto bg bg-primary border border-dark px-2 mx-2 text-white fs-6 my-auto' onClick={() => addinterest()}>Add</button>
                            </div>
                        </div>

                        <button className="ms-auto me-3 bg bg-primary text-white rounded-1" onClick={() => handleupdation()}>Update</button>
                    </div>
                    <div className="col-xl-5 col-md-7 col-sm-10 col-12 posts mt-lg-0 mt-3">
                        <Personalpost username={username} />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 d-xl-inline d-lg-none d-md-inline d-none mt-lg-0 mt-3 profilechat border "   >
                        <input type="text" name="search" placeholder="search friends" className=" ps-2 w-100 bg bg-white rounded-4 mt-2 mx-0" />
                        <div className="activefriends mt-2 ">
                            {Friends.map((item, i) => item.Username !== owner && actives.includes(item.Username) ? <li key={i} className=' p-1 fs-4 w-100 text-start'>  <img className='border border-success border-3 rounded-5' src={"https://hodobackend.onrender.com//Images/" + item.image} width={40} height={40} alt="" /></li> : null)}

                        </div>
                        <ul className={!loadingchat && !nofrnds ? "p-1 mt-0" : "d-none"}>
                            {
                                Friends.map((item, i) => {
                                    return (<li key={i} className="text-dark cursor-pointer ms-1 my-2 p-1  rounded-2 px-2 d-flex flex-row frnditem" onClick={() => navigate('/chat', { state: item.Username })} >
                                        <img src={item.image} width={50} height={50} className=" rounded-5 me-2" alt="" />
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

                        <section className={!loadingchat && nofrnds ? "h-100 d-flex justify-content-center align-items-center" : "d-none"}>
                            <h3 className="opacity-50">Connect Friends to Chat</h3>
                        </section>

                        <section className={loadingchat ? "h-100 d-flex justify-content-center align-items-center" : "d-none"}>
                            <h4 className="mx-auto opacity-75">Loading chats...</h4>
                        </section>

                    </div>

                    <div className={seefolls ? "seefolls  d-flex flex-row mt-2" : "d-none"}>
                        <ClearIcon className='d-block' onClick={() => setseefolls(false)} />
                        <ul className=' w-50 text-center m-0 p-0 border-right'>
                            <h5 className='text-black m-0 p-0  my-1' >Followers</h5>
                            {
                                found ?
                                    user.Followers.map((item) => <li className='p-0 m-0 mb-2 text-center opacity-75 position-relative' ><span onClick={() => navigate('/usersprofile', { state: item })}>{item}</span> <button className='bg bg-transparent text-danger remover text-end p-0 d-inline' onClick={() => removefollower(item)}>remove</button></li>) :
                                    null
                            }
                        </ul>
                        <ul className=' w-50 text-center  p-0'    >
                            <h5 className='text-black m-0 p-0 mb-2' >Followings</h5>
                            {
                                found ?
                                    user.Following.map((item) => <li className='p-0 m-0 opacity-75 '><span onClick={() => navigate('/usersprofile', { state: item })}>{item}</span></li>) :
                                    null
                            }
                        </ul>
                    </div>

                </div>

                {/* col-xl-3 col-lg-3 col-md-5 d-xl-flex d-lg-none d-md-flex flex-row mt-lg-0 mt-3 m-0 border text-primary p-0 */}

                <div className={passwording && !loading ? "row password w-100 justify-content-center align-content-center" : "d-none"}>
                    <div className=" col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10 d-flex flex-column align-items-center justify-content-center p-lg-5 p-md-3 p-sm-1 p-0 border border-primary border-none border-2">
                        <label htmlFor="current" className='m-0 ms-0 w-75 text-start text-primary'>current password</label>
                        <input ty pe="password" className='d-block mb-2 w-75' value={currentp} onChange={(e) => setcurrentp(e.target.value)} />
                        <label htmlFor="new" className='m-0 ms-0 w-75 text-start text-primary' >new    password</label>
                        <input type="password" className='d-block mb-2 w-75' value={newp} onChange={(e) => setnewp(e.target.value)} />
                        <label htmlFor="confirm" className='m-0 ms-0 w-75 text-start text-primary'>confirm password</label>
                        <input type="password" className='d-block mb-2 w-75' value={confp} onChange={(e) => setconfp(e.target.value)} />
                        <p className={cwrong ? "d-inline m-0 p-0 text-start w-75 text-danger fs-6" : "d-none"}>Incorrect current password</p>
                        <p className={nwrong ? "d-inline m-0 p-0 text-start w-75 text-danger fs-6" : "d-none"}>Password do not match</p>
                        <p className={pwrong ? "d-inline m-0 p-0 text-start w-75 text-danger fs-6" : "d-none"}>Password must be 8 characters long</p>
                        <button className=' mt-2 bg bg-primary text-white fs-6 rounded-3 px-2 border-white' onClick={() => handlepassword()}>Change</button>
                        <button className=' mt-2 bg bg-primary text-white fs-6 rounded-3 px-2 border-white' onClick={() => setpasswording(false)}>Go back</button>

                    </div>
                </div >

                <div className={loading ? "row loader w-100 p-0 m-0 opacity-50 d-flex justify-content-center gap-0 align-items-center text-dark" : "d-none"}>
                    <div className="load"></div>
                    {/* <h3 className='m-0 bg '>Please wait...</h3> */}
                </div>
            </div >
        </>
    )
}