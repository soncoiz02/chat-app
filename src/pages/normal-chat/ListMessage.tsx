import { Avatar, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import { ChatUserType } from "../../types/chat";
import { NormalMessageType } from "../../types/message";
import { formatToTime } from "../../utils/dateFormat";

const messageData: NormalMessageType[] = [
  {
    attachment: null,
    message: "Hello, how are you ?",
    from: "son1",
    chatId: "",
    createdAt: new Date(),
  },
  {
    attachment: null,
    message: "I'm fine thank you",
    from: "son2",
    chatId: "",
    createdAt: new Date(),
  },
];

const currentUser = "son2";

const chatInfo = {
  users: [
    {
      userInfo: {
        avatar: "",
        birthday: new Date(),
        displayName: "Sol Henry",
        status: true,
        uid: "son1",
        username: "",
      },
      nickname: "",
    },
    {
      userInfo: {
        avatar: "",
        birthday: new Date(),
        displayName: "Hana Rub",
        status: true,
        uid: "son2",
        username: "",
      },
      nickname: "",
    },
  ],
  color: "blue",
};

const ListMessage = () => {
  const isCurrentUser = (user: string) => {
    return currentUser === user;
  };

  const getDisplayNameFromMessage = (message: NormalMessageType) => {
    if (message.from === currentUser) return "You";
    const user = chatInfo.users.find(
      (user: ChatUserType) => user.userInfo.uid === message.from
    );

    return user?.nickname ? user.nickname : user?.userInfo.displayName;
  };

  return (
    <Wrapper justifyContent="flex-end">
      {messageData.map((message: NormalMessageType, index: number) => (
        <Stack
          direction="row"
          gap={1}
          key={index}
          justifyContent={
            isCurrentUser(message.from) ? "flex-end" : "flex-start"
          }
          width={"100%"}
        >
          <Avatar
            sx={{
              order: isCurrentUser(message.from) ? 2 : 1,
            }}
          />
          <Stack
            gap={1}
            order={isCurrentUser(message.from) ? 1 : 2}
            alignItems={isCurrentUser(message.from) ? "flex-end" : "flex-start"}
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
                {formatToTime(message.createdAt)}
              </Typography>
            </Stack>
            <MessageBox
              variant="subtitle1"
              sx={{
                background: isCurrentUser(message.from) ? "black" : "#efefef",
                color: isCurrentUser(message.from) ? "white" : "black",
                borderRadius: isCurrentUser(message.from)
                  ? "8px 3px 20px 12px"
                  : "3px 8px 12px 20px",
              }}
            >
              dsasdsadghajwgdjwhagwdhj
            </MessageBox>
          </Stack>
        </Stack>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled(Stack)`
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 30px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MessageBox = styled(Typography)`
  padding: 5px 10px;
  background: #efefef;
  min-width: 100px;
  max-width: 45%;
  word-wrap: break-word;
`;

export default ListMessage;
