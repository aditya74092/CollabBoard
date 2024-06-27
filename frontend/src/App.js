import React, { useState } from 'react';
import axios from 'axios';
import Whiteboard from './Whiteboard';
import './App.css'; // Import the new CSS file for styling

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://collabboard-backend.onrender.com'
});

// Function to set the token in the headers
const setAuthToken = token => {
    if (token) {
        api.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete api.defaults.headers.common['x-auth-token'];
    }
};

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const register = async () => {
        try {
            const res = await api.post('/auth/register', { username: registerUsername, password: registerPassword });
            console.log('User registered:', res.data);
            localStorage.setItem('token', res.data.token); // Store the token in local storage
            setAuthToken(res.data.token); // Set the token in headers
        } catch (error) {
            console.error('Error registering user:', error.response ? error.response.data : error.message);
        }
    };

    const login = async () => {
        try {
            const res = await api.post('/auth/login', { username, password });
            console.log('User logged in:', res.data);
            localStorage.setItem('token', res.data.token); // Store the token in local storage
            setAuthToken(res.data.token); // Set the token in headers
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="app-container">
            {!isLoggedIn ? (
                <div className="auth-container">
                    {showRegister ? (
                        <div className="auth-form">
                            <h2>Register</h2>
                            <input
                                type="text"
                                placeholder="Username"
                                value={registerUsername}
                                onChange={(e) => setRegisterUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                            <button onClick={register}>Register</button>
                            <button onClick={() => setShowRegister(false)}>Cancel</button>
                        </div>
                    ) : (
                        <div className="auth-form">
                            <h2>Login</h2>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button onClick={login}>Login</button>
                            <button onClick={() => setShowRegister(true)}>Register</button>
                        </div>
                    )}
                </div>
            ) : (
                <Whiteboard />
            )}
        </div>
    );
}

export default App;
