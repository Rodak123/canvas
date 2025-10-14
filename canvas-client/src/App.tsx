import { useCallback } from "react"
import useWebSocket, { ReadyState } from 'react-use-websocket';

const apiUrl = import.meta.env.VITE_SOCKET_URL;

export const App = () => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(apiUrl);

  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), [
    sendMessage
  ]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
    </div>
  );
}