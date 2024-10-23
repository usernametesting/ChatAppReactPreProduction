// LeftHeader.tsx
import React from 'react';
import '../Header/Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import Contacts from '../../LeftPanelComps/Contacts/Contacts';
import { setComponent } from '../../../store/dynamicComponentRenderSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Statuses from '../../Shares/Statutes/Statutes';
import ChatList from '../../ChatListComps/ChatList/ChatList';
import { setLoadingState } from '../../../store/userSlice';
import { startVoiceCall } from '../../../services/signalR/signalRService';

const LeftHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUserId } = useSelector((state: RootState) => state.users);

  const handleContactBtnClick = () => {
    // dispatch(setLoadingState(true));
    dispatch(setComponent(<Contacts />));
    // dispatch(setLoadingState(false));
  }

  const handleStasusesClick = () => {
    dispatch(setLoadingState(true));

    dispatch(setComponent(<Statuses />));
    // setTimeout(() => {
    dispatch(setLoadingState(false));
    // }, 1000);

  }
  const handleChatClick = () => {
    // dispatch(setLoadingState(true));
    dispatch(setComponent(<ChatList />));
    // dispatch(setLoadingState(false));
  }

  return (
    <div className="header-left" style={{ display: 'flex', justifyContent: 'space-between' }}>

      <div style={{ display: 'flex' }}>
        <button onClick={handleContactBtnClick} style={{ backgroundColor: "transparent", border: 0 }}>
          <span className="glyphicon glyphicon-user contacts-btn"></span>
        </button>

        <button onClick={handleChatClick} style={{ backgroundColor: 'transparent', border: 0, color: 'white', fontSize: '22px' }} className="statuses-btn">
          <i className="fa fa-comment"></i>
        </button>

        <button onClick={handleStasusesClick} style={{ backgroundColor: 'transparent', border: 0, color: 'white', fontSize: '22px' }} className="statuses-btn">
          <i className="fa fa-bullseye"></i>
        </button>


        <button onClick={() => startVoiceCall(selectedUserId.toString())} style={{ backgroundColor: 'transparent', border: 0, color: 'white', fontSize: '22px' }}  className='statuses-btn'>
        <i className="fa fa-phone"></i> 
        </button>


      </div>

      {/* <span className="glyphicon glyphicon-option-vertical option-btn"></span> */}
    </div>
  );
};

export default LeftHeader;
