import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import LeftHeader from "../../HeaderComps/LeftHeader/LeftHeader";
import SelfProfile from "../../SelfProfileComps/SelfProfile/SelfProfile";
import { useEffect } from "react";
import ChatList from "../../ChatListComps/ChatList/ChatList";
import { setComponent } from "../../../store/dynamicComponentRenderSlice";
import RightHeader from "../../HeaderComps/RightHeader/RightHeader";
import ChatArea from "../../ChatAreaComps/ChatArea/ChatArea";
import TypingArea from "../../TypingAreaComps/TypingArea/TypingArea";
import NotSelectedUser from "../../RightPanelComps/NotSelectedUser/NotSelectedUser";



const LeftPanel: React.FC = () => {
    const currentComponent = useSelector((state: RootState) => state.dynamicComponentRender.component);
    const { selectedUserId } = useSelector((state: RootState) => state.users);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(setComponent(<ChatList />))
    }, [])

    return (
        <div style={{display:"flex" , width:'100%',height:'100%'}}>

            <section id='main-left' className="main-left">
                <LeftHeader />
                {currentComponent}
                <SelfProfile />
            </section>
            <section id='main-right' className='main-right'>
                {selectedUserId != 0 ? (
                    <>
                        <RightHeader />
                        <ChatArea />
                        <TypingArea />
                    </>
                ) : (<NotSelectedUser />)}

            </section>
        </div>

    );
};

export default LeftPanel;

