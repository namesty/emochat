import { User } from "../../user/domain/user";

export interface Auth {
  user: User,
  token: string
}