import React, { useContext } from "react";
import { Link , Route } from "react-router-dom";

function ShowInfo() {
    const [id, setId] = useContext(null)
    let userOnline = localStorage.getItem('username')
    setId(userOnline)
    const myInfo = async () => {
        const respone = await fetch(`http://localhost:5000/myinfo/:${id}`)
        const data = await respone.json()
        return (
            <ul>
                {data.map(myInfo => (
                    <li type={"checkbox"} key={Math.random()}>{myInfo.title}</li>
                ))}
            </ul>
        );
    }



    return (
        <>
            <ul>
                <li>
                    <Link to="/todo">todo</Link>
                </li>
                <li>
                    <Link to="/about">about</Link>
                </li>
                <li>
                    <Link to="/">LogOut</Link>
                </li>
            </ul>
            <h1>Hello Im your info</h1>
            <p>{myInfo()}</p>
            
        </>
    )
}

export default ShowInfo;