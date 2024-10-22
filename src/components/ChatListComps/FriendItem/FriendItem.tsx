
import React from 'react';
import { User } from '../../../types/Users/user';
import './FriendItem.css';
import { getMessageStatusIcon } from '../../../services/internals/Messages/getMessageStatusIcon';
import { renderMessageContentAsText } from '../../../services/internals/Messages/renderMessageContentAsText';

const FriendItem: React.FC<User> = (userModel: User) => {
  return (
    <div id='firends' className="friends" style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex" }}>
        <div className="profile friends-photo">
          <img src={userModel.profImageUrl} alt="image" />
        </div>
        <div className="friends-credent left-friend">
          <div style={{display:'flex',gap:'5px',alignItems:'center'}}>
            <span className="friends-name">{userModel.userName}</span>
            <div className={`friends-status ${userModel.isOnline ? 'online' : 'offline'}`}></div>
          </div>

          <span
            className="friends-Message"
            style={userModel.unreadMessageCount > 0 ? { fontFamily: "monospace", color: "white", fontSize: "17px" } : {}}
          >
            {renderMessageContentAsText(userModel.messages.slice(-1)[0])}
          </span>

        </div>

      </div>

      {

        userModel.unreadMessageCount > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}>
            <span className="badge notif-badge" style={{ backgroundColor: "green", padding: "8px", fontSize: "15px" }}>
              {userModel.unreadMessageCount}
            </span>
            {/* <div className={`friends-status ${userModel.isOnline ? 'online' : 'offline'}`}></div> */}
          </div>
        ) : (
          userModel.messages.slice(-1)[0]?.isSender ? (
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}>
              <div>{getMessageStatusIcon(userModel.messages.slice(-1)[0]?.state)}</div>
              {/* <div className={`friends-status ${userModel.isOnline ? 'online' : 'offline'}`}></div> */}
            </div>

          ) : (
            null
            // <div className={`friends-status ${userModel.isOnline ? 'online' : 'offline'}`}></div>
          )
        )
      }


    </div>
  );
};

export default FriendItem;
