import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { addContact, addFriend, deleteContact, getCurrentlyUser, setHasChnages, setSelectedUserId } from '../../../store/userSlice';
import './Contacts.css'
import { ServiceResponse } from '../../../types/Auths/auth';
import { handleActionResult } from '../../../services/internals/handleActionResult/handleActionResult';
import RightPanel from '../../RightPanelComps/RightPanel/RightPanel';
import alertify from 'alertifyjs';
import { setMainLeftComponent } from '../../../store/dynamicComponentRenderSlice';
const Contacts: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { currentlyUser } = useSelector((state: RootState) => state.users);
    const { friends } = useSelector((state: RootState) => state.users);

    const [newContact, setNewContact] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewContact(e.target.value);
    };

    useEffect(() => {
        const fetch = async () => {
            await dispatch(getCurrentlyUser());
        }
        fetch();
    }, [])

    const handleAddContact = async () => {

        if (newContact != "") {
            if (currentlyUser.contacts?.some(contact => contact.email === newContact.trim()))
                alertify.warning("user already exsists");
            else {
                var resultAction = await dispatch(addContact(newContact));
                handleActionResult(resultAction.payload as ServiceResponse);
                setNewContact("");
                await dispatch(getCurrentlyUser());
            }
        };

    };

    const handleSelectUser = async (id: string) => {
        const contact = currentlyUser.contacts?.filter(user => user?.id?.toString() == id)[0];
        if (contact) {
            if (window.innerWidth <= 680)
                dispatch(setMainLeftComponent(<RightPanel />));
            if (!(friends.filter(user => user.id == contact.id)[0]))
                dispatch(addFriend(contact));
            await dispatch(setSelectedUserId(parseInt(contact.id)));
        }
    }

    const handleDelete = async (id: string) => {
        await dispatch(deleteContact(parseInt(id)));
        await dispatch(setHasChnages());
    }
    return (

        <div style={{ backgroundColor: "#001f3f", padding: "20px" ,height:'100%'}}>
            <div style={{ margin: "10px" }}>
                <input
                    type="text"
                    name="userName"
                    value={newContact}
                    placeholder="Enter email"
                    onChange={handleInputChange}
                    className="form-control"
                />
                <button onClick={handleAddContact} className="btn btn-primary">Add Contact</button>
            </div>

            <div style={{ color: "white" }} className="chat-list">
                {currentlyUser?.contacts?.map((friend, index) => (
                    <div id={index.toString()} onClick={() => handleSelectUser(friend.id!)} className="friends contacts" style={{ color: 'white', display: "flex", justifyContent: "space-between" }}>
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
                            <button onClick={() => handleDelete(friend!.id)} style={{ color: 'white', backgroundColor: 'transparent', border: 0 }} className="delete-btn">
                                <i style={{ fontSize: '20px', color: 'white' }} className="fa fa-trash" />
                            </button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default Contacts;
