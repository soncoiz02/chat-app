import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { getChatData } from "../../../redux/features/chat/chatSlice";
import { useAppDispatch } from "../../../redux/hook";
import { getGroupMessage } from "../../../services/message";
import { GroupMessageType, NormalMessageType } from "../../../types/message";
import ChatBoxHeader from "../components/ChatBoxHeader";
import ListMessage from "../components/ListMessage";
import MessageForm from "../components/MessageForm";
import { ChatBox, Wrapper } from "../normal-chat";

const GroupChat = () => {
  const dispatch = useAppDispatch();
  const groupChatId = useParams().id as string;
  const { getUserId } = useAuth();

  const [listMessage, setListMessage] = useState<GroupMessageType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [disable, setDisable] = useState<boolean>(false);
  const [totalMessage, setTotalMessage] = useState<number>(0);

  const handleGetListMessage = async (chatId: string, page: number) => {
    try {
      const { message, total } = await getGroupMessage(chatId, page);
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
      const { message } = await getGroupMessage(groupChatId, nextPage);
      setListMessage((list) => [...list, ...message]);
      setPage(nextPage);
      setDisable(false);
    } catch (error) {
      console.log(error);
      setDisable(true);
    }
  };

  const updateNewMessage = (data: GroupMessageType | NormalMessageType) => {
    if ("groupId" in data)
      setListMessage((listMessage) => [data, ...listMessage]);
  };

  useEffect(() => {
    if (groupChatId) {
      dispatch(
        getChatData({
          chatId: groupChatId,
          type: "group",
          currentUserId: getUserId(),
        })
      );
      handleGetListMessage(groupChatId, page);
    }

    return () => {};
  }, []);

  return (
    <Wrapper>
      <ChatBox>
        <ChatBoxHeader />
        <Divider sx={{ my: 1 }} />
        <ListMessage
          roomId={groupChatId}
          listMessage={listMessage}
          handleUpdateNewMessage={updateNewMessage}
          handleGetMoreMessage={handleGetMoreMessage}
          disable={disable}
        />
        <MessageForm
          roomId={groupChatId}
          handleUpdateNewMessage={updateNewMessage}
        />
      </ChatBox>
    </Wrapper>
  );
};

export default GroupChat;
