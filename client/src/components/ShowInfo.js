import React, { useContext } from "react";

function ShowInfo() {
    const [id , setId ] = useContext(null)
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
            <h1>Hello Im your info</h1>
            <p>{myInfo()}</p>
        </>
    )
}

export default ShowInfo;