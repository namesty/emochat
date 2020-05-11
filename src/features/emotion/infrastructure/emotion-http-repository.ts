import { EmotionRepository } from "../domain/emotion-repository";
import { http, createAuthHeader } from "../../../core/http/axios";

export class EmotionHttpRepository implements EmotionRepository {
  async analyzeLastNMessages(n: number, conversationId: string) {
    const response = await http.post(`/emotion/last/${n}`, {
      conversationId
    }, {
      headers: createAuthHeader()
    })

    return response.data
  }
}