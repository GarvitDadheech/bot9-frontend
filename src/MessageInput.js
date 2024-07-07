import React, { useState } from 'react';
import './MessageInput.css';
const MessageInput = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <form className="message-input" onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type a message..."
      />
      <button className='btn' type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
