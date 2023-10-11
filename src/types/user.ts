import { DisplayMessageType } from "./message";

export type FriendType = {
  displayName: string;
  status: boolean;
  avatar: string;
  displayMessage: DisplayMessageType;
};

export type UserType = {
  displayName: string;
  status: boolean;
  avatar: string;
  birthday: Date;
  username: string;
  uid: string;
};
