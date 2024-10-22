import React, { useEffect, useState } from 'react';
import { User } from '../../../types/Users/user';
import './MessageItem.css';
import { renderMessageContent } from '../../../services/internals/Messages/renderMessageContent';
import { getMessageStatusIcon } from '../../../services/internals/Messages/getMessageStatusIcon';
import ConfirmModal from '../../Modals/ConfirmModal/ConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { deleteMessage, deleteUserMessage } from '../../../store/userSlice';
import { MessageDTO } from '../../../types/Messages/Message';
import { MessageState } from '../../../enums/Messages/MessageState';

const MessageItem: React.FC<User> = (userModel?: User) => {

  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(0);
  const { selectedUserId } = useSelector((state: RootState) => state.users);


  const handleRightClick = (message:MessageDTO) => {
    if (message.isSender && message.state!=MessageState.DELETED) {
      setSelectedMessageId(message.id ?? 0);
      setShow(true);
    }
  };
  useEffect(() => {
  }, [])
  const handleConfirmDelete = async () => {
    if (selectedMessageId != 0) {
      dispatch(deleteUserMessage(selectedMessageId));
      setShow(false);
      await dispatch(deleteMessage({ msgId: selectedMessageId, userId: selectedUserId }));
    }
  }

  
  return (
    <>
      {userModel?.messages?.map((message, index) => (
        <div key={index} className={message.isSender ? 'your-chat' : 'friends-chat'} onContextMenu={() => handleRightClick(message)}>
          {!message.isSender && (
            <div className="profile friends-chat-photo">
              <img src={userModel.profImageUrl} alt="image" />
            </div>
          )}
          <div className={message.isSender ? 'your-chat-balloon' : 'friends-chat-content'}>
            <p className={message.isSender ? '' : 'friends-chat-name'}>{!message.isSender && userModel.userName}</p>
            {renderMessageContent(message)}
            <h5 className="chat-datetime" style={{ display: "flex", justifyContent: "space-between" }}>
              {new Date(message.createdDate).toLocaleTimeString()}
              {message.isSender && (
                <span className="message-status-icon">
                  {getMessageStatusIcon(message.state)}
                </span>
              )}
            </h5>
          </div>
        </div>
      ))}

      {show && <ConfirmModal
        onClose={() => setShow(false)}
        onConfirm={handleConfirmDelete}
      />}
    </>
  );
};

export default MessageItem;
