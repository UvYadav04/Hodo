import { React, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

export default function Postform() {
  let navigate = useNavigate()
  const [file, setfile] = useState()
  const [descp, setdescp] = useState("")
  const [Tags, settags] = useState({ T1: "", T2: "", T3: "" })
  const [loading, setloading] = useState(false)
  const handletags = (e) => {
    const name = e.target.name
    const value = e.target.value
    settags((data) => {
      return { ...data, [name]: value }
    })
  }
  const handleupload = async () => {
    const username = localStorage.getItem("username")
    if (descp === "" || file === "") {
      alert("fill necessary details")
      return;
    }
    const formdata = new FormData();
    formdata.append('file', file)
    formdata.append('descp', descp)
    formdata.append('Tags', JSON.stringify(Tags))
    formdata.append('user', username)
    formdata.append('date', new Date().getTime())
    // const description = descp, user = username, date = new Date().getTime()
    // console.log(description, user, date)
    setloading(true)
    const response = await fetch("https://hodobackend.onrender.com0/post/new", {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        'authorisation': `bearer ${localStorage.getItem('token')}`
      },
      body: formdata
    })
    const json = await response.json()
    if (json.success) {
      setloading(false)
      alert("post uploaded successfully")
      navigate('/')
    }
    else if (!json.success) {
      setloading(false)
      alert("something went wrong")
      // navigate(0)
    }

  }
  return (
    <>
      <Navbar />
      <div className="container-fluid form mx-auto text-center text-black px-0 bg bg-black">
        <div className="row formrow justify-content-md-start justify-content-center align-items-center h-100 p-0 flex-row mx-auto">
          <div className="col-lg-3   col-md-4 col-sm-5 col-10 px ms-lg-5 ms-md-4 ms-sm-3 ms-0 text-start  py-5 formcol rounded-2 ">
            <input className='' type="file" onChange={(e) => setfile(e.target.files[0])} />
            <input className='d-block mx-0 mt-4 rounded-2' type="text" name='T1' placeholder='Tag1' value={Tags.T1} onChange={(e) => handletags(e)} />
            <input className='d-block mx-auto rounded-2 my-1' type="text" name='T2' placeholder='Tag2' value={Tags.T2} onChange={(e) => handletags(e)} />
            <input className='d-block ms-auto mx-0 rounded-2 my-1' type="text" name='T3' placeholder='Tag3' value={Tags.T3} onChange={(e) => handletags(e)} />

            <textarea className='rounded-2 w-100 mt-4' name="descp" id="" rows="5" placeholder='Describe your experience' value={descp} onChange={(e) => setdescp(e.target.value)}></textarea>
            <button className='px-3 mt-3  rounded-1 w-25 ms-sm-auto mx-auto me-2 bg bg-success text-white' onClick={() => handleupload()}>Share</button>
          </div>
        </div>
        <div className={loading ? "row loader w-100 p-0 m-0 opacity-50 d-flex justify-content-center align-items-center text-dark" : "d-none"}>
          <div className="load m-0"></div>
          <h5 className='text-center'>Please wait</h5>
        </div>
      </div >
    </>
  )
}
