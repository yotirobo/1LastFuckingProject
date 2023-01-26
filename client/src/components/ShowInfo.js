import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";

function ShowInfo() {
    const [id, setId] = useState(localStorage.user_id);
    const [draw, setDraw] = useState([]);
    const [userData, setUserData] = useState({});
    const [ifData, setIfData] = useState(false)

    useEffect(() => {
        myInfo();
    }, [])

    useEffect(() => {
        myInfo();
    }, [ifData])

    const myInfo = async () => {
        const respone = await fetch(`http://localhost:5000/info?user_id=${id}`)
        const data = await respone.json();
        setIfData(true);
        let tempArray = [];
        for (let item in userData) {
            tempArray.push({ title: item, body: userData[item] })
        }
        setUserData(data[0])
        setDraw(tempArray)
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
            {draw?.map((item) => {
                if (item.title === "password") {
                    return "";
                } else {
                    return  <p key={Math.random()}><b>{item.title}: </b>{item.body}</p> ;
                }
            })}
        </>
    )
}

export default ShowInfo;