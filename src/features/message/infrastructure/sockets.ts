import io from "socket.io-client";
interface Params {
  wsURL: string
  token: string
  onConnect: Function
  onDisconnect: Function
  onNewMessage: Function
}

export const startSocketClient = (params: Params) => {

  const { wsURL, token, onConnect, onDisconnect, onNewMessage } = params

  const socket = io(wsURL);
    socket.on("askForToken", () => {
      socket.emit("sendToken", token);
    });

    socket.on('connect', onConnect)

    socket.on('disconnect', onDisconnect)

    socket.on("newMessage", onNewMessage);

  return socket
}

      