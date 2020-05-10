import { EmotionRepository } from "../domain/emotion-repository";
import { Message } from "../../message/domain/message";
import { http, createAuthHeader } from "../../../core/http/axios";

export class EmotionHttpRepository implements EmotionRepository {
  async analyzeMessages(messages: Message[]) {
    const response = await http.post('/emotion', {
      messages: messages.map(m => m.content)
    }, {
      headers: createAuthHeader()
    })

    return response.data
  }
}