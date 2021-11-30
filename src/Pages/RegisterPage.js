import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
    
    const initialState = { userName: '', password: ''};
    const [formData, setFormData] = useState();
    
    const handleChange = (e) => {
        setFormData({
            ... formData, 
            [e.target.name]: e.target.value 
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
        axios.post(
            'https://61a67ad28395690017be92ee.mockapi.io/users', 
            { formData }
        )
    }
    
    return (
        <div>
            <h2>Register page</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input 
                        name="username" 
                        onChange={ handleChange } 
                        type="text" 
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input 
                        name="password" 
                        onChange={ handleChange } 
                        type="password"
                    />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}