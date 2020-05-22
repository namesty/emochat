import io from "socket.io-client";
import { NewMessageData } from '../domain/message'
import { Auth } from "../../auth/domain/auth";
import { NewMessageParams } from "../domain/messageParams";

interface Props {
  authData: Auth
  newMessageHandler: (newMessage: NewMessageData) => void
}

export class MessageSocket {

  private socketClient: any

  constructor(props: Props) {
    if(!this.socketClient) {
      this.socketClient = io("http://192.168.1.40:3500")
      this.attachHandlers(props)
    }
  }

  private attachHandlers = (props: Props) => {
    const socket = this.socketClient

    socket.on("askForToken", () => {
      socket.emit("sendToken", props.authData.token);
    })
    socket.on("newMessage", props)
  }

  public sendMessage = (newMessage: NewMessageParams) => {
    this.socketClient.emit("newMessage", newMessage);
  }

  public close = () => {
    this.socketClient.close()
  }
}

      