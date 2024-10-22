import './NotSelectedUser.css'
import React from 'react';
import { FaComments } from 'react-icons/fa'; 

const NotSelectedUser: React.FC = () => {

    return (
        <div id="main-right" className="main-right not-selected-user">
            <FaComments style={{width:"100%"}} className="icon-chat" />
            <h3>Select a friend to start chat</h3>
        </div>
    );
};

export default NotSelectedUser;