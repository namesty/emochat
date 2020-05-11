import { Message } from "../../message/domain/message";
import { Emotion } from "./emotion";

export interface EmotionRepository {
  analyzeLastNMessages(n: number, conversationId: string): Promise<Emotion>
}