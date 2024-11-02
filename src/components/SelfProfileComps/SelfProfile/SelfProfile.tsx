import React, { useState } from 'react';
import './SelfProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { setComponent } from '../../../store/dynamicComponentRenderSlice';
import Settings from '../Settings/Settings';
import ChatList from '../../ChatListComps/ChatList/ChatList';

const SelfProfile: React.FC = () => {
    const { currentlyUser } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();
    const [isFocus, setIsFocus] = useState<boolean>(true);


    const handleClick = () => {
        isFocus ?
            dispatch(setComponent(<Settings />)) :
            dispatch(setComponent(<ChatList />));
        setIsFocus(!isFocus);
    };

    return (
        <div id="self-info" className="self-info" >
            <div style={{ display: "flex" }}>
                <div className="profile your-photo">
                    <img src={currentlyUser.profImageUrl} alt="image" />
                </div>
                <div className="friends-credent name" >
                    <span className="friends-name">{currentlyUser?.userName}</span>
                    <span style={{ fontSize: '12px' }} className="friends-name">
                        {
                            (currentlyUser?.biografy == null || currentlyUser?.biografy == ' ') ? ('Hey there! I am using Chat') : (currentlyUser.biografy.substring(0,30)+"...")
                        }
                    </span>
                </div>
            </div>
            <button onClick={handleClick}
                id='btn-settings'
                style={{ backgroundColor: "transparent", padding: "5px" }}>
                <span className="glyphicon glyphicon-cog"></span>
            </button>
        </div>
    );
};

export default SelfProfile;
