import { Conversation } from './conversation';
import { MessageParams } from '../../message/domain/messageParams';

export interface ConversationRepository {
  findMyConversations(): Promise<Conversation[]>
  deleteConversation(conversationId: string): Promise<Conversation>
  createConversation(userIds: string[]): Promise<Conversation>
  addMessage(conversationId: string, message: MessageParams): Promise<Conversation>
}