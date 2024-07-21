import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './AddSchool.css';

const AddSchool = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        if (data.image[0]) {
            formData.append('image', data.image[0]);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/schools', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert('Failed to add school');
        }
    };

    return (
        <div className="container">
            <h1>Add a New School</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name', { required: true })} placeholder="School Name" />
                {errors.name && <span className="error">This field is required</span>}
                
                <input {...register('address', { required: true })} placeholder="Address" />
                {errors.address && <span className="error">This field is required</span>}
                
                <input {...register('city', { required: true })} placeholder="City" />
                {errors.city && <span className="error">This field is required</span>}
                
                <input {...register('state', { required: true })} placeholder="State" />
                {errors.state && <span className="error">This field is required</span>}
                
                <input type="number" {...register('contact', { required: true })} placeholder="Contact Number" />
                {errors.contact && <span className="error">This field is required</span>}
                
                <input type="email" {...register('email_id', { required: true })} placeholder="Email" />
                {errors.email_id && <span className="error">This field is required</span>}
                
                <input type="file" {...register('image')} />
                
                <button type="submit">Add School</button>
            </form>
            <a href="/show-schools">
                <button>Show Schools</button>
            </a>
            <a href="/">
                <button>Home</button>
            </a>
        </div>
    );
};

export default AddSchool;
