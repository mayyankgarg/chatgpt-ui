import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaArrowUp, FaSquare } from 'react-icons/fa';

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors['green-pea']['950']};
`;

const LeftColumn = styled.div`
  flex: 2;
`;

const MiddleColumn = styled.div`
  flex: 6;
  display: flex;
  align-items: center;
`;

const RightColumn = styled.div`
  flex: 2;
`;

const TextareaWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 3px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors['green-pea']['900']};
`;

const Textarea = styled.textarea`
  flex: 1;
  padding: 10px;
  border: none;
  resize: none;
  line-height: 1.5;
  overflow-y: auto;
  height: auto;
  max-height: 150px; /* Adjust as needed for 7-8 lines */
  min-height: 40px; /* Ensures the textarea starts with a small height */
  box-sizing: border-box;
  text-align: left; /* Left align the text */
  vertical-align: middle; /* Vertically center the text */
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors['green-pea']['200']};

  &::placeholder {
    color: ${({ theme }) => theme.colors['green-pea']['400']};
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  border: none;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors['green-pea']['50']};
  color: ${({ theme }) => theme.colors['green-pea']['950']};
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.colors['green-pea']['50']};
    color: ${({ theme }) => theme.colors['green-pea']['950']};
    cursor: not-allowed;
  }
`;

const BlankIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors['green-pea']['50']};
`;

const MessageInput = ({ onSendMessage, disabled }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (text.trim() !== '') {
      onSendMessage(text);
      setText('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
    }
  }, [text]);

  return (
    <InputContainer>
      <LeftColumn />
      <MiddleColumn>
        <TextareaWrapper>
          <BlankIcon />
          <Textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows="1"
          />
          <Button onClick={handleSend} disabled={disabled}>
            {disabled ? <FaSquare /> : <FaArrowUp />}
          </Button>
        </TextareaWrapper>
      </MiddleColumn>
      <RightColumn />
    </InputContainer>
  );
};

export default MessageInput;
