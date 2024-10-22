import { StatusType } from "../../enums/Statuses/StatusType";

export interface Status {
    id?:number;
    statusType: StatusType;
    mediaUrl?: string;
    decription?: string;
    watchedUserIds?:string;
    createdDate?:Date;
}