// pages/index.js
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import logo from '../public/logo.png';



export default function Home() {
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState(null);
    const [products, setProducts] = useState([]);

 useEffect(() => {
        axios.get('http://localhost:3001/api/products')
            .then((response) => setProducts(response.data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);
   
    
useEffect(() => {
        // Conecta al servidor WebSocket del chatbot en el puerto 3002
        const socket = new WebSocket('ws://localhost:3002');
        setWs(socket);

        // Configura el manejo de mensajes entrantes
        socket.onmessage = (event) => {
            setChatMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: event.data }]);
        };

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== '' && ws) {
            ws.send(message);
            setChatMessages((prevMessages) => [...prevMessages, { sender: 'user', text: message }]);
            setMessage('');
        }
    };

    return (
        <div className="container">
            <header className="my-4 text-center">
            </header>

            <Head>
                               
                <title>Namun Calzado - Tu Raíz Viva</title>
                <meta name="description" content="Compra calzado de calidad para hombres y mujeres. Estilo y comodidad en Namun Calzado." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            
            {/* Sección de productos */}
            <div className="row">
                {products.map((product) => (
                    <div key={product.ProductoID} className="col-md-4 mb-4">
                        <div className="card">
                            <img src = {product.Image} className="card-img-top" alt={product.Marca} />
                            <div className="card-body">
                                <h5 className="card-title">{product.Modelo}</h5>
                                <p className="card-text">{product.Tipo}</p>
                                <p className="card-text">${product.Precio}</p>
                                <button className="btn btn-primary">Comprar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />

            <div className="virtual-assistant">
                <button className="btn btn-secondary" onClick={() => setChatOpen(!chatOpen)}>
                    {chatOpen ? 'Cerrar Asistente' : '¿Necesitas ayuda?'}
                </button>
                {chatOpen && (
                    <div className="chat-window">
                        <div className="chat-messages">
                            {chatMessages.map((msg, index) => (
                                <p key={index} className={msg.sender === 'bot' ? 'bot-message' : 'user-message'}>
                                    {msg.text}
                                </p>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                        />
                        <button className="btn btn-primary" onClick={sendMessage}>Enviar</button>
                    </div>
                )}
            </div>
        </div>
    );

};
