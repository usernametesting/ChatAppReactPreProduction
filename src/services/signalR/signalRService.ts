import * as signalR from "@microsoft/signalr";
import { getCookie } from "../internals/Cookies/getCookie";
import { MessageDTO } from "../../types/Messages/Message";
import { addFocusedUser, addMessageToSelectedUser, changedMessageState, changeUserStateToOfline, changeUserStateToOnline, getCurrentlyUser, onDeleteMessage, removeUserOnFocusedUsers, setHasChnages } from "../../store/userSlice";
import { TellBeingFocusedToUser } from "../apis/userService";





let peerConnection: RTCPeerConnection | null = null;
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

        // ------------------------------------------------- voice calling -------------------------------------------------
        connection.on("ReceiveOffer", async (offer: string,toUserId) => {
            await handleReceivedOffer(offer,toUserId);
        });

        connection.on("ReceiveAnswer", async (answer: string) => {
            await handleReceivedAnswer(answer);
        });

        connection.on("ReceiveIceCandidate", async (candidate: string) => {
            await handleIceCandidate(candidate);
        });

    } catch (err) {
        console.log("Error while starting connection: ", err);
    }

    // hub method implements

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

    // ------------------------------------------------- vopice calling imps -------------------------------------------------
    const handleReceivedOffer = async (offer: string,toUserId:string) => {
        if (!peerConnection) {
            peerConnection = new RTCPeerConnection();
        }
        await peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(offer)));

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        connection?.invoke("SendAnswer", JSON.stringify(answer), toUserId);
    };

    const handleReceivedAnswer = async (answer: string) => {
        if (!peerConnection) return;
        await peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer)));
    };

    const handleIceCandidate = async (candidate: string) => {
        if (!peerConnection) return;
        await peerConnection.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
    };

};


export const startVoiceCall = async (toUserId: string) => {
    peerConnection = new RTCPeerConnection();

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => peerConnection!.addTrack(track, stream));

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            connection?.invoke("SendIceCandidate", JSON.stringify(event.candidate), toUserId);
        }
    };

    peerConnection.ontrack = (event) => {
        const audioElement = document.createElement('audio');
        audioElement.srcObject = event.streams[0];
        console.log(audioElement)
        audioElement.play();
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    connection?.invoke("SendOffer", JSON.stringify(offer), toUserId);
};