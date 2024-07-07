import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './ChatContainer.css';

const ChatContainer = () => {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async (text) => {
        const newUserMessage = { text, sender: 'user', timestamp: new Date() };
        setMessages(prevMessages => [...prevMessages, newUserMessage]);

        try {
            const response = await fetch('http://localhost:3001/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }), // Send the user-provided text
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const newBotMessage = { text: data.response, sender: 'bot', timestamp: new Date() };
            setMessages(prevMessages => [...prevMessages, newBotMessage]); // Update state with bot's response
        } catch (error) {
            console.error('Error sending message:', error);
        }
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
