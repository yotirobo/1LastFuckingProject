import React from "react";

function Todo() {
    
    const getTodos = async () =>{
        const respone = await fetch('http://localhost:5000/todos')
        
    }

    return(
        <>
            <button onClick={getTodos}>Get your Todos</button>
        </>
    )
}

export default Todo;