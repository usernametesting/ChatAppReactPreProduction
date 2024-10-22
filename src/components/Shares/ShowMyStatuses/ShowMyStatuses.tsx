import React, { useEffect } from 'react';
import '../FriendsStatus/FriendsStatuse.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { setComponent } from '../../../store/dynamicComponentRenderSlice';
import { getCurrentlyUser } from '../../../store/userSlice';
import MyVideoCarousel from '../ShowStatuses/CurrentlyUser/MyVideoCarousel';



const ShowMyStatutes: React.FC = () => {
    const { currentlyUser, hasChanges } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetch = async () => {
            await dispatch(getCurrentlyUser());
        };

        fetch();
    }, [hasChanges])



    const handleStatusClick = () => {
        dispatch(setComponent(<MyVideoCarousel />))
    };

    return (
        currentlyUser.statuses && currentlyUser.statuses.length > 0 ? (
            <div className="friends-statuses">
                <h4>My Statuses</h4>

                <div key={currentlyUser.id} className="friend-status" onClick={() => handleStatusClick()}>
                    <div
                        className="status-circle"
                        style={{
                            background: `conic-gradient(
                    ${Array(currentlyUser.statuses!.length)
                                    .fill(0)
                                    .map((_, index) => `green ${index * (360 / currentlyUser.statuses!.length)}deg ${(index + 0.7) * (360 / currentlyUser.statuses!.length) - 5}deg, #ddd ${(index + 1) * (360 / currentlyUser.statuses!.length) - 5}deg ${(index + 1) * (360 / currentlyUser.statuses!.length)}deg`)
                                    .join(', ')}`,
                        }}
                    >
                        <a className="profile header-img friend-profile-image">
                            <img src={currentlyUser.profImageUrl} alt="image" />
                        </a>
                    </div>
                    <span style={{ fontSize: '18px', marginLeft: '5px' }}>{currentlyUser.userName}</span>
                </div>
            </div>
        ) : null
    );

};

export default ShowMyStatutes;
