import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChatData as handleGetChatData } from "../../../services/chat";
import { NormalChatType } from "../../../types/chat";

// Define a thunk action

export const getChatData = createAsyncThunk(
  "chat/getData",
  async (friendId: string, { rejectWithValue }) => {
    try {
      const response = await handleGetChatData(friendId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Define a type for the slice state

type InitialStateType = {
  chatInfo: NormalChatType;
  isLoading: boolean;
  errorMessage: string;
};

// Define the initial state using that type
const initialState: InitialStateType = {
  chatInfo: {
    users: [],
    color: "",
  },
  isLoading: false,
  errorMessage: "",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(getChatData.pending, (state) => {
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(getChatData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chatInfo = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(getChatData.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = "Fail to get data";
    });
  },
});

export default chatSlice.reducer;
