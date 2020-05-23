import { EmotionRepository } from "../domain/emotion-repository";
import { http, createAuthHeader } from "../../../core/http/axios";
import { Emotion } from "../domain/emotion";

export class EmotionHttpRepository implements EmotionRepository {
  async analyzeLastNMessages(n: number, conversationId: string) {
    const response = await http.post<Emotion[]>(`/emotion/last/${n}`, {
      conversationId
    }, {
      headers: createAuthHeader()
    })

    return response.data
  }
}