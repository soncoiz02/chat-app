import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ListGroupType } from "../../../types/chat";
import { FriendType } from "../../../types/user";

// Define a type for the slice state

type InitialStateType = {
  listFriend: FriendType[];
  listGroup: ListGroupType[];
};

// Define the initial state using that type
const initialState: InitialStateType = {
  listFriend: [],
  listGroup: [],
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    saveListFriend: (state, action: PayloadAction<FriendType[]>) => {
      state.listFriend = action.payload;
    },
    saveListGroup: (state, action: PayloadAction<ListGroupType[]>) => {
      state.listGroup = action.payload;
    },
  },
});

export const { saveListFriend, saveListGroup } = sidebarSlice.actions;

export default sidebarSlice.reducer;
