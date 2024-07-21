import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddSchool from './pages/addSchool';
import ShowSchools from './pages/showSchools';
import './App.css';

function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to the School Directory</h1>
            <div className="button-container">
                <Link to="/add-school" className="button">Add School</Link>
                <Link to="/show-schools" className="button">Show Schools</Link>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/add-school" element={<AddSchool />} />
                <Route path="/show-schools" element={<ShowSchools />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
