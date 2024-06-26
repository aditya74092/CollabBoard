import React, { useState } from 'react';
import axios from 'axios';
import Whiteboard from './Whiteboard';

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
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const register = async () => {
        try {
            const res = await api.post('/auth/register', { username, password });
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
        <div>
            <h1>CollabBoard</h1>
            {!isLoggedIn ? (
                <div>
                    <div>
                        <h2>Register</h2>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={register}>Register</button>
                    </div>
                    <div>
                        <h2>Login</h2>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={login}>Login</button>
                    </div>
                </div>
            ) : (
                <Whiteboard />
            )}
        </div>
    );
}

export default App;
