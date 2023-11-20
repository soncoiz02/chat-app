import { AxiosRequestConfig } from "axios";
import {
  BaseGroupType,
  ListGroupType,
  NormalChatType,
  RequestCreateGroupType,
} from "../types/chat";
import { BaseApi } from "./baseApi";

const ChatApiIns = new BaseApi("/chat");

export const getChatData = (friendId: string) => {
  return ChatApiIns.get<NormalChatType>(`/get-friend-chat/${friendId}`);
};

export const createGroupChat = (groupData: RequestCreateGroupType) => {
  return ChatApiIns.post<BaseGroupType>("/create-group", groupData);
};

export const getUserGroups = () => {
  return ChatApiIns.get<ListGroupType[]>("/get-user-groups");
};

export const getGroupChat = (
  groupChatId: string,
  config?: AxiosRequestConfig
) => {
  return ChatApiIns.get<BaseGroupType>(`/get-group-chat/${groupChatId}`, {
    ...config,
  });
};
