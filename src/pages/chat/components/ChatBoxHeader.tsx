import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import { useAppSelector } from "../../../redux/hook";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { verifyPathname } from "../../../utils/verifyPathname";

const ChatBoxHeader = () => {
  const { title, members } = useAppSelector((state) => state.chat.chatInfo);
  const { pathname } = useLocation();

  const { getUserId } = useAuth();

  const [targetUserStatus, setTargetUserStatus] = useState<boolean>(false);

  const getTargetUserStatus = () => {
    const targetUser = members.find((user) => user.user._id !== getUserId());
    setTargetUserStatus(targetUser?.user.status as boolean);
  };

  useEffect(() => {
    if (verifyPathname(pathname)) getTargetUserStatus();
  }, []);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" gap={1.5} alignItems="center">
        <Avatar sx={{ width: "50px", height: "50px" }} />
        <Stack justifyContent="center">
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
          {verifyPathname(pathname) && (
            <Stack direction="row" alignItems="center" gap={0.5}>
              <StatusDot
                sx={{
                  background: targetUserStatus ? "#15c615" : "#909090",
                }}
              ></StatusDot>
              <Typography variant="subtitle2" sx={{ color: "#909090" }}>
                {targetUserStatus ? "Active" : "Offline"}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
      <OptionIcon>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </OptionIcon>
    </Stack>
  );
};

const OptionIcon = styled(Box)`
  color: #353849;
  cursor: pointer;
  font-size: 22px;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;

  &:hover {
    background: #f3f3f3;
  }
`;

const StatusDot = styled(Box)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

export default ChatBoxHeader;
