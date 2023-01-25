import ReactDOM from 'react-dom';
import React from 'react';
import {
  Route,
  Link,
  Routes
} from "react-router-dom"; import HomePage from './components/HomePage';
import Todo from './components/Todo';
import ShowInfo from './components/ShowInfo';

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/todo">todo</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
      </ul>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/todo" element={<Todo />} />
        <Route exact path="/about" element={<ShowInfo />} />
      </Routes>
    </>
  );
}

export default App;
