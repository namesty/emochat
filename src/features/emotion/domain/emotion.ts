import { User } from "../../user/domain/user";

export interface Emotion {
  user: User
  Happy: number,
  Angry: number,
  Fear: number,
  Bored: number,
  Excited: number,
  Sad: number
  date: string
}