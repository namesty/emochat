import { ConversationRepository } from "../domain/conversation-repository";
import { http, createAuthHeader } from "../../../core/http/axios";
import { Conversation } from "../domain/conversation";
import { MessageParams } from "../../message/domain/messageParams";
import { Emotion } from "../../emotion/domain/emotion";

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
    message: MessageParams
  ): Promise<Conversation> {
    const response = await http.put(
      `/conversation/${conversationId}`,
      { message },
      { headers: createAuthHeader() }
    );

    return response.data;
  }

  async getAvgEmotionsProvokedInMe() {
    const response = await http.get<Emotion[]>("/conversation/stats/me", {
      headers: createAuthHeader(),
    });

    return response.data[0];
  }

  async getAvgEmotionsProvokedByMeInOthers() {
    const response = await http.get<Emotion[]>("/conversation/stats/others", {
      headers: createAuthHeader(),
    });

    return response.data;
  }
}
