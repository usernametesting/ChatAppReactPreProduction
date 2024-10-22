import React, { useEffect, useState } from 'react';
import './VideoCarousel.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import { StatusType } from '../../../../enums/Statuses/StatusType';
import { setComponent } from '../../../../store/dynamicComponentRenderSlice';
import Statuses from '../../Statutes/Statutes';
import { MessageDTO } from '../../../../types/Messages/Message';
import { MessageType } from '../../../../enums/Messages/MessageType';
import { addMessageToSelectedUser, addWathcerToStatusSlice } from '../../../../store/userSlice';
import { addWathcerToStatus, sendMessage } from '../../../../store/messageSlice';
import { MessageState } from '../../../../enums/Messages/MessageState';

const VideoCarousel: React.FC = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const { selectedFriend } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();
    const [MessageContent, setMessageContent] = useState<string>("");
    const { focusedUserIds, friends } = useSelector((state: RootState) => state.users);
    const { currentlyUser } = useSelector((state: RootState) => state.users);

    const currentStatus = selectedFriend.statuses ? selectedFriend.statuses[currentVideoIndex] : null;

    useEffect(() => {
        const post = async () => {
            if (!(currentStatus?.watchedUserIds?.split(',').includes(currentlyUser.id.toString()))) {
                dispatch(addWathcerToStatusSlice({ statusId: currentStatus?.id }));
                await dispatch(addWathcerToStatus({ statusId: currentStatus?.id, userId: parseInt(currentlyUser.id) }));
            }
        };
        post();
    }, [currentStatus])
    const handleNext = () => {
        if (selectedFriend.statuses && currentVideoIndex < selectedFriend.statuses.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentVideoIndex > 0) {
            setCurrentVideoIndex(currentVideoIndex - 1);
        }
    };

    const handleSendBtn = async () => {
        if (MessageContent.trim()) {
            const newMessage: MessageDTO = {
                message: MessageContent,
                isSender: true,
                messageType: MessageType.REPLIED,
                createdDate: new Date(),
                toUserId: parseInt(selectedFriend.id),
                state: getCurrentMessageState()
            };

            await dispatch(addMessageToSelectedUser(newMessage));
            await dispatch(sendMessage(newMessage));
            setMessageContent("");
        }


    }
    const getCurrentMessageState = (): MessageState => {
        if (focusedUserIds.includes(parseInt(selectedFriend.id)))
            return MessageState.SEEN
        else if ((friends.filter(f => f.id == parseInt(selectedFriend.id).toString()))[0]?.isOnline)
            return MessageState.NOTIFIED;
        else
            return MessageState.SENT;
    };

    return (
        <div className="video-carousel-container">


            <div className="header">
                <div className="friend-info">
                    <img src={selectedFriend.profImageUrl} alt="image" className="friend-profile-image" />
                    <span>{selectedFriend.userName}</span>
                    {currentStatus?.createdDate && (
                        <small>
                            {new Date(currentStatus?.createdDate).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12:
                                    false
                            })}
                        </small>
                    )}
                    <button className="close-btn" onClick={() => dispatch(setComponent(<Statuses />))}>Close</button>
                </div>

            </div>

            <div className="media-container" style={{}}>
                {currentStatus?.statusType == StatusType.VIDEO ? (
                    <video width="100%" controls autoPlay>
                        <source src={currentStatus.mediaUrl} type="video/mp4" />
                        Your browser does not support HTML video.
                    </video>
                ) : (
                    <img id='status-img' src={currentStatus?.mediaUrl} alt="image" className="image-status" />
                )}


            </div>
            <div className="reply-box">
                <button onClick={handlePrev} className="control-btn">❮</button>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <input value={MessageContent} onChange={(e) => setMessageContent(e.target.value)} type="text" placeholder="Type a reply..." className="reply-input" />
                    <button onClick={handleSendBtn} className="send-btn">➤</button>
                </div>
                <button onClick={handleNext} className="control-btn">❯</button>
            </div>




        </div>
    );
};

export default VideoCarousel;
