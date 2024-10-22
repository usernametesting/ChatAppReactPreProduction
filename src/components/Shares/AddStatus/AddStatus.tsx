import React, { useRef } from 'react';
import './AddStatus.css';
import { Status } from './../../../types/Statuses/Status';
import {  getStatusType } from '../../../services/internals/Files/getFileType';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { setLoadingState, userStatusUpload } from '../../../store/userSlice';

const AddMyStatus: React.FC = () => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { currentlyUser } = useSelector((state: RootState) => state.users);


    const handleDivClick = () => {
        if (fileInputRef.current)
            fileInputRef.current.click();
    };
    const handleAddStatus = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            dispatch(setLoadingState(true));
            const newStatus: Status = {
                statusType: getStatusType(file),
            }; 
            await dispatch(userStatusUpload({ file: file, Status: newStatus }));
            dispatch(setLoadingState(false));
        }
    };

    return (
        <div className="my-status" onClick={handleDivClick}>
            <div className="status-icon" id='choose-file'>
                <img
                    src={currentlyUser.profImageUrl}
                    alt="image"
                    className="img-circle"
                    style={{ width: '50px', height: '50px', objectFit: 'cover', marginBottom: '10px' }}
                />        <div className="status-add-icon">+</div>
            </div>
            <div className="status-text">Click to add status update</div>
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                accept="image/*,video/*"
                ref={fileInputRef}
                onChange={handleAddStatus}
            />
        </div>
    );
};

export default AddMyStatus;
