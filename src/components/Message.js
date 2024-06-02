import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaPen, FaArrowUp, FaTimes } from 'react-icons/fa';


const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ sender }) => (sender === 'user' ? 'flex-end' : 'flex-start')};
  margin-bottom: 2px;
  position: relative;
  padding-bottom: ${({ sender }) => (sender === 'user' ? '20px' : 'none')};

  &:hover .edit-icon {
    display: ${({ sender }) => (sender === 'user' ? 'block' : 'none')};
  }
`;

const MessageBubble = styled.div`
  max-width: ${({ sender }) => (sender === 'user' ? '75%' : '100%')};
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ sender, theme }) => (sender === 'user' ? theme.colors['green-pea']['900'] : theme.colors['green-pea']['950'])};
  color: ${({ theme }) => theme.colors['green-pea']['200']};
  white-space: pre-wrap; /* Preserves new lines and tabs */
  position: relative;
`;

const EditIcon = styled(FaPen)`
  display: none;
  position: absolute;
  bottom: 0px;
  right: 10px;  /* Position outside the message box on the left */
  cursor: pointer;
  color: ${({ theme }) => theme.colors['green-pea']['200']};
  font-size: 15px;
`;


const EditContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Textarea = styled.textarea`
  flex: 1;
  padding: 10px;
  border: none;
  resize: none;
  line-height: 1.5;
  overflow-y: auto;
  height: auto;
  box-sizing: border-box;
  text-align: left;
  vertical-align: middle;
  outline: none;
  background-color: ${({ theme }) => theme.colors['green-pea']['900']};
  color: ${({ theme }) => theme.colors['green-pea']['200']};
  white-space: pre-wrap; /* Preserves new lines and tabs */
  border-radius: 10px;
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
`;

const Message = ({ message, onEditMessage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.text);
  const textareaRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEditMessage(message.id, editedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(message.text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
    }
  }, [editedText]);

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('keyup', handleKeyUp);
    } else {
      document.removeEventListener('keyup', handleKeyUp);
    }
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isEditing]);

  return (
    <MessageContainer sender={message.sender} className = "message-container">
      {isEditing ? (
        <EditContainer>
          <Textarea
            ref={textareaRef}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="1"
          />
          <Button onClick={handleSave}><FaArrowUp /></Button>
          <Button onClick={handleCancel}><FaTimes /></Button>
        </EditContainer>
      ) : (
        <>
          <MessageBubble sender={message.sender}>{message.text}</MessageBubble>
          {message.sender === 'user' && <EditIcon className="edit-icon" onClick={handleEdit} />}
        </>
      )}
    </MessageContainer>
  );
};

export default Message;
