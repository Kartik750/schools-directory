import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShowSchools.css';

const ShowSchools = () => {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/schools');
                setSchools(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSchools();
    }, []);

    return (
        <div className="container">
            <h1>School Directory</h1>
            {schools.length === 0 ? (
                <p className="no-schools-message">No schools to display</p>
            ) : (
                <div className="schools-grid">
                    {schools.map((school) => (
                        <div key={school.id} className="school-card">
                            <h2>{school.name}</h2>
                            <p>{school.address}</p>
                            <p>{school.city}, {school.state}</p>
                            {school.image && <img src={`http://localhost:5000${school.image}`} alt={school.name} />}
                        </div>
                    ))}
                </div>
            )}
            <a href="/add-school">
                <button>Add School</button>
            </a>
            <a href="/">
                <button>Home</button>
            </a>

        </div>
    );
};

export default ShowSchools;
