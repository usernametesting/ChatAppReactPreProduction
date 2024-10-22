import { MessageDTO } from "../Messages/Message";
import { Status } from "../Statuses/Status";

export interface User {
    id: string;
    profImageUrl?:string;
    userName: string;
    biografy?:string;
    email?:string;
    isOnline:boolean;
    lastActivityDate: string;
    unreadMessageCount:number,
    messages:MessageDTO[];
    statuses?:Status[];
  }
  