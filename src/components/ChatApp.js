import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';

const ChatAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors['green-pea']['950']};
`;

const ChatApp = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState([]);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [typingMessage, setTypingMessage] = useState(null);

  const handleSendMessage = (text) => {
    const newMessage = { text, sender: 'user', id: messages.length + 1 };
    setMessages([...messages, newMessage]);
    setIsWaitingForResponse(true);

    // Simulate a response from ChatGPT
    const response = `Echo: ${text}`;
    const words = response.split(' ');

    let currentWordIndex = 0;
    const typeWordByWord = () => {
      if (currentWordIndex < words.length) {
        setTypingMessage((prev) => ({
          ...prev,
          text: prev ? `${prev.text} ${words[currentWordIndex]}` : words[currentWordIndex],
        }));
        currentWordIndex += 1;
        setTimeout(typeWordByWord, 30); // Adjust typing speed here
      } else {
        setMessages((prevMessages) => [...prevMessages, { ...typingMessage, text: response }]);
        setTypingMessage(null);
        setIsWaitingForResponse(false);
      }
    };

    setTimeout(() => {
      setTypingMessage({ text: '', sender: 'bot', id: messages.length + 2 });
      setIsWaitingForResponse(false); // Remove the initial loader
      setTimeout(typeWordByWord, 500); // Initial delay before typing starts
    }, 2000); // Simulated server response time
  };

  const handleEditMessage = (id, newText) => {
    const editedMessages = messages.map((msg) => (msg.id === id ? { ...msg, text: newText } : msg));
    const editedIndex = editedMessages.findIndex((msg) => msg.id === id);
    setMessages(editedMessages.slice(0, editedIndex + 1)); // Remove all messages after the edited one

    // Simulate a new response from ChatGPT based on the edited message
    const response = `Echo: ${newText}`;
    const words = response.split(' ');

    let currentWordIndex = 0;
    const typeWordByWord = () => {
      if (currentWordIndex < words.length) {
        setTypingMessage((prev) => ({
          ...prev,
          text: prev ? `${prev.text} ${words[currentWordIndex]}` : words[currentWordIndex],
        }));
        currentWordIndex += 1;
        setTimeout(typeWordByWord, 30); // Adjust typing speed here
      } else {
        setMessages((prevMessages) => [...prevMessages, { ...typingMessage, text: response }]);
        setTypingMessage(null);
        setIsWaitingForResponse(false);
      }
    };

    setTimeout(() => {
      setTypingMessage({ text: '', sender: 'bot', id: editedIndex + 2 });
      setIsWaitingForResponse(false); // Remove the initial loader
      setTimeout(typeWordByWord, 500); // Initial delay before typing starts
    }, 2000); // Simulated server response time
  };

  return (
    <ChatAppContainer>
      <ChatWindow
        messages={messages}
        typingMessage={typingMessage}
        isWaitingForResponse={isWaitingForResponse}
        responseLoaderColor={theme.colors['green-pea']['500']}
        responseStreamLoaderColor={theme.colors['green-pea']['100']}
        onEditMessage={handleEditMessage}
      />
      <MessageInput onSendMessage={handleSendMessage} disabled={isWaitingForResponse} />
    </ChatAppContainer>
  );
};

export default ChatApp;
