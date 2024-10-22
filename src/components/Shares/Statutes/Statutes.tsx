import React from 'react';
import './Statuses.css';
import AddMyStatus from '../AddStatus/AddStatus';
import FriendsStatuses from '../FriendsStatus/FriendStatus';
import ShowMyStatutes from '../ShowMyStatuses/ShowMyStatuses';

const Statuses: React.FC = () => {
  return (
    <div className="statuses-page">
      <AddMyStatus />
      <ShowMyStatutes/>
      <FriendsStatuses />
    </div>
  );
};

export default Statuses;
