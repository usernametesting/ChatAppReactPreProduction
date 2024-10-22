// ChatArea.tsx
import React, { useEffect, useRef } from 'react';
import './ChatArea.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import MessageItem from '../MessageItem/MessageItem';



const ChatArea: React.FC = () => {

  const chatAreaRef = useRef<HTMLDivElement>(null);


  const { selectedFriend, selectedUserId } = useSelector((state: RootState) => state.users);


  useEffect(() => {
    if (chatAreaRef.current)
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
  }, [selectedFriend, selectedUserId])




  return (
    <div id='chat-area' className="chat-area" ref={chatAreaRef}>
      {selectedUserId != 0 ? (<MessageItem {...selectedFriend} />) : (
        <div id='notSelectedFriend'>Select a friend to start chatting</div>)}
    </div>
  );
};

export default ChatArea;

