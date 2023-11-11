import { ResponseFriendMessageType } from "../types/message";
import { BaseApi } from "./baseApi";

const MessageApiIns = new BaseApi("/message");

export const getFriendMessage = (chatId: string, page: number) => {
  return MessageApiIns.get<ResponseFriendMessageType>(`/get-friend-messages`, {
    params: {
      chatId,
      page,
    },
  });
};
