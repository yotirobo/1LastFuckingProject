import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/todos.css"



export const Todos = () => {
    const currentUser = JSON.parse(localStorage.getItem('userOnline'));
    const [todos, setTodos] = useState([])
    const [selected, setSelected] = useState("byId")


    const getAllTodosOfCurrentUserById = async () => {
        let data = await fetch(`http://localhost:5000/todos?userId=${currentUser.user_id}`)
        let todos = await data.json();
        console.log(todos);
        setTodos(todos);
    }
    
    useEffect(() => {
        getAllTodosOfCurrentUserById();
    }, [])
    
    useEffect(() => {
        createTodosList(todos);
    }, [selected]);

    const handleSelect = (event) => {
        const { value } = event.target
        setSelected(value);
    }
    const handleCheck = (index) => {
        let checkedArr = [...todos];
        checkedArr[index].is_complete = !checkedArr[index].is_complete;
        setTodos(checkedArr);
    }
    const createTodosList = (list) => {
        switch (selected) {
            case "byId":
                list.sort((a, b) => {
                    return a.todo_id - b.todo_id
                });
                break;
            case 'byAB':
                list.sort((a, b) => {
                    if (a.title < b.title) return -1;
                    if (a.title > b.title) return 1;
                });
                break;
            case 'byCompleted':
                list.sort((a, b) => {
                    if (a.is_complete > b.is_complete) return -1;
                    if (a.is_complete < b.is_complete) return 1;
                });
                break;
            case "random":
                list.sort((a, b) => 0.5 - Math.random());
                break;

        }

        let mapArray = list.map((obj, index) =>
            <div key={index} className={obj.is_complete ? "completed" : 'pContainer'}>
                <h5 key={obj.id} className='pCheckBox'> Task number {index + 1}: </h5>
                <p>{obj.title}</p>
                <input type="checkbox" className='check' name={index} onChange={() => handleCheck(index)} key={obj.todo_id} checked={obj.is_complete} /><br />
            </div>
        )
        return mapArray;
    }

    return (
        <div className='todos-container'>
            <Link to="/todo">todo</Link>
            <Link to="/about">about</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/">LogOut</Link>
            <h1>Todos list:</h1>
            <br />
            <div className='select-div'>
                <label>Sort by: </label>
                <select onChange={handleSelect}>
                    <option value="byId">By Id of task</option>
                    <option value="byCompleted">By completed tasks</option>
                    <option value="byAB">In Alphabetical order</option>
                    <option value="random">Random order</option>
                </select>
            </div>
            <div className="todosDiv">
                {createTodosList(todos)}
            </div>
        </div>
    )
}