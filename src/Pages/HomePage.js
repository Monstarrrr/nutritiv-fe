import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function HomePage() {
    console.log("##### HomePage render #####");
    
    const loggedIn = useSelector(state => state.user.loggedIn)
    
    return (
        <div>
            <h1>Homepage</h1>
            {
                loggedIn ? null : (
                    <>
                        <Link to="/register">
                            REGISTER HERE
                        </Link>
                        <br /><br />
                        <Link to="/login">
                            LOGIN HERE
                        </Link>
                    </>
                )
            }
        </div>
    );
}