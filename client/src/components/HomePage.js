import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


function HomePage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = e => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    const handleChangeUsername = e => {
        e.preventDefault();
        setUsername(e.target.value);
    }
    const handleChangeEmail = e => {
        e.preventDefault();
        setEmail(e.target.value);
    }
    const handleChangeAddress = e => {
        e.preventDefault();
        setAddress(e.target.value);
    }
    async function logInCheck(e) {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });
        let data = await response.json();
        console.log(data);
        if (data) {
            navigate("/Todo")
        } else {
            navigate('/')
        }
    }
    async function register(e) {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email : email,
                address : address
            })
        });
        let data = await response.json();
        console.log(data);
        if (data) {
            navigate("/Todo")
        } else {
            navigate('/')
        }
    }



    return (
        <form>
        <h1>Log In</h1>
            <input onChange={handleChangeUsername} type="text" value={username.value} placeholder="User Name:" />
            <br/>
            <input onChange={handleChangePassword} type="password" value={password.value} placeholder="Password:" />
            <br/>
            <button onClick={logInCheck}> Log-in </button>
            <h1>OR Register</h1>
            <input onChange={handleChangeUsername} type="text" value={username.value} required placeholder="User Name:" />
            <br/>
            <input onChange={handleChangePassword} type="password" value={password.value} required placeholder="Password:" />
            <br/>
            <input onChange={handleChangeEmail} type="email" value={email.value} required placeholder="Email:" />
            <br/>
            <input onChange={handleChangeAddress} type="text" value={address.value} required placeholder="Adress:" />
            <br/>
            <button onClick={register}> Register </button>
        </form>
    )
}

export default HomePage;