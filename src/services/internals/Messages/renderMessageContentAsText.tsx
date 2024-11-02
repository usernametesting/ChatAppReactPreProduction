import { MessageState } from "../../../enums/Messages/MessageState";
import { MessageType } from "../../../enums/Messages/MessageType";
import { MessageDTO } from "../../../types/Messages/Message";

export const renderMessageContentAsText = (message: MessageDTO) => {
    if (message.state == MessageState.DELETED)
        return <>message was deleted</>;
    switch (message.messageType) {
        case MessageType.TEXT:
            return (
                <>
                    {message.message!.length > 20
                        ? message.message!.substring(0, 20) + "..."
                        : message.message}
                </>
            );
        case MessageType.VIDEO:
            return (
                <>Sent video</>
            );
        case MessageType.IMAGE:
            return (
                <>Sent photo</>
            );
        case MessageType.REPLIED:
            return (
                <>Replied to story</>
            );
        case MessageType.AUDIO:
            return (
                <>Sent voice message</>
            );
        case MessageType.FILE:
            return (
                <>Sent file</>
            );

        default:
            return <>Unsupported Message type</>;
    }
};
