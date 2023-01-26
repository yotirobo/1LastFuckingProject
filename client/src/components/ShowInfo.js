import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";

function ShowInfo() {
    const [id, setId] = useState(JSON.parse(localStorage.getItem("userOnline")).user_id);
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
            <Link to="/todo">todo</Link>
            <Link to="/about">about</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/">LogOut</Link>
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