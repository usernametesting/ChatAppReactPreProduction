import { AppDispatch, RootState } from "../../store/store";
import { connectToHub } from "../../services/signalR/signalRService";

export const startSignalRConnection = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        await connectToHub(dispatch, getState);

    } catch (error) {
        console.error("SignalR connection failed: ", error);
    }
};
