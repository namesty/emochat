import { Conversation } from './conversation'

export interface ConversationRepository {
  findMyConversations(): Promise<Conversation[]>
  deleteConversation(): Promise<boolean>
  createConversation(): Promise<Conversation>
}