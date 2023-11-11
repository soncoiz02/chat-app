import { FriendRequestData, FriendRequestResponse } from "../types/user";
import { BaseApi } from "./baseApi";

const FriendRequestApiIns = new BaseApi("/friend-request");

export const createFriendRequest = (requestData: FriendRequestData) => {
  return FriendRequestApiIns.post<FriendRequestResponse>(
    "/create",
    requestData
  );
};

type RemoveResponse = {
  message: string;
};

export const removeFriendRequest = (requestId: string) => {
  return FriendRequestApiIns.delete<RemoveResponse>(`/remove/${requestId}`);
};
