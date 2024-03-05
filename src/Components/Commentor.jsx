import React, { useEffect, useState } from 'react'
import c1 from '../Photos/c1.jpg'
import DeleteIcon from '@mui/icons-material/Delete';

export default function Commentor({ cuser, comment, deleter }) {
    // console.log(cuser)
    // console.log(deleter)
    // console.log(comment)
    const [users, setusers] = useState([])
    const [comments, setcomments] = useState([])
    const username = localStorage.getItem('username')

    useEffect(() => {
        setusers(cuser)
        setcomments(comment)
        // console.log(users)
    }, [])
    return (
        <>
            <div className=" p-2 m-2 container commentsection m-0">
                {users.length > 0 ? users.map((item, i) => {
                    return (
                        <>
                            <div className="row user justify-content-start comment p-1 mb-2 rounded-2 ">
                                <div className="col-12 text-start">
                                    <img src={c1} width={30} height={30} className='d-inline rounded-5' alt="" />
                                    <button className='d-inline bg bg-transparent font-weight-bold text-primary mx-3 my-0'>{item}</button>
                                    <button className={item === username ? "d-inline w-auto delete bg bg-transparent " : "d-none"} onClick={() => { deleter(comments[i], i) }}><DeleteIcon sx={{ color: 'red' }} /> </button>
                                </div>
                                <div className="col-11 text-start offset-1 ">
                                    {comments[i]}
                                </div>
                            </div>
                        </>
                    )
                }) : null}
            </div>
        </>
    )
}
