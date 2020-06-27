import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  getByTestId,
  waitForElement,
  fireEvent,
  cleanup
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ChatScreen } from "./chatScreen";
import axios from "axios";
import { ConversationMother } from "../../domain/conversation-mother";
import { Server } from "mock-socket";
import { NewMessageData } from "../../../message/domain/message";
import { MessageMother } from "../../../message/domain/message-mother";
import { NewMessageParams } from "../../../message/domain/messageParams";
import { EmotionMother } from "../../../emotion/domain/emotion-mother";

require("dotenv").config();

const mockAxios = axios as jest.Mocked<typeof axios>;
const socketUrl = process.env.REACT_APP_SOCKET_URL as string;
const socketServer = new Server(socketUrl);

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe("Conversation Screen", () => {
  afterAll(() => {
    localStorage.clear();
    socketServer.stop();
  });

  afterEach(cleanup)

  beforeEach(() => {
    mockAxios.get.mockResolvedValueOnce({
      data: ConversationMother.noEmotions(),
    });
  });

  it("Renders conversation list with server data", async () => {
    const { container } = render(<ChatScreen />);

    const userList = await waitForElement(() => {
      return getByTestId(container, "convolist");
    });

    const name = `${ConversationMother.noEmotions()[0].messages[0].from.name} ${
      ConversationMother.noEmotions()[0].messages[0].from.lastName
    }`;

    expect(userList.firstChild).toContainHTML(
      `<p class="nameText">${name}</p>`
    );
  });

  it("Renders conversation messages with server data", async () => {
    const { container } = render(<ChatScreen />);

    const messages = await waitForElement(() => {
      return container.querySelector(".messagesContainer");
    });

    expect(messages?.children).toBeDefined();
    expect(messages?.firstChild?.childNodes.length).toEqual(
      ConversationMother.noEmotions()[0].messages.length
    );
    expect(messages?.firstChild?.firstChild).toHaveTextContent(
      ConversationMother.noEmotions()[0].messages[0].content
    );
  });

  it("Renders message received", async () => {
    const { container } = render(<ChatScreen />);

    socketServer.on("connection", (socket: any) => {
      const newMessage: NewMessageData = {
        conversationId: ConversationMother.noEmotions()[0].id,
        message: MessageMother.testMessage(),
      };
      socket.emit("newMessage", JSON.stringify(newMessage));
    });

    const messages = await waitForElement(() => {
      return container.querySelector(".messagesContainer");
    });

    expect(messages?.lastChild?.lastChild?.textContent).toMatch(
      MessageMother.testMessage().content
    );
  });

  it("Sends message and clears input", async () => {
    let messageReceived: NewMessageParams | undefined;

    const { container } = render(<ChatScreen />);

    socketServer.on("connection", (socket: any) => {
      socket.on("newMessage", (newMessage: NewMessageParams) => {
        messageReceived = newMessage;
      });
    });

    await waitForElement(() => {
      return container.querySelector(".messagesContainer");
    });

    const messageInput = getByTestId(container, "message-input");
    fireEvent.change(messageInput, { target: { value: "Testing socket" } });

    const sendButton = messageInput.nextElementSibling
      ?.nextElementSibling as Element;
    fireEvent.click(sendButton);

    expect((messageInput as HTMLInputElement).value).toEqual("");
    expect(messageReceived).toBeDefined();
    expect((messageReceived as NewMessageParams).conversationId).toEqual(
      ConversationMother.noEmotions()[0].id
    );
    expect((messageReceived as NewMessageParams).message.content).toMatch('Testing socket')
  });

  it("Analyzes messages and paints header", async () => {
    const { container } = render(<ChatScreen />);

    await waitForElement(() => {
      return getByTestId(container, "convolist");
    });

    const messageInput = getByTestId(container, "message-input");
    const conversationHeader = getByTestId(container, "conversation-header")
    const analyzeButton = messageInput.nextElementSibling as Element

    mockAxios.post.mockResolvedValueOnce({
      data: EmotionMother.emotions(),
    });

    fireEvent.click(analyzeButton)

    //TODO: test window painting

  });
});
