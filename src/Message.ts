import { User } from "./features/user/domain/user";

export interface Message {
  from: User
  content: string
  date: string
}