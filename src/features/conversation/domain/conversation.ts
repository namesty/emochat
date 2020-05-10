import { User } from "../../user/domain/user";
import { Message } from "../../message/domain/message";

export interface Conversation {
  id: string,
  users: User[],
  messages: Message[],
  emotions: any[]
}