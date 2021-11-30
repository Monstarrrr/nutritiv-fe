import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div>
            <h1>Homepage</h1>
            <Link to="/register">
                REGISTER HERE
            </Link>
            <br /><br />
            <Link to="/login">
                LOGIN HERE
            </Link>
        </div>
    );
}