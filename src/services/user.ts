import { AxiosRequestConfig } from "axios";
import { FriendType, PeopleNotFriendType } from "../types/user";
import { BaseApi } from "./baseApi";

const UserApiIns = new BaseApi("/user");

export const getPeopleNotFriend = () => {
  return UserApiIns.get<PeopleNotFriendType[]>("/get-people-not-friend");
};

export const getUserFriend = (config?: AxiosRequestConfig) => {
  return UserApiIns.get<FriendType[]>("/get-user-friends", { ...config });
};

export const searchUserFriend = (
  keyword: string,
  config?: AxiosRequestConfig
) => {
  return UserApiIns.get<FriendType[]>("/search-user-friends", {
    params: {
      keyword,
    },
    ...config,
  });
};
