import React, { useEffect } from 'react';
import '../FriendsStatus/FriendsStatuse.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { getAllUsers, setSelectedFriend } from '../../../store/userSlice';
import { User } from '../../../types/Users/user';
import VideoCarousel from '../ShowStatuses/Friends/VideoCarousel';
import { setComponent } from '../../../store/dynamicComponentRenderSlice';



const FriendsStatuses: React.FC = () => {
  const { friends, hasChanges } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getAllUsers());
    }
    fetch();
  }, [hasChanges]);


  const handleStatusClick = (friend: User) => {
    dispatch(setSelectedFriend(friend));
    dispatch(setComponent(<VideoCarousel />))
  };

  return (
    <div className="friends-statuses">
      <h4>Statuses</h4>
      {friends?.map(friend => {
        if (  friend.statuses && friend.statuses.length>0) {
          const degreePerSegment = 360 / friend.statuses.length;
          const gap = 10;

          return (
            <div key={friend.id} className="friend-status" onClick={() => handleStatusClick(friend)}>
              <div
                className="status-circle"
                style={{
                  background: `conic-gradient(
                  ${Array(friend.statuses!.length)
                      .fill(0)
                      .map((_, index) => `green ${index * degreePerSegment}deg ${(index + 0.7) * degreePerSegment - gap}deg, #ddd ${(index + 1) * degreePerSegment - gap}deg ${(index + 1) * degreePerSegment}deg`)
                      .join(', ')}`,
                }}
              >
                <a className="profile header-img friend-profile-image" >
                  <img src={friend.profImageUrl} alt="image"/>
                </a>
              </div>
              <span style={{ fontSize: '18px', marginLeft: '5px' }}>{friend.userName}</span>


            </div>
          );
        }
      })}

    </div>
  );
};

export default FriendsStatuses;
