import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import styled from "styled-components";
import { FriendType } from "../../types/user";

const listFriend: FriendType[] = [
  {
    displayName: "Dasha",
    status: false,
    avatar: "",
    displayMessage: {
      newestMessage: "Hello, how are you today ?",
      totalUnreadMessage: 2,
      time: new Date(),
    },
  },
  {
    displayName: "Sowl",
    status: true,
    avatar: "",
    displayMessage: {
      newestMessage: "Hello, how are you today ?",
      totalUnreadMessage: 2,
      time: new Date(),
    },
  },
  {
    displayName: "Hana",
    status: true,
    avatar: "",
    displayMessage: {
      newestMessage: "Hello, how are you today ?",
      totalUnreadMessage: 0,
      time: new Date(),
    },
  },
  {
    displayName: "Dasha",
    status: true,
    avatar: "",
    displayMessage: {
      newestMessage: "Hello, how are you today ?",
      totalUnreadMessage: 2,
      time: new Date(),
    },
  },
  {
    displayName: "Sowl",
    status: true,
    avatar: "",
    displayMessage: {
      newestMessage: "Hello, how are you today ?",
      totalUnreadMessage: 0,
      time: new Date(),
    },
  },
  {
    displayName: "Hana",
    status: true,
    avatar: "",
    displayMessage: {
      newestMessage: "Hello, how are you today ?",
      totalUnreadMessage: 2,
      time: new Date(),
    },
  },
  {
    displayName: "Dasha",
    status: true,
    avatar: "",
    displayMessage: {
      newestMessage: "Hello, how are you today ?",
      totalUnreadMessage: 2,
      time: new Date(),
    },
  },
  {
    displayName: "Sowl",
    status: true,
    avatar: "",
    displayMessage: {
      newestMessage: "Hello, how are you today ?",
      totalUnreadMessage: 2,
      time: new Date(),
    },
  },
  {
    displayName: "Hana",
    status: true,
    avatar: "",
    displayMessage: {
      newestMessage: "Hello, how are you today ?",
      totalUnreadMessage: 2,
      time: new Date(),
    },
  },
];

const ListFriend = () => {
  return (
    <ListFriendStyle
      gap={1}
      flexGrow={3}
      sx={{ overflowY: "auto", overflowX: "unset" }}
    >
      {listFriend.map((friend: FriendType, index: number) => (
        <Wrapper key={index}>
          <Grid container spacing={1}>
            <Grid item xs={2} sx={{ position: "relative" }}>
              <Avatar sx={{ width: "40px", height: "40px" }} />
              <StatusDot
                sx={{ background: friend.status ? "#15c615" : "grey" }}
              ></StatusDot>
            </Grid>
            <Grid item xs={7}>
              <Stack>
                <Typography variant="body1" fontWeight={700}>
                  {friend.displayName}
                </Typography>
                <NewestMessage variant="subtitle2" fontWeight={500}>
                  {friend.displayMessage.newestMessage}
                </NewestMessage>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack gap={0.5} alignItems="flex-end">
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  color="#4c4c4c"
                >
                  {format(friend.displayMessage.time, "MMM dd")}
                </Typography>
                {friend.displayMessage.totalUnreadMessage > 0 && (
                  <NumberCircle>
                    {friend.displayMessage.totalUnreadMessage}
                  </NumberCircle>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Wrapper>
      ))}
    </ListFriendStyle>
  );
};

const ListFriendStyle = styled(Stack)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled(Box)`
  position: relative;
  width: 100%;
  border-radius: 10px;
  transition: 0.3s;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: white;
    box-shadow: 0px 0px 2px 0px rgba(145, 158, 171, 0.2),
      0px 12px 24px -4px rgba(145, 158, 171, 0.12);
  }
`;

const NewestMessage = styled(Typography)`
  color: #909090;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StatusDot = styled(Box)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid white;
  position: absolute;
  right: 0;
  bottom: 10px;
`;

const NumberCircle = styled(Box)`
  font-size: 10px;
  color: white;
  background: #f46464;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  margin-top: 10px;
`;

export default ListFriend;
