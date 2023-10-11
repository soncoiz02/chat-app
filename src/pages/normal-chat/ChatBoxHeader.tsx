import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import styled from "styled-components";

const ChatBoxHeader = () => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" gap={1.5} alignItems="center">
        <Avatar sx={{ width: "50px", height: "50px" }} />
        <Stack justifyContent="center">
          <Typography variant="h6" fontWeight={700}>
            Sol Henry
          </Typography>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <StatusDot></StatusDot>
            <Typography variant="subtitle2" sx={{ color: "#909090" }}>
              Active
            </Typography>
          </Stack>
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
  background: #15c615;
`;

export default ChatBoxHeader;
