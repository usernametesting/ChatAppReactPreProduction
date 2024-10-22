import { Status } from "../Statuses/Status";
import { User } from "./user";

export interface CurrentlyUser {
  id: string;
  userName: string;
  email:string;
  profImageUrl?: string;
  contacts?: User[];
  biografy?: string;
  statuses?:Status[];
}