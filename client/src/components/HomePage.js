import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";



function HomePage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();


//     const handleChange = e=>{
//  how to make it be handleChange${e.taget.type}?
//     }

    const handleChangePassword = e => {
        e.preventDefault();
        console.log(e.target.type)
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
            const respone = await fetch(`http://localhost:5000/users?user=${username}`)
            const data = await respone.json();
            localStorage.setItem('userOnline', JSON.stringify({username : username, user_id : data.user_id}));
            navigate("/Todo")
        } else {
            navigate('/')
            alert('username or password are incorrect')
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
                email: email,
                address: address
            })
        });
        let data = await response.json();
        console.log(data)
        if (data) {
            window.location.reload()
            return;
        } else {
            alert('There is a problem with one of the fields, Please refill and try again.')
            navigate('/')
        }
    }
    // const getUserId = async () => {

    // }



    return (
        <div className='container'>
        <form className='signUp'>
                <h3>Register</h3>
                <input onChange={handleChangeUsername} type="text" value={username} required placeholder="User Name:" />
                <br />
                <input onChange={handleChangePassword} type="password" value={password} required placeholder="Password:" />
                <br />
                <input onChange={handleChangeEmail} type="email" value={email} required placeholder="Email:" />
                <br />
                <input onChange={handleChangeAddress} type="text" value={address} required placeholder="Adress:" />
                <br />
                <button className="form-btn sx log-in" onClick={() => {
                    document.getElementsByClassName("signIn")[0].className = "signIn active-sx";
                    document.getElementsByClassName("signUp")[0].className = "signUp inactive-dx";
                }} type="button">Log In</button>
                <button className='form-btn dx' onClick={register}> Register </button>
            </form>
            <form className='signIn active-dx'>
                <h3>Log In</h3>
                <input className='w100' onChange={handleChangeUsername} type="text" value={username.value} placeholder="User Name:" />
                <br />
                <input className='w100' onChange={handleChangePassword} type="password" value={password.value} placeholder="Password:" />
                <br />
                <button className="form-btn sx back" onClick={() => {
                    document.getElementsByClassName("signUp")[0].className = "signUp active-dx";
                    document.getElementsByClassName("signIn")[0].className = "signIn inactive-sx";
                }} type="button">Register</button>
                <button className='form-btn dx' onClick={logInCheck}> Log-in </button>
            </form>
            

        </div>
    )
}

export default HomePage;