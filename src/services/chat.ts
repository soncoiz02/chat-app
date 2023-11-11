import { NormalChatType } from "../types/chat";
import { BaseApi } from "./baseApi";

const ChatApiIns = new BaseApi("/chat");

export const getChatData = (friendId: string) => {
  return ChatApiIns.get<NormalChatType>(`/get-friend-chat/${friendId}`);
};
