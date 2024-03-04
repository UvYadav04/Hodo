import { React, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

export default function Postform() {
  let navigate = useNavigate()
  const [file, setfile] = useState()
  const [descp, setdescp] = useState("")
  const [Tags, settags] = useState({ T1: "", T2: "", T3: "" })
  const handletags = (e) => {
    const name = e.target.name
    const value = e.target.value
    settags((data) => {
      return { ...data, [name]: value }
    })
  }
  const handleupload = () => {
    const username = localStorage.getItem("username")
    const formdata = new FormData();
    formdata.append('file', file)
    formdata.append('descp', descp)
    formdata.append('Tags', JSON.stringify(Tags))
    formdata.append('user', username)
    axios.post("http://localhost:8080/post/new",
      formdata, {
      headers: {
        'content-type': 'text/json',
        'authorisation': `bearer ${localStorage.getItem('token')}`
      }
    }).then(() => {
      navigate('/hodo')
    })
      .catch(() => {
        console.log("something went wrong try again")
        navigate(0)
      })
  }
  return (
    <>
      <Navbar />
      <div className="container-fluid text-white fs-5 form2">
        <div className="container form">
          <div className="row  justify-content-start p-0">
            <div className="col-auto">
              <input className='d-inline mt-5' type="file" onChange={(e) => setfile(e.target.files[0])} />
            </div>
          </div>
          <div className="row mt-5  justify-content-start p-0">
            <div className="col-auto">
              <label className='d-inline' htmlFor="">Tags : </label>
              <input className='d-inline mx-4 w-25 rounded-2' type="text" name='T1' value={Tags.T1} onChange={(e) => handletags(e)} />
              <input className='d-inline mx-4 w-25 rounded-2' type="text" name='T2' value={Tags.T2} onChange={(e) => handletags(e)} />
              <input className='d-inline mx-4 w-25 rounded-2' type="text" name='T3' value={Tags.T3} onChange={(e) => handletags(e)} />
            </div>
          </div>
          <div className="row mt-5  justify-content-start p-0">
            <div className="col-auto"> <label className='d-block' htmlFor="">Describe you experience : </label>
              <textarea className='rounded-2' name="descp" id="" cols="100" rows="5" value={descp} onChange={(e) => setdescp(e.target.value)}></textarea></div>
          </div>
          <button className='px-3 mt-5 rounded-1' onClick={() => handleupload()}>upload</button>
        </div>
      </div></>
  )
}