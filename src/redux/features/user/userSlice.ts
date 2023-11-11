import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../../types/user";

// Define a type for the slice state

type InitialStateType = {
  userInfo: UserType;
};

// Define the initial state using that type
const initialState: InitialStateType = {
  userInfo: {
    displayName: "",
    avatar: "",
    birthday: null,
    status: true,
    email: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserInfo: (state, action: PayloadAction<UserType>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { saveUserInfo } = userSlice.actions;

export default userSlice.reducer;
