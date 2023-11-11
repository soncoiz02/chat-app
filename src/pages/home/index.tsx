import React from "react";
import { Grid, Stack, Typography, styled } from "@mui/material";
import Event from "./Event";
import OtherPeople from "./OtherPeople";

const HomePage = () => {
  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Stack>
            <Typography variant="h4" fontWeight={800}>
              Wellcome to my Chat App
            </Typography>
            <Typography
              variant="body1"
              fontWeight={400}
              sx={{ color: "#909090" }}
            >
              Find some friend and start chatting now!
            </Typography>

            <OtherPeople />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Event />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  position: relative;
  width: 100%;
  min-height: 80vh;
  margin-top: 80px;
`;

export default HomePage;
