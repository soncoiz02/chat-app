import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../../types/user";

// Define a type for the slice state

// Define the initial state using that type
const initialState: UserType = {
  displayName: "",
  avatar: "",
  birthday: new Date(),
  status: true,
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserInfo: (state, action: PayloadAction<UserType>) => {
      state = { ...action.payload };
    },
  },
});

export const { saveUserInfo } = userSlice.actions;

export default userSlice.reducer;
