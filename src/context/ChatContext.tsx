import React, { createContext, useContext, useEffect, useState } from "react";

export interface ChatMessage {
  id: string;
  meetupId: string;
  user: string;
  message: string;
  timestamp: string;
}

interface ChatContextType {
  getMessages: (meetupId: string) => ChatMessage[];
  sendMessage: (meetupId: string, user: string, message: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);
const LOCAL_STORAGE_KEY = "chat_messages";

const mockMessages: ChatMessage[] = [
  {
    id: "msg1",
    meetupId: "1",
    user: "김클라이머",
    message: "안녕하세요! 주말 볼더링 모임 기대됩니다 😊",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "msg2",
    meetupId: "1",
    user: "이산악",
    message: "저도 기대하고 있어요! 어떤 문제들 도전해볼까요?",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "msg3",
    meetupId: "1",
    user: "박등반",
    message: "V4-V5 정도 문제들 같이 도전해봐요!",
    timestamp: new Date(Date.now() - 900000).toISOString(),
  },
  {
    id: "msg4",
    meetupId: "2",
    user: "정초보",
    message: "초보자도 환영해주셔서 감사해요! 처음이라 긴장되네요 ㅎㅎ",
    timestamp: new Date(Date.now() - 2700000).toISOString(),
  },
  {
    id: "msg5",
    meetupId: "2",
    user: "최신입",
    message: "저도 초보입니다! 같이 열심히 해봐요 💪",
    timestamp: new Date(Date.now() - 1200000).toISOString(),
  },
];

const getInitialMessages = (): ChatMessage[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return mockMessages;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages());

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const getMessages = (meetupId: string) =>
    messages
      .filter((m) => m.meetupId === meetupId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const sendMessage = (meetupId: string, user: string, message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      meetupId,
      user,
      message,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <ChatContext.Provider value={{ getMessages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("ChatContext를 Provider로 감싸주세요.");
  return ctx;
};