import { User } from "../../user/domain/user";

export interface Message {
  id: string
  from: User,
  to: User,
  content: string
  date: string
}