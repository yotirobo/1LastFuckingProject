import React, { useContext } from "react";

function ShowInfo() {
    const [complete , setComplete] = useContext(false)

    const handleChange = async (e) => {
        e.preventDefault()
        setComplete(!complete)
        const response = await fetch('http://localhost:5000/showinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            is_complete : complete
            })
        });
    }


    const myInfo = async () => {
        const respone = await fetch('http://localhost:5000/todos')
        const data = await respone.json()
        return (
            <ul>
                {data.map(todo => (
                    <input type={"checkbox"} onChange={handleChange} key={Math.random()}>{todo.title}</input>
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