import { Stack, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Event = () => {
  return (
    <EventBox>
      <Typography variant="body1" fontWeight={700}>
        Today Events
      </Typography>
    </EventBox>
  );
};

const EventBox = styled(Stack)`
  width: 100%;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 0px rgba(145, 158, 171, 0.2),
    0px 12px 24px -4px rgba(145, 158, 171, 0.12);
  padding: 14px;
  position: sticky;
  top: 80px;
`;

export default Event;
