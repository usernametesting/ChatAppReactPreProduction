import { MessageState } from "../../enums/Messages/MessageState";
import { MessageType } from "../../enums/Messages/MessageType";

export interface MessageDTO {
  message?: string;
  messageType: MessageType;
  isSender: boolean;
  createdDate: Date;
  toUserId?:number;
  state?:MessageState;
  id?:number;
}

