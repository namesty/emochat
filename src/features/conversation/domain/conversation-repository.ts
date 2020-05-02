import { Conversation } from './conversation'
import { Message } from '../../../Message';

export interface ConversationRepository {
  findMyConversations(): Promise<Conversation[]>
  deleteConversation(conversationId: string): Promise<Conversation>
  createConversation(userIds: string[]): Promise<Conversation>
  addMessage(conversationId: string, message: Message): Promise<Conversation>
}