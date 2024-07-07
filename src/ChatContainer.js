import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './ChatContainer.css';

const ChatContainer = () => {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async (text) => {
        const newMessage = { text, sender: 'user', timestamp: new Date() };
        setMessages([...messages, newMessage]);

        fetch('http://localhost:3001/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: 'Hello' }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
    };


    const handleNewChat = () => {
        setMessages([]);
    };

    return (
        <div className="chat-container">
            <MessageList messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
            <button className="new-chat-button" onClick={handleNewChat}>
                Start New Chat
            </button>
        </div>
    );
};

export default ChatContainer;
