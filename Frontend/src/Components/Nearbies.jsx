import React, { useContext } from 'react'
import { Locationcontext } from '../App'
import PlaceIcon from '@mui/icons-material/Place';
import { Link, useNavigate } from 'react-router-dom';
import usericon from '../Photos/usericon.png'


export default function Nearbies({ children }) {
    const { actives, nears, location } = useContext(Locationcontext)
    let navigate = useNavigate()
    return (<>
        <div className="nearby w-100 mt-2 p-0">
            <div className="location w-100 m-0">
                <PlaceIcon />{location.state}
                <ul className="p-0 nears mt-2">
                    {
                        nears.map((item) => {
                            return (
                                <li className='w-100 px-2 fs-3 d-flex justify-content-between align-items-center'>

                                    {item[1] === "" ? <img src={usericon} className='rounded-2 me-2' height={35} width={35} alt="" /> : <img src={`https://hodobackend.onrender.com/images` + item[1]} className='rounded-2 me-2' height={35} width={35} alt="" />}
                                    <Link className='text-black text-decoration-none fs-2' onClick={() => navigate('/usersprofile', { state: item[0] })}>{item[0]}</Link>
                                    <span className='ms-5'>~{item[2]}km</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    </>
    )
}
