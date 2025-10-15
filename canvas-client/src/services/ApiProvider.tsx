import React, { createContext, useContext, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export interface ApiMessage {
  action: string;
  data: object;
}

export interface Api {
  readyState: ReadyState;
  apiMessage: ApiMessage | null;
  sendAction: (action: string, data: object) => void;
}

const ApiContext = createContext<Api | null>(null);

interface ApiContextProviderProps {
  children: React.ReactNode;
}

export const ApiContextProvider: React.FC<ApiContextProviderProps> = ({ children }) => {
  const { sendMessage, lastMessage, readyState } = useWebSocket('wss://draw.racode.cz/socket.io/');
  const [apiMessage, setApiMessage] = useState<ApiMessage | null>(null);

  useEffect(() => {
    if (lastMessage == null) return;

    const data = JSON.parse(lastMessage.data);
    const newApiMessage = data as ApiMessage;

    setApiMessage(newApiMessage);
  }, [lastMessage]);

  const sendAction = (action: string, data: object) => {
    const json = { action, data };
    const message = JSON.stringify(json);

    sendMessage(message);
  };

  return (
    <ApiContext.Provider value={{
      readyState,
      apiMessage,
      sendAction
    }}>
      {children}
    </ApiContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApi = (): Api => {
  const context = useContext(ApiContext);
  if (!context) throw new Error('useApi must be used within an ApiProvider');
  return context;
};