import { MessageState } from "../../../enums/Messages/MessageState";
import { MessageType } from "../../../enums/Messages/MessageType";
import { MessageDTO } from "../../../types/Messages/Message";

export const renderMessageContent = (message: MessageDTO) => {

  if (message.state === MessageState.DELETED)
    return <p style={{ fontStyle: "italic" }}>message was deleted</p>;
  
  switch (message.messageType) {
    case MessageType.TEXT:
      return <p>{message.message}</p>;
    case MessageType.VIDEO:
      return (
        <video controls width="250">
          <source src={message.message} type="video/mp4" />
        </video>
      );
    case MessageType.IMAGE:
      return (
        <>
          <a href={message.message} download>
            <img src={message.message} alt="image" style={{ maxWidth: '250px' }} />
          </a>
        </>
      );
    case MessageType.REPLIED:
      return (
        <div>
          <p>Replied to story</p>
          <p>{message.message}</p>
        </div>
      );
    case MessageType.AUDIO:
      return (
        <>
          <audio controls src={message.message}></audio>
        </>
      );
    case MessageType.FILE:
      return (
        <a
          style={{ color: message.isSender ? "white" : "black", textAlign: "center", display: "flex", alignItems: "end", fontSize: "15px" }}
          href={message.message}
          download
        >
          <span
            className="glyphicon glyphicon-file"
            aria-hidden="true"

            style={{ color: "red", fontSize: "30px", marginRight: "10px" }}
          ></span>          Click to download File
        </a>
      );

    default:
      return <p>Unsupported Message type</p>;
  }
};
