import { Avatar, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import styled from "styled-components";
import useAuth from "../../../hooks/useAuth";
import { useAppSelector } from "../../../redux/hook";
import { socket } from "../../../socket";
import { ChatUserType } from "../../../types/chat";
import { GroupMessageType, NormalMessageType } from "../../../types/message";
import { formatToTime } from "../../../utils/dateFormat";

import InfiniteScroll from "react-infinite-scroll-component";

type PropsType = {
  roomId: string;
  listMessage: NormalMessageType[] | GroupMessageType[];
  handleUpdateNewMessage: (data: NormalMessageType | GroupMessageType) => void;
  handleGetMoreMessage: () => void;
  disable: boolean;
};

const ListMessage = ({
  roomId,
  listMessage,
  handleUpdateNewMessage,
  handleGetMoreMessage,
  disable,
}: PropsType) => {
  const { chatInfo } = useAppSelector((state) => state.chat);
  const { userInfo } = useAppSelector((state) => state.user);

  const { getUserId } = useAuth();

  const isCurrentUser = (user: string) => {
    const currentUser = getUserId();
    return currentUser === user;
  };

  const getDisplayNameFromMessage = (
    message: NormalMessageType | GroupMessageType
  ) => {
    if (isCurrentUser(message.from)) return "You";
    const userList = chatInfo.members;

    const user = userList?.find(
      (user: ChatUserType) => user.user._id === message.from
    );

    return user?.nickname ? user.nickname : user?.user.displayName;
  };

  useEffect(() => {
    socket.connect();

    socket.emit("join-room", {
      roomId,
      userName: userInfo.displayName,
    });

    socket.on(
      "receive-message",
      (data: NormalMessageType | GroupMessageType) => {
        handleUpdateNewMessage(data);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Wrapper id="scrollableDiv">
      {listMessage.length > 0 && (
        <InfiniteScroll
          dataLength={listMessage.length}
          next={handleGetMoreMessage}
          style={{
            display: "flex",
            flexDirection: "column-reverse",
          }}
          inverse={true}
          hasMore={true && !disable}
          loader={<Loading>Loading...</Loading>}
          scrollableTarget="scrollableDiv"
        >
          {listMessage.map((message: NormalMessageType | GroupMessageType) => (
            <Stack
              direction="row"
              gap={1}
              key={message._id}
              width={"100%"}
              justifyContent={
                isCurrentUser(message.from) ? "flex-end" : "flex-start"
              }
            >
              <Avatar
                sx={{
                  order: isCurrentUser(message.from) ? 2 : 1,
                }}
              />
              <Stack
                gap={1}
                order={isCurrentUser(message.from) ? 1 : 2}
                alignItems={
                  isCurrentUser(message.from) ? "flex-end" : "flex-start"
                }
                flexGrow={2}
              >
                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography
                    variant="body1"
                    fontWeight={800}
                    order={isCurrentUser(message.from) ? 2 : 1}
                  >
                    {getDisplayNameFromMessage(message)}
                  </Typography>
                  <Typography
                    variant="body2"
                    order={isCurrentUser(message.from) ? 1 : 2}
                  >
                    {formatToTime(new Date(message.createdAt))}
                  </Typography>
                </Stack>
                <MessageBox
                  variant="subtitle1"
                  sx={{
                    background: isCurrentUser(message.from)
                      ? "black"
                      : "#efefef",
                    color: isCurrentUser(message.from) ? "white" : "black",
                    borderRadius: isCurrentUser(message.from)
                      ? "8px 3px 20px 12px"
                      : "3px 8px 12px 20px",
                    textAlign: isCurrentUser(message.from) ? "right" : "left",
                  }}
                >
                  {message.message}
                </MessageBox>
              </Stack>
            </Stack>
          ))}
        </InfiniteScroll>
      )}
    </Wrapper>
  );
};

const Loading = styled("div")`
  font-size: 18px;
  width: 100%;
  text-align: center;
`;

const Wrapper = styled("div")`
  height: 500px;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MessageBox = styled(Typography)`
  padding: 5px 10px;
  background: #efefef;
  max-width: 45%;
  word-wrap: break-word;
`;

export default ListMessage;
