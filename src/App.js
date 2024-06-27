import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Jobslist from './Joblist';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          <Route exact path="/jobs" element={<Jobslist/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
