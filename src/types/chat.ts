import { UserType } from "./user";

export type ChatUserType = {
  user: UserType;
  nickname: string;
};

export type NormalChatType = {
  _id: string;
  users: {
    users: ChatUserType[];
  };
  color: string;
};
