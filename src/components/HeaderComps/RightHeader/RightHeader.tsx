import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import FriendPersonalModal from '../../Modals/FriendPersonal/FriendPersonalModal';
import './RightHeader.css';
import { setMainLeftComponent } from '../../../store/dynamicComponentRenderSlice';
import LeftPanel from '../../LeftPanelComps/LeftPanel/LeftPanel';
import { setSelectedFriend } from '../../../store/userSlice';

const RightHeader: React.FC = () => {
  const { friends, selectedUserId, selectedFriend, focusedUserIds } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (selectedUserId != 0)
      dispatch(setSelectedFriend(friends.filter(u => u.id == selectedUserId.toString())[0]));
  }, [friends, selectedUserId, focusedUserIds]);

  const handleCloseChat = () => {
    dispatch(setMainLeftComponent(<LeftPanel />));
  };

  return (
    <div id="header-right" className="header-right">
      <div className="header-content">

        <div className="profile-info">
          <button id="btn-close-chat" onClick={handleCloseChat} className="arrow btn btn-default">
            <i className="glyphicon glyphicon-arrow-left header-elements" style={{ fontSize: '24px' }}></i>
          </button>

          <a id="header-img" className="profile header-img" data-toggle="modal" data-target="#friendPersonalModal">
            <img src={selectedFriend?.profImageUrl} alt="image" />
          </a>
          <div className="user-details">
            <h5 className="name friend-name header-elements">{selectedFriend?.userName}</h5>
            {selectedFriend?.biografy && (
              <h5 className="friend-biography header-elements" style={{ marginTop: '5px' }}>
                {selectedFriend?.biografy}
              </h5>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>

          <h4 style={{ textAlign: "center" }}>

            {focusedUserIds.includes(parseInt(selectedFriend?.id))
              ? "in your chat"
              : selectedFriend?.isOnline
                ? "online"
                :('last seen '+ selectedFriend?.lastActivityDate)}
          </h4>

          {/* <div className="some-btn">
            <span className="glyphicon glyphicon-option-vertical option-btn"></span>
          </div> */}
        </div>
      </div>

      <FriendPersonalModal />
    </div>
  );
};

export default RightHeader;
