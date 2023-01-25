import React, { useSt, useState } from "react";
import { Link } from 'react-router-dom';

function Todo() {
    const [complete, setComplete] = useState();
    const [id, setId] = useState(localStorage.getItem('username'));

    const myTodos = async () => {

        const respone = await fetch(`http://localhost:5000/todos/:${id}`)
        const data = await respone.json()
        return (
            <ul>
                {data.map(todo => (
                    <li>
                        <input type={"checkbox"} onChange={handleChange} key={Math.random()}>{todo.title}</input>
                    </li>
                ))}
            </ul>
        );
    }

    const handleChange = async (e) => {
        e.preventDefault()
        setComplete(!complete)
        const response = await fetch(`http://localhost:5000/todos/:${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_complete: complete
            })
        });
        const data = await response.json()
        console.log(data);
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
            <button onClick={myTodos}>Get your Todos</button>
        </>
    )
}

export default Todo;