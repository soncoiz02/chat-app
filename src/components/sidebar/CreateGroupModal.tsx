import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Box,
  Button,
  Input,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getUserFriend, searchUserFriend } from "../../services/user";
import { FriendType } from "../../types/user";

import _debounce from "lodash/debounce";
import { RequestCreateGroupType } from "../../types/chat";
import { createGroupChat } from "../../services/chat";
import { useAppSelector } from "../../redux/hook";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type PropsType = {
  isOpen: boolean;
  handleClose: () => void;
};

const Wrapper = styled(Box)`
  width: 500px;
  padding: 20px 25px;
  border-radius: 20px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
`;

const CustomInput = styled("input")`
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  outline: none;
  background: #f5f5f5;
`;

const CustomButton = styled(Button)`
  &.MuiButton-root {
    padding: 10px 30px;
    border-radius: 50px;
    background: black;
    color: white;
    border: none;
    font-size: 16px;
    font-weight: 700;
    align-self: center;
    cursor: pointer;

    &:hover {
      background: #3b3b3b;
    }

    &.Mui-disabled {
      border: 1px solid #a7a7a7;
      background: none;
      color: #a7a7a7;
    }
  }
`;

const CreateGroupModal = ({ isOpen, handleClose }: PropsType) => {
  const [groupName, setGroupName] = useState<string>("");
  const [friendName, setFriendName] = useState<string>("");

  const [listFriend, setListFriend] = useState<FriendType[]>([]);
  const [choosenFriend, setChoosenFriend] = useState<FriendType[]>([]);

  const navigate = useNavigate();

  // GET CURRENT USER INFO
  const currentUser = useAppSelector((state) => state.user.userInfo);
  const { getUserId } = useAuth();

  // -------------------------------------------------------------------------

  const handeGetFriends = async (signal: AbortSignal) => {
    try {
      const response = await getUserFriend({ signal });
      setListFriend(response);
    } catch (error) {
      console.log(error);
    }
  };

  // CHOOSE USER -----------------------------------------------------------

  const isChoosenFriend = (userId: string): boolean => {
    return !!choosenFriend.find((user: FriendType) => user._id === userId);
  };

  const handleChooseFriend = (friendData: FriendType) => {
    if (isChoosenFriend(friendData._id)) {
      const newChoosenFriend = choosenFriend.filter(
        (user: FriendType) => user._id !== friendData._id
      );
      setChoosenFriend(newChoosenFriend);
      return;
    }
    setChoosenFriend([friendData, ...choosenFriend]);
  };

  // SEARCH USER FRIEND ------------------------------------------------------

  const searchFriend = async (keyword: string) => {
    try {
      const response = await searchUserFriend(keyword);
      setListFriend(response);
    } catch (error) {
      console.log(error);
    }
  };

  const debounceFn = useCallback(_debounce(searchFriend, 1000), []);

  const handleSearchFriend = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setFriendName(keyword);
    debounceFn(keyword);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    handeGetFriends(signal);

    return () => {
      controller.abort();
    };
  }, []);

  // CREATE GROUP CHAT -----------------------------------------------------

  const generateGroupName = (listUser: FriendType[]): string => {
    if (groupName.trim() === "") {
      let newName: string = listUser
        .map((user: FriendType, index: number) => {
          if (index + 1 === 5) return;
          return user.displayName;
        })
        .join(", ");

      if (listUser.length > 5) {
        newName += `and other ${listUser.length - 5} people`;
      }

      const finalName = `${currentUser.displayName}, ${newName}`;

      return finalName;
    }

    return groupName;
  };

  const handleCreateGroup = async () => {
    try {
      const choosenFriendId = choosenFriend.map((user: FriendType) => user._id);

      const requestData: RequestCreateGroupType = {
        title: generateGroupName(choosenFriend),
        member: [getUserId(), ...choosenFriendId],
      };

      const response = await createGroupChat(requestData);

      navigate(`/chat/group/${response._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Wrapper>
        <Typography variant="h5" fontWeight={700} mb={1}>
          New Group
        </Typography>
        <Stack gap={2}>
          <Input
            placeholder="Group name (not required)"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            size="small"
          />
          <Stack gap={1}>
            <Typography variant="body1" fontWeight={700}>
              Add member
            </Typography>
            {!!choosenFriend && (
              <Stack direction="row" gap={1}>
                {choosenFriend.map((user: FriendType) => (
                  <Avatar src={user.avatar} />
                ))}
              </Stack>
            )}
            <CustomInput
              placeholder="Search your friend"
              value={friendName}
              onChange={handleSearchFriend}
            />
            <Stack
              gap={1}
              sx={{
                maxHeight: "400px",
                overflow: "auto",
              }}
            >
              {listFriend &&
                listFriend.map((friend: FriendType) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    sx={{
                      cursor: "pointer",
                      py: "10px",
                      borderBottom: "1px solid #dbdbdb",
                    }}
                    key={friend._id}
                    onClick={() => handleChooseFriend(friend)}
                  >
                    <Avatar
                      sx={{
                        width: "35px",
                        height: "35px",
                      }}
                      src={friend.avatar}
                    />
                    <Typography variant="subtitle1" fontWeight={700}>
                      {friend.displayName}
                    </Typography>
                    {isChoosenFriend(friend._id) && (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        style={{ color: "#6161ff", marginLeft: "auto" }}
                      />
                    )}
                  </Stack>
                ))}
            </Stack>
          </Stack>
          <CustomButton
            disabled={choosenFriend.length >= 2 ? false : true}
            onClick={handleCreateGroup}
          >
            Create
          </CustomButton>
        </Stack>
      </Wrapper>
    </Modal>
  );
};

export default CreateGroupModal;
