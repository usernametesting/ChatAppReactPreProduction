import React, { useEffect, useState } from 'react';
import '../Friends/VideoCarousel.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import { StatusType } from '../../../../enums/Statuses/StatusType';
import { setComponent } from '../../../../store/dynamicComponentRenderSlice';
import Statuses from '../../Statutes/Statutes';
import { deleteCurrentlyUserStatus, deleteStatus, setLoadingState, setSelectedUserId } from '../../../../store/userSlice';
import { FaEye } from 'react-icons/fa';


const MyVideoCarousel: React.FC = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const { currentlyUser, friends } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();
    const [showWatchedUsers, setShowWatchedUsers] = useState(false);

    const currentStatus = currentlyUser.statuses ? currentlyUser.statuses[currentVideoIndex] : null;

    useEffect(() => {
    }, [currentStatus])
    const handleNext = () => {
        if (currentlyUser.statuses && currentVideoIndex < currentlyUser.statuses.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentVideoIndex > 0) {
            setCurrentVideoIndex(currentVideoIndex - 1);
        }
    };



    const handleDeleteStatus = async () => {
        if (currentStatus?.id) {
            dispatch(setLoadingState(true));
            dispatch(deleteCurrentlyUserStatus(currentStatus.id));
            await dispatch(deleteStatus(currentStatus.id));
            dispatch(setComponent(<Statuses />))
            dispatch(setLoadingState(false));
        }
    };

    const handleWatchedUsers = () => {
        setShowWatchedUsers(!showWatchedUsers);
    };

    return (
        <div className="video-carousel-container">


            <div className="header">
                <div className="friend-info">
                    <img src={currentlyUser.profImageUrl} alt="image" className="friend-profile-image" />
                    <span>{currentlyUser.userName}</span>
                    {currentStatus?.createdDate && (
                        <small>
                            {new Date(currentStatus?.createdDate).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12:
                                    false
                            })}
                        </small>
                    )}                    <button className="close-btn" onClick={() => dispatch(setComponent(<Statuses />))}>Close</button>
                    <button className="close-btn" onClick={handleDeleteStatus}>Delete</button>
                </div>
                <button data-toggle="modal" data-target="#watchedUsersModal" onClick={handleWatchedUsers} className="watch-btn" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaEye />
                    <span className="watch-count">{currentStatus?.watchedUserIds?.split(',').length}</span>
                </button>
            </div>

            <div className="media-container" style={{ display: 'flex', flexDirection: 'column' }}>
                {currentStatus?.statusType == StatusType.VIDEO ? (
                    <video width="100%" controls autoPlay>
                        <source src={currentStatus.mediaUrl} type="video/mp4" />
                        Your browser does not support HTML video.
                    </video>
                ) : (
                    <img id='status-img' src={currentStatus?.mediaUrl} alt="image" className="image-status" />
                )}

            </div>

            <button onClick={handlePrev} className="control-btn">❮</button>
            <button onClick={handleNext} className="control-btn">❯</button>

            <div id="watchedUsersModal" className="modal fade" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div style={{ backgroundColor: '#001F3F', overflowY: 'auto' }} className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">Watched Users</h4>
                        </div>

                        <div style={{ backgroundColor: '#001F3F' }} className="chat-list">
                            {friends?.map((friend, index) => (
                                currentStatus?.watchedUserIds?.includes(friend.id.toString()) &&
                                <div id={index.toString()} onClick={() => setSelectedUserId(parseInt(friend.id))} className="friends contacts" style={{ color: 'white', display: "flex", justifyContent: "space-between" }}>
                                    <div className='item' style={{ display: "flex", color: "white", justifyContent: 'space-between', width: '100%' }}>
                                        <div style={{ display: "flex", color: "white" }}>
                                            <div className="profile friends-photo" >
                                                <img src={friend.profImageUrl} alt="image" />
                                            </div>
                                            <div className="friends-credent name" >
                                                <span className="friends-name">{friend.userName}</span>
                                                <span style={{ fontSize: '12px' }} className="friends-name">
                                                    {friend.biografy}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyVideoCarousel;
