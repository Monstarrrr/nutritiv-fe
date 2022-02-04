import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import storage from '../Helpers/localStorage';
import { updateAuthStatus } from '../Redux/reducers/user';

export default function HomePage() {
    console.log("##### HomePage render #####");
    
    const dispatch = useDispatch();
    
    const loggedIn = useSelector(state => state.user.loggedIn)
    
    const handleLogout = () => {
        localStorage.removeItem(storage.accessToken)
        localStorage.removeItem(storage.refreshToken)
        dispatch(updateAuthStatus({ loggedIn: false }))
    }
    
    return (
        <div>
            <h1>Homepage</h1>
            {
                loggedIn ? (
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
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