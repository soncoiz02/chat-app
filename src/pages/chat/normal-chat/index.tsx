import { Box, Divider, Stack } from "@mui/material";
import styled from "styled-components";
import ChatBoxHeader from "../components/ChatBoxHeader";
import ListMessage from "../components/ListMessage";
import MessageForm from "../components/MessageForm";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChatData } from "../../../redux/features/chat/chatSlice";
import { useAppDispatch } from "../../../redux/hook";
import { getFriendMessage } from "../../../services/message";
import { GroupMessageType, NormalMessageType } from "../../../types/message";
import useAuth from "../../../hooks/useAuth";

const NormalChat = () => {
  const dispatch = useAppDispatch();
  const chatId = useParams().id as string;
  const { getUserId } = useAuth();

  const [listMessage, setListMessage] = useState<NormalMessageType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [disable, setDisable] = useState<boolean>(false);
  const [totalMessage, setTotalMessage] = useState<number>(0);

  const handleGetListMessage = async (chatId: string, page: number) => {
    try {
      const { message, total } = await getFriendMessage(chatId, page);
      setListMessage(message);
      setTotalMessage(total);
      setDisable(false);
    } catch (error) {
      console.log(error);
      setDisable(true);
    }
  };

  const handleGetMoreMessage = async () => {
    try {
      if (listMessage.length > 0 && listMessage.length === totalMessage) {
        setDisable(true);
        return;
      }
      const nextPage = page + 1;
      const { message } = await getFriendMessage(chatId, nextPage);
      setListMessage((list) => [...list, ...message]);
      setPage(nextPage);
      setDisable(false);
    } catch (error) {
      console.log(error);
      setDisable(true);
    }
  };

  const updateNewMessage = (data: NormalMessageType | GroupMessageType) => {
    if ("chatId" in data)
      setListMessage((listMessage) => [data, ...listMessage]);
  };

  useEffect(() => {
    if (chatId) {
      dispatch(
        getChatData({ chatId, type: "friend", currentUserId: getUserId() })
      );
      handleGetListMessage(chatId, page);
    }
    return () => {};
  }, [chatId]);

  return (
    <Wrapper>
      <ChatBox>
        <ChatBoxHeader />
        <Divider sx={{ my: 1 }} />
        <ListMessage
          roomId={chatId}
          listMessage={listMessage}
          handleUpdateNewMessage={updateNewMessage}
          handleGetMoreMessage={handleGetMoreMessage}
          disable={disable}
        />
        <MessageForm
          roomId={chatId}
          handleUpdateNewMessage={updateNewMessage}
        />
      </ChatBox>
    </Wrapper>
  );
};

export const Wrapper = styled(Box)`
  width: 100%;
  padding-top: 80px;
  padding-bottom: 30px;
  height: 700px;
`;

export const ChatBox = styled(Stack)`
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 20px;
  box-shadow: 0px 0px 2px 0px rgba(145, 158, 171, 0.2),
    0px 12px 24px -4px rgba(145, 158, 171, 0.12);
  padding: 24px 18px;
`;

export default NormalChat;
