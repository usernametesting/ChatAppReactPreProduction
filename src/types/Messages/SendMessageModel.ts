import { MessageType } from "@microsoft/signalr";
import { MessageState } from "../../enums/Messages/MessageState";

export interface SendMessageModel {
  Message: string;
  MessageType: MessageType;
  toUserId:number;
  state:MessageState;
}

