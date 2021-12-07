import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LoginPage() {
    
    const initialState = { username: '', email: '', password: ''};
    // usf
    const [formData, setFormData] = useState();
    const [userData, setUserData] = useState();
    
    const handleChange = (e) => {
        setFormData({
            ... formData, 
            [e.target.name]: e.target.value 
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents auto submition on button click
        console.log(formData);

        axios
        .post(
            '/auth/login',
            { formData }
        )
        .then(res => {
            localStorage.setItem('token', res.data.accessToken);
            // localStorage.setItem('userid', res.data._id);
            console.log(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    const fetchData = async () => {
        const { data } = await axios
        .get(
            '/users/find/61a7af193e112c5ca4fe1f01',
            {
                headers: {
                    token: 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
        console.log(data)
        return data;
    }
        
    // uef
    useEffect(() => {
        fetchData();
    }, [])
    
    return (
        
        <div>
            <h2>Login page</h2>
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
                <div>
                    <h4>
                        { userData ? (
                            userData.public.username.toString()
                        ) : (
                            <p>
                                Not connected.
                            </p>
                        )}
                    </h4>
                </div>
            </form>
        </div>
    )
}