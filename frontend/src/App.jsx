import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Createtodo } from './components/Createtodo';
import { Showtodo } from './components/Showtodo';
import { Updatetodo } from './components/Updatetodo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Showtodo />} />
        <Route path="/create" element={<Createtodo />} />
        <Route path="/update/:id" element={<Updatetodo />} />
      </Routes>
    </Router>
  );
}

export default App;
