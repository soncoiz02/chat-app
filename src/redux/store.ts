import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import chatSlice from "./features/chat/chatSlice";
// ...
const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
