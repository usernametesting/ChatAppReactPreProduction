import { useDispatch, useSelector } from "react-redux";
import ChatArea from "../../ChatAreaComps/ChatArea/ChatArea";
import RightHeader from "../../HeaderComps/RightHeader/RightHeader";
import TypingArea from "../../TypingAreaComps/TypingArea/TypingArea";
import { AppDispatch, RootState } from "../../../store/store";
import { useEffect } from "react";
import { changeMessageState } from "../../../store/userSlice";



const RightPanel: React.FC = () => {

  const { selectedUserId } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (selectedUserId != 0) {
      dispatch(changeMessageState(selectedUserId));
    }
  }, [])


  return (
    <section id='main-left' className="main-left">
      <RightHeader />
      <ChatArea />
      <TypingArea />
    </section>

  );
};

export default RightPanel;

