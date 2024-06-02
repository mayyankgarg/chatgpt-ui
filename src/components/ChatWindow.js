import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Message from './Message';

const ChatWindowContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors['green-pea']['950']};
`;

const LeftColumn = styled.div`
  flex: 2;
`;

const MiddleColumn = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Makes the middle column scrollable */
  max-height: 80vh; /* Adjust as needed to fit your design */

  /* Hide scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for other browsers */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const RightColumn = styled.div`
  flex: 2;
`;

const LoaderContainer = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px; /* Adjust spacing as needed */
  margin-top: 10px; /* Added space above the loader */
`;

const TypingContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%; /* Occupies the full width of the middle column */
`;

const ChatWindow = ({ messages, typingMessage, typingIndex, isWaitingForResponse, responseLoaderColor, responseStreamLoaderColor, onEditMessage }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isWaitingForResponse, typingMessage]);

  return (
    <ChatWindowContainer>
      <LeftColumn />
      <MiddleColumn>
        {messages.map((message) => (
          <Message key={message.id} message={message} onEditMessage={onEditMessage} />
        ))}
        {isWaitingForResponse && !typingMessage && (
          <LoaderContainer>
            <l-quantum size="75" speed="1.75" color={responseLoaderColor}></l-quantum>
          </LoaderContainer>
        )}
        {typingMessage && (
          <TypingContainer>
            <Message message={typingMessage} />
            <LoaderContainer>
              <l-leapfrog size="20" speed="5.0" color={responseStreamLoaderColor}></l-leapfrog>
            </LoaderContainer>
          </TypingContainer>
        )}
        <div ref={messagesEndRef} />
      </MiddleColumn>
      <RightColumn />
    </ChatWindowContainer>
  );
};

export default ChatWindow;
