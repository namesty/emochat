import { User } from "../../user/domain/user";

export interface MessageParams {
  from: User,
  content: string,
  date: string
}

export interface NewMessageParams {
  conversationId: string,
  message: MessageParams
}