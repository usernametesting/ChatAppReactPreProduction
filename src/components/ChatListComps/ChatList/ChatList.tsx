import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FriendItem from '../FriendItem/FriendItem';
import './ChatList.css';
import { changeMessageState, getAllUsers, setSelectedUserId } from '../../../store/userSlice';
import { RootState, AppDispatch } from '../../../store/store';
import { setMainLeftComponent } from '../../../store/dynamicComponentRenderSlice';
import RightPanel from '../../RightPanelComps/RightPanel/RightPanel';

const ChatList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { friends, error, selectedUserId, hasChanges } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [hasChanges])

  useEffect(() => {
    if (selectedUserId != 0)
      dispatch(changeMessageState(selectedUserId));

  }, [selectedUserId]);


  const handleUserClick = (id: string) => {
    dispatch(setSelectedUserId(parseInt(id)));
    if (window.innerWidth <= 680)
      dispatch(setMainLeftComponent(<RightPanel />));
  };

  
  if (error) return <div style={{color:'white'}}>Error: {error}</div>;

  return (
    <div id='chat-list' className="chat-list">
      {friends&& friends?.map((friend) => (
        <div className={`${selectedUserId == parseInt(friend.id) ? 'list-active' : ''}`} key={friend.id} onClick={() => handleUserClick(friend.id)}>
          <FriendItem {...friend} />
        </div>
      ))}
    </div>
  );
};

export default ChatList;
