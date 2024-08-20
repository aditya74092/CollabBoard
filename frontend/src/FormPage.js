import React, { useState } from 'react';
import axios from 'axios';
import './FormPage.css'; // Create and import CSS file for styling

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://collabboard-backend.onrender.com'
});

function FormPage() {
    // Supplier States
    const [supplierName, setSupplierName] = useState('');
    const [supplierEmail, setSupplierEmail] = useState('');
    const [supplierNumber, setSupplierNumber] = useState('');
    const [supplierMessage, setSupplierMessage] = useState('');
    const [supplierLoading, setSupplierLoading] = useState(false);

    // Customer States
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerNumber, setCustomerNumber] = useState('');
    const [customerMessage, setCustomerMessage] = useState('');
    const [customerLoading, setCustomerLoading] = useState(false);

    // Add Supplier
    const addSupplier = async () => {
        setSupplierLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await api.post('/suppliers/add', { name: supplierName, email: supplierEmail, number: supplierNumber }, {
                headers: {
                    'x-auth-token': token
                }
            });
            setSupplierMessage('Supplier added successfully!');
            setSupplierName('');
            setSupplierEmail('');
            setSupplierNumber('');
        } catch (error) {
            console.error('Error adding supplier:', error.response ? error.response.data : error.message);
            setSupplierMessage('Error adding supplier.');
        } finally {
            setSupplierLoading(false);
        }
    };

    // Add Customer
    const addCustomer = async () => {
        setCustomerLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await api.post('/customers/add', { name: customerName, email: customerEmail, number: customerNumber }, {
                headers: {
                    'x-auth-token': token
                }
            });
            setCustomerMessage('Customer added successfully!');
            setCustomerName('');
            setCustomerEmail('');
            setCustomerNumber('');
        } catch (error) {
            console.error('Error adding customer:', error.response ? error.response.data : error.message);
            setCustomerMessage('Error adding customer.');
        } finally {
            setCustomerLoading(false);
        }
    };

    return (
        <div className="form-page-container">
            {/* Supplier Form */}
            <div className="supplier-form-container">
                <h2>Add Supplier</h2>
                {supplierMessage && <p className="message">{supplierMessage}</p>}
                {supplierLoading && <div className="loading">Loading...</div>}
                <input
                    type="text"
                    placeholder="Name"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={supplierEmail}
                    onChange={(e) => setSupplierEmail(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Number"
                    value={supplierNumber}
                    onChange={(e) => setSupplierNumber(e.target.value)}
                />
                <button className="add-button" onClick={addSupplier}>Add Supplier</button>
            </div>

            {/* Customer Form */}
            <div className="customer-form-container">
                <h2>Add Customer</h2>
                {customerMessage && <p className="message">{customerMessage}</p>}
                {customerLoading && <div className="loading">Loading...</div>}
                <input
                    type="text"
                    placeholder="Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Number"
                    value={customerNumber}
                    onChange={(e) => setCustomerNumber(e.target.value)}
                />
                <button className="add-button" onClick={addCustomer}>Add Customer</button>
            </div>
        </div>
    );
}

export default FormPage;
