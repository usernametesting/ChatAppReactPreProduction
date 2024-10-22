import * as signalR from "@microsoft/signalr";
import { getCookie } from "../internals/Cookies/getCookie";
import { MessageDTO } from "../../types/Messages/Message";
import { addFocusedUser, addMessageToSelectedUser, changedMessageState, changeUserStateToOfline, changeUserStateToOnline, getCurrentlyUser, onDeleteMessage, removeUserOnFocusedUsers, setHasChnages } from "../../store/userSlice";
import { TellBeingFocusedToUser } from "../apis/userService";




let connection: signalR.HubConnection | null = null;

export const connectToHub = async (dispatch: any, getState: any) => {
    connection = new signalR.HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_API_BASE_URL}/chatHub`, {
            accessTokenFactory: () => getCookie('accessToken')
        })
        .withAutomaticReconnect()
        .build();




    try {
        await connection.start();
        await dispatch(getCurrentlyUser());

        //connections
        connection.on("ReceivedMessage", (Message: MessageDTO) => {
            handleReceivedMessage(Message);
        });

        connection.on("UserConnected", (userId: string) => {
            handleUserConnected(userId);
        });

        connection.on("UserDisconnected", (userId: string) => {
            handleUserDisconnected(userId);
        });

        connection.on("OnUserFocusConnectedToMe", (userId: string) => {
            handleUserFocusConnectedToMe(userId);
        });
        connection.on("OnUserFocusDisconnectedToMe", (userId: string) => {
            console.log("disconnected")
            handleUserFocusDisconnectedToMe(userId);
        });

        connection.on("OnHasChanges", () => {
            OnHasChanges();
        });

        connection.on("TellBeingFocusedToUser", (userId: string) => {
            OnTellBeingFocusedToUser(userId);
        });

        connection.on("OnDeleteMessage", (userId: string, msgId: string) => {
            OnDeleteMessage(userId, msgId);
        });

    } catch (err) {
        console.log("Error while starting connection: ", err);
    }


    const handleReceivedMessage = async (Message: MessageDTO) => {
        try {
            await dispatch(addMessageToSelectedUser(Message));
        } catch (err) {
            console.error("Error handling received Message: ", err);
        }
    };

    const handleUserConnected = async (userId: string) => {
        const state = getState();
        const { selectedUserId } = state.users;

        if (userId == selectedUserId.toString())
            await TellBeingFocusedToUser(parseInt(userId));
        // dispatch(setSelectedUserId(0));
        // await changeMessageStateService(parseInt(userId));

        try {
            await dispatch(changeUserStateToOnline(userId));
        } catch (err) {
            console.error("Error handling received Message: ", err);
        }
    };
    const handleUserDisconnected = async (userId: string) => {

        try {
            await dispatch(changeUserStateToOfline(userId));
        } catch (err) {
            console.error("Error handling received Message: ", err);
        }
    };
    const handleUserFocusConnectedToMe = async (userId: string) => {
        try {
            await dispatch(changedMessageState(userId));
        } catch (err) {
            console.error("Error handling received Message: ", err);
        }
    };
    const handleUserFocusDisconnectedToMe = async (userId: string) => {
        try {
            await dispatch(removeUserOnFocusedUsers(userId));
        } catch (err) {
            console.error("Error handling received Message: ", err);
        }
    };
    const OnHasChanges = async () => {
        try {
            await dispatch(setHasChnages());
        } catch (err) {
            console.error("Error handling received Message: ", err);
        }
    };

    const OnTellBeingFocusedToUser = async (userId: string) => {
        dispatch(addFocusedUser(userId));
    }

    const OnDeleteMessage = async (userId: string, msgId: string) => {
        dispatch(onDeleteMessage({ msgId: msgId, userId: userId }));
    }


};


