import ReactDOM from 'react-dom';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage';
import { Todos } from './components/todos';
import { Posts } from './components/posts';
import ShowInfo from './components/ShowInfo';

function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/todo" element={<Todos />} />
        <Route exact path="/about" element={<ShowInfo />} />
        <Route exact path="/posts" element={<Posts />} />
      </Routes>
    </>
  );
}

export default App;
