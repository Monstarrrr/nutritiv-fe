import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import storage from '../Helpers/localStorage';
import { updateAuthStatus } from '../Redux/reducers/user';

export default function HomePage() {
    console.log("##### HomePage render #####");
    
    const dispatch = useDispatch();
    
    const tokens = {
        refresh_token: localStorage.getItem(storage.refreshToken),
        access_token: localStorage.getItem(storage.accessToken),
    }
    
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
                    <div>
                        You are not connected
                    </div>
                )
            }
            <div>
                <h3>
                    accessToken: 
                </h3>
                <p style={{fontSize: '12px'}}>{ tokens.access_token }</p>
                <h3>
                    refreshToken:
                </h3>
                <p style={{fontSize: '12px'}}>{ tokens.refresh_token }</p>
                <button>
                    Some API call
                </button>
            </div>
        </div>
    );
}