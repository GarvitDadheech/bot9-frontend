import React from 'react';
const Message = ({ message }) => {
  const { text, sender, timestamp } = message;
  const messageClass = sender === 'user' ? 'user-message' : 'bot-message';

  return (
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
      <span className="timestamp">{timestamp.toLocaleString()}</span>
    </div>
  );
};

export default Message;
