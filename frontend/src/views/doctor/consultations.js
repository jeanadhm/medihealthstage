import React, { useState, useRef, useEffect } from 'react';

const Doctorchat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                text: message,
                timestamp: new Date().toISOString(),
            };

            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage('');
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    return (
        <div className="chat-container" style={styles.chatContainer}>
            <div className="messages" style={styles.messages}>
                {messages.map((msg, index) => (
                    <div key={index} className="message" style={styles.message}>
                        <p style={styles.text}>{msg.text}</p>
                        <small style={styles.timestamp}>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-container" style={styles.inputContainer}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Écrivez votre message..."
                    style={styles.input}
                />
                <button onClick={handleSendMessage} style={styles.button}>Envoyer</button>
            </div>
        </div>
    );
};

const styles = {
    chatContainer: {
        
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#37474F',
        padding: '10px',
        boxSizing: 'border-box',
    },
    messages: {
        flex: 1,
        overflowY: 'auto',
        marginBottom: '10px',
        backgroundColor: '#607D8B', // bluegray-500
        padding: '10px',
        borderRadius: '8px',
    },
    message: {
        marginBottom: '10px',
        padding: '5px',
        borderRadius: '5px',
        backgroundColor: '#CFD8DC', // bluegray-100 for contrast
    },
    text: {
        margin: 0,
    },
    timestamp: {
        fontSize: '0.75em',
        color: '#455A64',
        textAlign: 'right',
    },
    inputContainer: {
        display: 'flex',
    },
    input: {
        flex: 1,
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #B0BEC5',
        marginRight: '10px',
        backgroundColor: '#ECEFF1', // Slightly lighter for the input background
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#37474F', // bluegray-800
        color: 'white',
        cursor: 'pointer',
    }
};

export default Doctorchat;
