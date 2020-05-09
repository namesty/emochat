import { ConversationRepository } from "../domain/conversation-repository";
import { http, createAuthHeader } from "../../../core/http/axios";
import { Conversation } from "../domain/conversation";
import { Message } from "../../../Message";

//TODO: inyectar http por constructor
export class ConversationHttpRepository implements ConversationRepository {
  async findMyConversations(): Promise<Conversation[]> {
    const response = await http.get("/conversation", {
      headers: createAuthHeader(),
    });

    return response.data;
  }

  async deleteConversation(conversationId: string): Promise<Conversation> {
    const response = await http.delete(`/conversation/${conversationId}`, {
      headers: createAuthHeader(),
    });

    return response.data;
  }

  async createConversation(userIds: string[]): Promise<Conversation> {
    const response = await http.post(
      "/conversation",
      { userIds },
      { headers: createAuthHeader() }
    );

    return response.data;
  }

  async addMessage(
    conversationId: string,
    message: Message
  ): Promise<Conversation> {
    const response = await http.put(
      `/conversation/${conversationId}`,
      { message },
      { headers: createAuthHeader() }
    );

    return response.data;
  }
}
