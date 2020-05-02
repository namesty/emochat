import { ConversationRepository } from "../domain/conversation-repository";
import { ConversationHttpRepository } from "./conversation-http-repository";

export class ConversationRepositoryFactory {
  static build(): ConversationRepository {
    return new ConversationHttpRepository()
  }
}