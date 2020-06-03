import { Conversation } from './conversation';
import { MessageParams } from '../../message/domain/messageParams';
import { Emotion } from '../../emotion/domain/emotion';

export interface ConversationRepository {
  findMyConversations(): Promise<Conversation[]>
  deleteConversation(conversationId: string): Promise<Conversation>
  createConversation(userIds: string[]): Promise<Conversation>
  addMessage(conversationId: string, message: MessageParams): Promise<Conversation>
  getAvgEmotionsProvokedInMe(): Promise<Emotion>
  getAvgEmotionsProvokedByMeInOthers(): Promise<Emotion[]>
}