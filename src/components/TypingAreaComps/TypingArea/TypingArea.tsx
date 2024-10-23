import { useRef, useState } from "react";
import { MessageState } from "../../../enums/Messages/MessageState";
import { addMessageToSelectedUser } from "../../../store/userSlice";
import { MessageDTO } from "../../../types/Messages/Message";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { MessageType } from "../../../enums/Messages/MessageType";
import { sendAudioMessage, sendFile, sendMessage } from "../../../store/messageSlice";
import './TypingArea.css';
import { getFileType } from "../../../services/internals/Files/getFileType";
import { handleFileInputRef } from "../../../services/internals/handleRefs/handleFileInputRef";
import Stickers from "../../Modals/Stickers/Stickers";
import AudioMessage from "../../ChatAreaComps/AudioPosting/AudioMessage";

const TypingArea: React.FC = () => {
  const [MessageContent, setMessageContent] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUserId, focusedUserIds, friends } = useSelector((state: RootState) => state.users);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [showStickerModal, setShowStickerModal] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleStickerSelect = async (stickerUrl: string) => {
    setShowStickerModal(false);
    // dispatch(setLoadingState(true));
    const newMessage: MessageDTO = {
      message: stickerUrl,
      isSender: true,
      messageType: MessageType.IMAGE,
      createdDate: new Date(),
      toUserId: selectedUserId,
      state: getCurrentMessageState()
    };

    // await dispatch(addMessageToSelectedUser(newMessage));
    await dispatch(sendMessage(newMessage));
    // dispatch(setLoadingState(false));
  };



  const handleSendClick = async () => {
    // dispatch(setLoadingState(true));
    if (audioUrl) {
      const audioBlob = await fetch(audioUrl).then((r) => r.blob());
      const formData = new FormData();
      formData.append('audio', audioBlob, 'voice-message.wav');

      const newMessage: MessageDTO = {
        isSender: true,
        messageType: getFileType(audioBlob),
        createdDate: new Date(),
        toUserId: selectedUserId,
        state: getCurrentMessageState(),
        message: audioUrl,
      };
      setAudioUrl(null);
      await dispatch(addMessageToSelectedUser(newMessage));
      await dispatch(sendAudioMessage({ audioBlob: audioBlob, Message: newMessage }));


    } else if (MessageContent.trim()) {
      const newMessage: MessageDTO = {
        message: MessageContent,
        isSender: true,
        messageType: MessageType.TEXT,
        createdDate: new Date(),
        toUserId: selectedUserId,
        state: getCurrentMessageState()
      };
      setMessageContent("");
      // await dispatch(addMessageToSelectedUser(newMessage));
      await dispatch(sendMessage(newMessage));
    } else if (selectedFile) {
      const newMessage: MessageDTO = {
        isSender: true,
        messageType: getFileType(selectedFile),
        createdDate: new Date(),
        toUserId: selectedUserId,
        state: getCurrentMessageState(),
        message: filePreview ? filePreview : "",
      };
      const formFile = selectedFile;
      setFilePreview(null);
      setSelectedFile(null);
      // await dispatch(addMessageToSelectedUser(newMessage));
      await dispatch(sendFile({ file: formFile, Message: newMessage }));

    }
    // dispatch(setLoadingState(false));
  };


  const getCurrentMessageState = (): MessageState => {
    if (focusedUserIds.includes(selectedUserId))
      return MessageState.SEEN
    else if ((friends.filter(f => f.id == selectedUserId.toString()))[0]?.isOnline)
      return MessageState.NOTIFIED;
    else
      return MessageState.SENT;
  };



  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        const videoUrl = URL.createObjectURL(file);
        setFilePreview(videoUrl);
      } else if (file.type === 'application/pdf') {
        setFilePreview("PDF file");
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendClick();
    }
  };
  return (
    <div id="type-area-common-div" style={{overflowX:'scroll'}}>
      {showStickerModal &&
        <Stickers onClose={() => setShowStickerModal(false)} onStickerSelect={handleStickerSelect} />
      }
      <div id='typing-area' className="typing-area" onKeyDown={handleKeyDown}>
        <input ref={inputRef} id="type-area" value={MessageContent} onChange={(e) => setMessageContent(e.target.value)} className="type-area typing-elements" placeholder="Type something..." />
        <div className="attach-btn">
          <div className="typing-elements" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <AudioMessage audioUrl={audioUrl} setAudioUrl={setAudioUrl} />
            <button
              id="chooseFile"
              style={{ backgroundColor: 'transparent', border: 0 }}
              onClick={() => handleFileInputRef(fileInputRef)}
            >
              <span className="glyphicon glyphicon-paperclip file-btn typing-elements"></span>
            </button>
            <input
              className="typing-elements"
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            <button
              onClick={() => setShowStickerModal(!showStickerModal)}
              style={{ backgroundColor: 'transparent', border: '0' }}
              className="glyphicon glyphicon-picture sticker-btn typing-elements">
            </button>
            <button
              onClick={handleSendClick}
              style={{ backgroundColor: 'transparent', border: '0' }}
              className="glyphicon glyphicon-send send-btn typing-elements">
            </button>

            {selectedFile && (
              <div id='file-popup'>
                {selectedFile.type.startsWith('image/') && filePreview && (
                  <img src={filePreview} alt="image" style={{ width: '500px', height: '500px' }} />
                )}
                {selectedFile.type === 'application/pdf' && (
                  <div>PDF File Selected</div>
                )}
                {selectedFile.type.startsWith('video/') && (
                  <div>Video File Selected</div>
                )}
                {!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('video/') && selectedFile.type !== 'application/pdf' && (
                  <div>File: {selectedFile.name}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



export default TypingArea;
