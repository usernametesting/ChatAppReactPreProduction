import React, { useEffect } from 'react';
import '../../assets/css/chat.css';
import '../../assets/css/responsiveChat.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setMainLeftComponent } from '../../store/dynamicComponentRenderSlice';
import LeftPanel from '../../components/LeftPanelComps/LeftPanel/LeftPanel';
import { setSelectedUserId } from '../../store/userSlice';
import { startSignalRConnection } from '../../services/signalR/signalRThunk';


const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const mainLeftComp = useSelector((state: RootState) => state.dynamicComponentRender.mainLeftComponent);



  useEffect(() => {
    dispatch(setSelectedUserId(0));
    dispatch(startSignalRConnection());
    dispatch(setMainLeftComponent(<LeftPanel />))
  }, []);

  return (
    <div id="app">
      {mainLeftComp}
    </div>
  );
};

export default Dashboard;
