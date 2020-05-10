import { EmotionRepository } from "../domain/emotion-repository";
import { EmotionHttpRepository } from "./emotion-http-repository";

export class EmotionRepositoryFactory {
  static build(): EmotionRepository {
    return new EmotionHttpRepository()
  }
}