import { User } from "../../user/domain/user";
import { Message } from "../../../Message";

export interface Conversation {
  id: string,
  users: User[],
  messages: Message[],
  emotions: any[]
}