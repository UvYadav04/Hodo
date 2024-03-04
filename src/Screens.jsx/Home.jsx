import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Home() {
    let navigate = useNavigate()
    const verify = async () => {

        const token = localStorage.getItem('token')
        if (token) {
            const username = localStorage.getItem('username')
            const response = await fetch("http://localhost:8080/user/userdata", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorisation': `bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ username: username })
            })

            const json = await response.json();
            if (!json.success) {
                navigate('/auth')
            }
            else {

                // ****************logging in *************************

                const logindata = {
                    username: username,
                    password: json.password,
                    jwt: true
                }
                const response2 = await fetch("http://localhost:8080/register/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorisation': `bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ logindata })
                })

                const json2 = await response2.json();

                if (!json2.success) {
                    navigate('/auth')
                }
                else if (json2.success) {
                    localStorage.setItem('token', json2.token)
                    localStorage.setItem('username', username)
                    navigate('/hodo')
                }
                // ****************logging in *************************
            }
        }
        else
            navigate('/auth')
    }

    useEffect(() => {
        verify()
    }, [])
    return (
        <>
        </>
    )
}
