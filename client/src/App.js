import ReactDOM from 'react-dom';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage';
import { Todos } from './components/todos';
import ShowInfo from './components/ShowInfo';

function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/todo" element={<Todos />} />
        {/* <Route exact path="/about" element={<ShowInfo />} /> */}
      </Routes>
    </>
  );
}

export default App;
