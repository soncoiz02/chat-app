import {
  ResponseFriendMessageType,
  ResponseGroupMessageType,
} from "../types/message";
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

export const getGroupMessage = (groupId: string, page: number) => {
  return MessageApiIns.get<ResponseGroupMessageType>(`/get-friend-messages`, {
    params: {
      groupId,
      page,
    },
  });
};
