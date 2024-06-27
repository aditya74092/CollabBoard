import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FiSettings, FiEdit3, FiLogOut } from 'react-icons/fi';
import { SketchPicker } from 'react-color';
import 'react-toastify/dist/ReactToastify.css';
import './Whiteboard.css'; // Import the new CSS file

const Whiteboard = ({ onLogout }) => {
    const canvasRef = useRef(null);
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(2);
    const [socket, setSocket] = useState(null);
    const [roomId, setRoomId] = useState('');
    const [isDrawing, setIsDrawing] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [loading, setLoading] = useState(false);
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const newSocket = io('https://collabboard-backend.onrender.com'); // Update this to your backend URL
        setSocket(newSocket);
        console.log('Socket connected');

        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (socket && roomId) {
            socket.emit('join', roomId);
            console.log(`Joined room: ${roomId}`);
        }
    }, [socket, roomId]);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setIsDrawing(true);
        setLastPosition({ x: offsetX, y: offsetY });
    };

    const draw = (x0, y0, x1, y1, emit = true) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.stroke();
        context.closePath();

        if (!emit) return;

        socket.emit('drawing', { x0, y0, x1, y1, color, lineWidth, roomId });
    };

    const handleMouseMove = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        draw(lastPosition.x, lastPosition.y, offsetX, offsetY);
        setLastPosition({ x: offsetX, y: offsetY });
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const handleColorChange = (color) => {
        setColor(color.hex);
    };

    const handleLineWidthChange = (event) => {
        setLineWidth(event.target.value);
    };

    const handleRoomIdChange = (event) => {
        setRoomId(event.target.value);
    };

    const saveSession = async () => {
        const userId = localStorage.getItem('userId'); // Add this line back
        const token = localStorage.getItem('token');
        const data = canvasRef.current.toDataURL();
        setLoading(true);
        try {
            await axios.post('https://collabboard-backend.onrender.com/sessions/save', { data, roomId }, {
                headers: {
                    'x-auth-token': token
                }
            });
            toast.success('Session saved successfully');
        } catch (error) {
            console.error('Error saving session:', error);
            toast.error('Error saving session');
        } finally {
            setLoading(false);
        }
    };

    const loadSession = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);
        try {
            const response = await axios.get(`https://collabboard-backend.onrender.com/sessions/load/${roomId}`, {
                headers: {
                    'x-auth-token': token
                }
            });
            const data = response.data[0].data;
            const img = new Image();
            img.src = data;
            img.onload = () => {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                context.drawImage(img, 0, 0);
            };
            toast.success('Session loaded successfully');
        } catch (error) {
            console.error('Error loading session:', error);
            toast.error('Error loading session');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on('drawing', ({ x0, y0, x1, y1, color, lineWidth }) => {
                draw(x0, y0, x1, y1, false);
                console.log('Drawing received', { x0, y0, x1, y1, color, lineWidth });
            });
        }
    }, [socket]);

    return (
        <div className="whiteboard-container">
            <ToastContainer />
            {loading && <div className="loading">Loading...</div>}
            <header className="whiteboard-header">
                <h1>Collab-Board</h1>
                <p>Collaborate in real-time with multiple users.</p>
                <button className="logout-button" onClick={onLogout}><FiLogOut /></button>
            </header>
            <div className="controls">
                <button className="control-button" onClick={() => setShowColorPicker(!showColorPicker)}><FiEdit3 /></button>
                <button className="control-button" onClick={() => setShowSettings(!showSettings)}><FiSettings /></button>
            </div>
            {showColorPicker && (
                <div className="color-picker">
                    <SketchPicker color={color} onChangeComplete={handleColorChange} />
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={lineWidth}
                        onChange={handleLineWidthChange}
                    />
                    <button className="close-button" onClick={() => setShowColorPicker(false)}>Close Picker</button>
                </div>
            )}
            {showSettings && (
                <div className="settings">
                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        value={roomId}
                        onChange={handleRoomIdChange}
                        className="room-input"
                    />
                    <li></li>
                    <button className="control-button small" onClick={saveSession}>Save Session</button>
                    <li></li>
                    <button className="control-button small" onClick={loadSession}>Load Session</button>
                    <button className="close-button" onClick={() => setShowSettings(false)}>Close</button>
                </div>
            )}
            <canvas
                ref={canvasRef}
                width={1200}
                height={800}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={handleMouseMove}
                className="whiteboard"
            />
        </div>
    );
};

export default Whiteboard;
