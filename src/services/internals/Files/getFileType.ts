import { MessageType } from "../../../enums/Messages/MessageType";
import { StatusType } from "../../../enums/Statuses/StatusType";

export const getFileType = (selectedFile: Blob): MessageType => {
  if (selectedFile?.type.startsWith('image/'))
    return MessageType.IMAGE;
  else if (selectedFile?.type.startsWith('video/'))
    return MessageType.VIDEO;
  else if (selectedFile?.type.startsWith('audio/'))
    return MessageType.AUDIO;
  else
    return MessageType.FILE;

}

export const getStatusType = (selectedFile: File): StatusType => {
  if (selectedFile?.type.startsWith('image/'))
    return StatusType.IMAGE;
  else if (selectedFile?.type.startsWith('video/'))
    return StatusType.VIDEO;
  else
    return StatusType.TEXT;
}