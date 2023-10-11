import { Box, Divider, Stack } from "@mui/material";
import styled from "styled-components";
import ChatBoxHeader from "./ChatBoxHeader";
import ListMessage from "./ListMessage";
import MessageForm from "./MessageForm";

const NormalChat = () => {
  return (
    <Wrapper>
      <ChatBox>
        <ChatBoxHeader />
        <Divider sx={{ my: 2 }} />
        <Stack height={"100%"}>
          <ListMessage />
          <MessageForm />
        </Stack>
      </ChatBox>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  height: 100vh;
  width: 100%;
  padding-top: 80px;
  padding-bottom: 30px;
`;

const ChatBox = styled(Stack)`
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 20px;
  box-shadow: 0px 0px 2px 0px rgba(145, 158, 171, 0.2),
    0px 12px 24px -4px rgba(145, 158, 171, 0.12);
  padding: 24px 18px;
`;

export default NormalChat;
