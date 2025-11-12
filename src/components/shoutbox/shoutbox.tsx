'use client'

import React, { useState } from 'react';
import './shoutbox.styles.css';

interface Message {
  id: number;
  username: string;
  text: string;
  timestamp: Date;
}

export default function Shoutbox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      username: 'Player1',
      text: 'Great game yesterday!',
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 2,
      username: 'Player2',
      text: 'Looking forward to playing again!',
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        username: 'You',
        text: newMessage.trim(),
        timestamp: new Date()
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="shoutbox">
      <div className="shoutbox-header">
        <h3>Shoutbox</h3>
      </div>
      <div className="shoutbox-messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <div className="message-header">
              <span className="username">{message.username}</span>
              <span className="timestamp">{formatTime(message.timestamp)}</span>
            </div>
            <div className="message-text">{message.text}</div>
          </div>
        ))}
      </div>
      <div className="shoutbox-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
} 