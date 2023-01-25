import React, { useEffect, useState } from 'react';
import "../css/Todos.css"



export const Todos = () => {
    const currentUser  = localStorage.getItem('userOnline');
    const [todos, setTodos] = useState([])
    const [selected, setSelected] = useState("byId")


    const getAllTodosOfCurrentUserById = async () => {
        let data = await fetch(`https://localhost:5000/todos/?userId=${currentUser.id}`)
        let todos = await data.json();
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
        checkedArr[index].completed = !checkedArr[index].completed;
        setTodos(checkedArr);
    }
    const createTodosList = (list) => {
        switch (selected) {
            case "byId":
                list.sort((a, b) => {
                   return a.id - b.id
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
                    if (a.completed.toString() > b.completed.toString()) return -1;
                    if (a.completed.toString() < b.completed.toString()) return 1;
                });
                break;
            case "random":
                list.sort((a, b) => 0.5 - Math.random());
                break;

        }

        let mapArray = list.map((obj, index) => <div  key={index} className={obj.completed ? "completed" : 'pContainer'} >
            <p key={obj.id} className='pCheckBox'> Task number {index + 1}:
                <input onChange={()=>handleCheck(index)} type="checkbox" name={index} key={obj.id} checked={obj.completed} />  {obj.title} <br />

            </p>
        </div>
        )
        return mapArray;
    }

    return (
        <>
            <h1>Todos list:</h1>
            <label>Sort by:
                <select onChange={handleSelect}>
                    <option value="byId">By Id of task</option>
                    <option value="byCompleted">By completed tasks</option>
                    <option value="byAB">In Alphabetical order</option>
                    <option value="random">Random order</option>
                </select></label>
            <div className="todosDiv">
                {createTodosList(todos)}
            </div>
        </>
    )
}