import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { v4 as uuidv4 } from 'uuid';
import './ChatContainer.css';

const ChatContainer = () => {
    const [messages, setMessages] = useState([]);
    const [conversationId, setConversationId] = useState(uuidv4());

    const handleSendMessage = async (text) => {
        const newUserMessage = { text, sender: 'user', timestamp: new Date() };
        setMessages(prevMessages => [ newUserMessage,...prevMessages,]);

        try {
            const response = await fetch('http://localhost:3001/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text, conversationId }), // Send the user-provided text and conversationId
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const newBotMessage = { text: data.response, sender: 'bot', timestamp: new Date() };
            setMessages(prevMessages => [ newBotMessage,...prevMessages]); // Update state with bot's response
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleNewChat = () => {
        setMessages([]);
        setConversationId(uuidv4()); // Generate a new UUID for the new conversation
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
