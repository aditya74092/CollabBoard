import React, { useState } from 'react';
import axios from 'axios';
import './SupplierForm.css'; // Create and import CSS file for styling

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://collabboard-backend.onrender.com'
});

function SupplierForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const addSupplier = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await api.post('/suppliers/add', { name, email, number }, {
                headers: {
                    'x-auth-token': token
                }
            });
            setMessage('Supplier added successfully!');
            setName('');
            setEmail('');
            setNumber('');
        } catch (error) {
            console.error('Error adding supplier:', error.response ? error.response.data : error.message);
            setMessage('Error adding supplier.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="supplier-form-container">
            <h2>Add Supplier</h2>
            {message && <p className="message">{message}</p>}
            {loading && <div className="loading">Loading...</div>}
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="number"
                placeholder="Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />
            <button className="add-button" onClick={addSupplier}>Add Supplier</button>
        </div>
    );
}

export default SupplierForm;
