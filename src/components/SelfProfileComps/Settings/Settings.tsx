import React, { useState } from 'react';
import './Settings.css'
import { changeUserBiografy, setCurrentlyUserProfImage, setLoadingState, userfileUpload } from '../../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { logout, updateUserbiografy } from '../../../store/authSlice';


const Settings: React.FC = () => {

    const { currentlyUser } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();
    const [biografy, setbiografy] = useState(currentlyUser?.biografy || '');
    const [show, setShow] = useState(false);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            dispatch(setCurrentlyUserProfImage(reader.result as string));
        };
        if (file) {
            reader.readAsDataURL(file);
            const formData = new FormData();
            formData.append('formFile', file);
            dispatch(userfileUpload(formData));
        }
    };

    const handleLogout = async () => {
        dispatch(setLoadingState(true));
        await dispatch(logout());
        dispatch(setLoadingState(false));

    };

    const handleSavebiografy = async () => {
        dispatch(setLoadingState(true));
        dispatch(changeUserBiografy(biografy));
        await dispatch(updateUserbiografy(biografy));
        setShow(false);
        dispatch(setLoadingState(false));
    };
    const handleBio = () => {
        setShow(true)
    };
    return (
        <div className="container-fluid" style={{ width: '100%' }}>
            <div className="row" style={{ margin: '0', height: '100vh' }}>
                <div className="col-xs-3 col-sm-3 col-md-3" style={{ backgroundColor: '#161b22', padding: '20px', height: '100vh', width: '100%' }}>
                    <h3 style={{ color: '#c9d1d9', marginBottom: '20px' }}>Settings</h3>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search settings"
                        style={{ marginBottom: '20px', backgroundColor: '#21262d', color: '#c9d1d9', border: '1px solid #30363d' }}
                    />

                    <div className="text-center" style={{ marginBottom: '20px' }}>
                        <img
                            src={currentlyUser?.profImageUrl || "default-profile.png"}
                            alt="image"
                            className="img-circle"
                            style={{ width: '75px', height: '75px', objectFit: 'cover', marginBottom: '10px' }}
                        />
                        <div style={{ margin: '3px', padding: 5 }} >
                            <label htmlFor="formFile" className="btn btn-primary">
                                Change Photo
                                <input
                                    type="file"
                                    id="formFile"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
                        <p><strong style={{ color: '#58a6ff' }}>{currentlyUser.userName}</strong></p>
                        <a style={{ color: '#8b949e', textDecoration: 'none' }}>
                            {
                                (currentlyUser?.biografy == null || currentlyUser?.biografy == ' ') ? ('Hey there! I am using Chat') : (currentlyUser.biografy)
                            }
                        </a>
                    </div>

                    <ul className="nav nav-pills nav-stacked">

                        <li className='settings-li'>
                            <button
                                onClick={handleBio}
                                data-toggle="modal"
                                data-target="#setbiografy"
                                style={{ color: '#c9d1d9', backgroundColor: "transparent", border: 0 }}
                            >
                                <i className="fas fa-user-edit"></i> Change Bio
                            </button>
                        </li>

                        <li className='settings-li'>
                            <button
                                style={{
                                    color: '#c9d1d9',
                                    backgroundColor: "transparent",
                                    border: 0,
                                    cursor: 'not-allowed'
                                }}
                                disabled
                            >
                                <i className="fas fa-envelope"></i> {currentlyUser.email}
                            </button>
                        </li>

                        <li className='settings-li'>
                            <button onClick={handleLogout} style={{ color: 'red', backgroundColor: "transparent", border: 0 }}>
                                <i className="glyphicon glyphicon-log-out"></i> Log out
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
            {show && <div className="modal fade" id="setbiografy" tabIndex={-1} role="dialog" aria-labelledby="setbiografyLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="setbiografyLabel">Edit biografy</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="closebiografyModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={biografy}
                                onChange={(e) => setbiografy(e.target.value)}
                                placeholder="Enter your biografy"
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => handleSavebiografy()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default Settings;
