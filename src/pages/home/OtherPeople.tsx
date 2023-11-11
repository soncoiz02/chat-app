import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import {
  createFriendRequest,
  removeFriendRequest,
} from "../../services/friendRequest";
import { getPeopleNotFriend } from "../../services/user";
import { PeopleNotFriendType } from "../../types/user";

const OtherPeople = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { getUserId } = useAuth();

  const [otherPeople, setOtherPeople] = useState<PeopleNotFriendType[]>([]);

  const handleGetPeopleNotFriend = async () => {
    try {
      const response = await getPeopleNotFriend();
      setOtherPeople(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetPeopleNotFriend();
  }, []);

  // handle add friend
  const handleAddFriend = async (toUserId: string) => {
    try {
      const userId = getUserId();
      const friendRequestData = {
        from: userId,
        to: toUserId,
      };
      const response = await createFriendRequest(friendRequestData);
      if (response._id) {
        const newOtherPeople = [...otherPeople];
        const targetPeople = newOtherPeople.find(
          (item: PeopleNotFriendType) => item._id === response.to
        );
        if (targetPeople) targetPeople.requests[0] = response;
        setOtherPeople(newOtherPeople);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelRequest = async (
    requestId: string,
    userTargetId: string
  ) => {
    try {
      const response = await removeFriendRequest(requestId);
      if (response.message === "Removed") {
        const newOtherPeople = [...otherPeople];
        const targetPeople = newOtherPeople.find(
          (item: PeopleNotFriendType) => item._id === userTargetId
        );
        if (targetPeople) targetPeople.requests = [];
        setOtherPeople(newOtherPeople);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack mt={3}>
      <Typography variant="h5" fontWeight={700}>
        People you may know
      </Typography>
      <Stack mt={2}>
        <Stack direction="row" alignItems="center" position="relative">
          <SearchInput
            placeholder="Find your friend"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <SearchIcon icon={faSearch} />
        </Stack>
        <Grid container spacing={2} mt={1}>
          {otherPeople &&
            otherPeople.map((people: PeopleNotFriendType) => (
              <Grid item xl={3} lg={4} md={6} key={people._id}>
                <Wrapper>
                  <Avatar
                    src={people.avatar}
                    sx={{
                      width: "80px",
                      height: "80px",
                      alignSelf: "center",
                    }}
                  />
                  <Typography variant="body1" mt={1}>
                    {people.displayName}
                  </Typography>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Dot
                      sx={{
                        background: people.status ? "#15c615" : "grey",
                      }}
                    ></Dot>
                    <Typography variant="body2">
                      {people.status ? "Online" : "Offline"}
                    </Typography>
                  </Stack>
                  <Stack mt={2} gap={1}>
                    {people.requests[0] ? (
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleCancelRequest(
                            people.requests[0]._id,
                            people._id
                          )
                        }
                      >
                        Cancel Request
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => handleAddFriend(people._id)}
                      >
                        Add Friend
                      </Button>
                    )}
                  </Stack>
                </Wrapper>
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

const SearchInput = styled("input")`
  width: 100%;
  border-radius: 50px;
  border: 1px solid #bfbfbf;
  background: #efefef;
  outline: none;
  border: none;
  padding: 15px 30px 15px 20px;
  transition: 0.5s;
  font-size: 16px;
  background: white;
  box-shadow: 0px 0px 2px 0px rgba(145, 158, 171, 0.2),
    0px 12px 24px -4px rgba(145, 158, 171, 0.12);
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  color: grey;
`;

const Dot = styled(Box)`
  width: 8px;
  height: 8px;
  border-radius: 50%;
`;

const Wrapper = styled(Stack)`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  background: white;
  box-shadow: 0px 0px 2px 0px rgba(145, 158, 171, 0.2),
    0px 12px 24px -4px rgba(145, 158, 171, 0.12);
`;

export default OtherPeople;
