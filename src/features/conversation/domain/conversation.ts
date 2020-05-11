import { User } from "../../user/domain/user";
import { Message } from "../../message/domain/message";
import { Emotion } from "../../emotion/domain/emotion";

export interface Conversation {
  id: string,
  users: User[],
  messages: Message[],
  emotions: Emotion[]
}