import { Message } from "../../message/domain/message";
import { Emotion } from "./emotion";

export interface EmotionRepository {
  analyzeMessages(messages: Message[]): Promise<Emotion>
}