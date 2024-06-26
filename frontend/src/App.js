import React, { useState } from 'react';
import axios from 'axios';
import Whiteboard from './Whiteboard';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const register = async () => {
        try {
            const res = await axios.post('http://localhost:5001/users/register', { username, password });
            console.log('User registered:', res.data.data);
        } catch (error) {
            console.error('Error registering user:', error.response ? error.response.data : error.message);
        }
    };

    const login = async () => {
      try {
          const res = await axios.post('http://localhost:5001/users/login', { username, password });
          console.log('User logged in:', res.data.data);
          setIsLoggedIn(true);
          localStorage.setItem('token', res.data.token); // Store the token in local storage
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
