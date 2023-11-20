import { ChatUserType, GroupWithMemberType } from "./../../../types/chat";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getGroupChat,
  getChatData as handleGetChatData,
} from "../../../services/chat";
import { NormalChatType } from "../../../types/chat";

type ChatInfoType = {
  title: string;
  color: string;
  members: ChatUserType[];
};

// Define a thunk action

type DataType = {
  chatId: string;
  type: "friend" | "group";
  currentUserId: string;
};

export const getChatData = createAsyncThunk(
  "chat/getData",
  async (data: DataType, { rejectWithValue }) => {
    const { chatId, type, currentUserId } = data;
    try {
      const state: ChatInfoType = {
        title: "",
        members: [],
        color: "",
      };
      if (type === "friend") {
        const response = await handleGetChatData(chatId);
        const targetUser = response.users.users.find(
          (user) => user.user._id !== currentUserId
        );
        state.title = targetUser?.user.displayName as string;
        state.color = response.color;
        state.members = response.users.users;
      }

      if (type === "group") {
        const response = await getGroupChat(chatId);
        state.title = response.title;
        state.members = response.members.map((user) => ({
          user: user.user,
          nickname: user.nickname,
        }));
        state.color = response.color;
      }

      return state;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Define a type for the slice state

type InitialStateType = {
  chatInfo: ChatInfoType;
  isLoading: boolean;
  errorMessage: string;
};

// Define the initial state using that type
const initialState: InitialStateType = {
  chatInfo: {
    title: "",
    members: [],
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
