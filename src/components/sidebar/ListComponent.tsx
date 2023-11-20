import { Avatar, Box, Grid, Link, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { ListGroupType } from "../../types/chat";
import { FriendType } from "../../types/user";

type PropsType = {
  listData: FriendType[] | ListGroupType[];
};

const ListComponent = ({ listData }: PropsType) => {
  return (
    <ListComponentStyle
      gap={1}
      flexGrow={3}
      sx={{ overflowY: "auto", overflowX: "unset" }}
    >
      {listData &&
        listData.map((data: FriendType | ListGroupType) => {
          // List Friend ---------------------------------------------------------
          if ("friendId" in data) {
            return (
              <Wrapper
                key={data._id}
                component={RouterLink}
                to={`/chat/${data.friendId}`}
                underline="none"
              >
                <Grid container spacing={1}>
                  <Grid item xs={2} sx={{ position: "relative" }}>
                    <Avatar sx={{ width: "40px", height: "40px" }} />
                    <StatusDot
                      sx={{ background: data.status ? "#15c615" : "grey" }}
                    ></StatusDot>
                  </Grid>
                  <Grid item xs={7}>
                    <Stack>
                      <Typography variant="body1" fontWeight={700}>
                        {data.displayName}
                      </Typography>
                      <NewestMessage variant="subtitle2" fontWeight={500}>
                        {data?.displayMessage?.newestMessage || "Test message"}
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
                        {format(
                          data?.displayMessage?.time || new Date(),
                          "MMM dd"
                        )}
                      </Typography>
                      {data?.displayMessage?.totalUnreadMessage ||
                        (0 > 0 && (
                          <NumberCircle>
                            {data?.displayMessage?.totalUnreadMessage}
                          </NumberCircle>
                        ))}
                    </Stack>
                  </Grid>
                </Grid>
              </Wrapper>
            );
          }
          // List Group ------------------------------------------------------------------
          if ("members" in data) {
            return (
              <Wrapper
                key={data._id}
                component={RouterLink}
                to={`/chat/group/${data._id}`}
                underline="none"
              >
                <Grid container spacing={1}>
                  <Grid item xs={2} sx={{ position: "relative" }}>
                    <Avatar sx={{ width: "40px", height: "40px" }} />
                  </Grid>
                  <Grid item xs={10}>
                    <Stack>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {data.title}
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={8}>
                          <NewestMessage variant="subtitle2" fontWeight={500}>
                            {data?.displayMessage?.newestMessage ||
                              "Test message"}
                          </NewestMessage>
                        </Grid>
                        <Grid item xs={4}>
                          <Stack gap={0.5} alignItems="flex-end">
                            {data?.displayMessage?.totalUnreadMessage ||
                              (0 > 0 && (
                                <NumberCircle>
                                  {data?.displayMessage?.totalUnreadMessage}
                                </NumberCircle>
                              ))}
                            <Typography
                              variant="subtitle2"
                              fontWeight={600}
                              color="#4c4c4c"
                            >
                              {format(
                                data?.displayMessage?.time || new Date(),
                                "MMM dd"
                              )}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Grid>
                </Grid>
              </Wrapper>
            );
          }
        })}
    </ListComponentStyle>
  );
};

const ListComponentStyle = styled(Stack)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled(Link)`
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

export default ListComponent;
