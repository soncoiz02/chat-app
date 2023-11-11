import { FriendType, PeopleNotFriendType } from "../types/user";
import { BaseApi } from "./baseApi";

const UserApiIns = new BaseApi("/user");

export const getPeopleNotFriend = () => {
  return UserApiIns.get<PeopleNotFriendType[]>("/get-people-not-friend");
};

export const getUserFriend = () => {
  return UserApiIns.get<FriendType[]>("/get-user-friends");
};
