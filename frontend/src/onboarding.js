import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './onboarding.css'; // Create and import CSS file for styling

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://collabboard-backend.onrender.com'
});

function Onboarding() {
     // Shop States
     const [shops, setShops] = useState([]);
     const [shopName, setShopName] = useState('');
     const [userFirstName, setUserFirstName] = useState('');
     const [userLastName, setUserLastName] = useState('');
     const [shopNumber, setShopNumber] = useState('');
     const [shopMessage, setShopMessage] = useState('');
     const [shopLoading, setShopLoading] = useState(false);

    // Fetch Shops  when the component mounts
    useEffect(() => {
        const fetchShops = async () => {
            try {
                const token = localStorage.getItem('token');
                const shopsRes = await api.get('/shops', {
                    headers: {
                        'x-auth-token': token
                    }
                });
                setShops(shopsRes.data);

            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
            }
        };

        fetchShops();
    }, []);

    // Add Shop
    const addShop = async () => {
        setShopLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await api.post('/shops/add', {shop_name: shopName,user_first_name: userFirstName,user_last_name: userLastName,number: shopNumber 
            }, {
                headers: {
                    'x-auth-token': token
                }
            });
            setShopMessage('Shop added successfully!');
            setShops([...shops, res.data]);  // Add the new supplier to the list
            setShopName('');
            setUserFirstName('');
            setUserLastName('');
            setShopNumber('');
        } catch (error) {
            console.error('Error adding shop:', error.response ? error.response.data : error.message);
            setShopMessage('Error adding shop.');
        } finally {
            setShopLoading(false);
        }
    };

    return (
        <div className="form-page-container">
            {/* Shop Form */}
            <div className="supplier-form-container">
                <h2>Add Shop</h2>
                {shopMessage && <p className="message">{shopMessage}</p>}
                {shopLoading && <div className="loading">Loading...</div>}
                <input
                    type="text"
                    placeholder="Shop Name"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={userFirstName}
                    onChange={(e) => setUserFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={userLastName}
                    onChange={(e) => setUserLastName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Phone Number"
                    value={shopNumber}
                    onChange={(e) => setShopNumber(e.target.value)}
                />
                <button className="add-button" onClick={addShop}>Add Shop</button>
    
                <h3>Your Shops</h3>
                <ul>
                    {shops.map(shop => (
                        <li key={shop.id}>
                            {shop.shop_name} - {shop.user_first_name} {shop.user_last_name} - {shop.number} - {shop.created_at}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );    
}

export default Onboarding;
