import { DisplayMessageType } from "./message";

export type FriendType = {
  _id: string;
  displayName: string;
  status: boolean;
  avatar: string;
  displayMessage?: DisplayMessageType;
  friendId: string;
};

export type UserType = {
  _id?: string;
  displayName: string;
  status: boolean;
  avatar: string;
  birthday: Date | null;
  email: string;
};

export type PeopleNotFriendType = {
  _id: string;
  avatar: string;
  displayName: string;
  status: boolean;
  requests: FriendRequestResponse[];
};

export type FriendRequestData = {
  from: string;
  to: string;
};

export type FriendRequestResponse = {
  from: string;
  to: string;
  _id: string;
  status: number;
};
