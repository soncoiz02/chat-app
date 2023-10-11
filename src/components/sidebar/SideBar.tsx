import { Box, Container, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ListFriend from "./ListFriend";
const SideBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <SideBarLayout>
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Stack gap={3} sx={{ height: "100%" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={800}>
              {"Message (04)"}
            </Typography>
            <IconButton>
              <FontAwesomeIcon icon={faPenToSquare} />
            </IconButton>
          </Stack>
          <Stack direction="row" alignItems="center" position="relative">
            <SearchInput
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <SearchIcon icon={faSearch} />
          </Stack>
          <ListFriend />
        </Stack>
      </Container>
    </SideBarLayout>
  );
};

const SideBarLayout = styled(Box)`
  width: 350px;
  height: 100vh;
  padding: 10px 0 30px 0;
  flex-shrink: 0;
`;

const IconButton = styled("button")`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #e8e8e8;
  cursor: pointer;
  border: none;
  outline: none;
  transition: 0.5s;
  &:hover {
    background: white;
    box-shadow: 0px 0px 2px 0px rgba(145, 158, 171, 0.2),
      0px 12px 24px -4px rgba(145, 158, 171, 0.12);
  }
`;

const SearchInput = styled("input")`
  width: 100%;
  border-radius: 50px;
  border: 1px solid #bfbfbf;
  background: #efefef;
  outline: none;
  padding: 10px 30px 10px 15px;
  transition: 0.5s;
  font-size: 14px;
  &:focus {
    background: white;
    box-shadow: 0px 0px 2px 0px rgba(145, 158, 171, 0.2),
      0px 12px 24px -4px rgba(145, 158, 171, 0.12);
    border-color: #e9e9e9;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  color: grey;
`;

export default SideBar;
