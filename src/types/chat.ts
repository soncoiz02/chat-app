import { UserType } from "./user";

export type ChatUserType = {
  userInfo: UserType;
  nickname: string;
};

export type NormalChatType = {
  users: ChatUserType[];
  color: string;
};
