import { DisplayMessageType } from "./message";
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

// Group chat type

export type MemberType = {
  _id?: string;
  user: UserType;
  nickname: string;
  groupId: string;
  role: number;
};

export interface BaseGroupType {
  _id: string;
  title: string;
  avatar: string;
  color: string;
}

export interface GroupWithMemberType extends BaseGroupType {
  members: MemberType[];
}

export interface ListGroupType extends GroupWithMemberType {
  displayMessage?: DisplayMessageType;
}

export type RequestCreateGroupType = {
  title: string;
  member: string[];
};
