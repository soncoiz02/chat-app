import { Box, Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/SideBar";

const MainLayout = () => {
  return (
    <Stack direction={"row"}>
      <SideBar />
      <Box sx={{ flexGrow: 2 }}>
        <Header />
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Stack>
  );
};

export default MainLayout;
