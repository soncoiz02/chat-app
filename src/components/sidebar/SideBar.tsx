import { Box, Container, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ListFriend from "./ListFriend";
import ListGroup from "./ListGroup";
import CreateGroupModal from "./CreateGroupModal";
const SideBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [switchList, setSwitchList] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleSwitchList = () => setSwitchList(!switchList);

  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <SideBarLayout>
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Stack sx={{ height: "100%" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={800}>
              {"Message (04)"}
            </Typography>
            <IconButton onClick={() => setIsOpenModal(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </IconButton>
          </Stack>
          <Stack direction="row" alignItems="center" position="relative" mt={3}>
            <SearchInput
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <SearchIcon icon={faSearch} />
          </Stack>
          <ListTitle className={switchList ? "active" : ""}>
            <TitleStyle
              className={switchList ? "" : "active"}
              onClick={handleSwitchList}
            >
              Friends
            </TitleStyle>
            <TitleStyle
              className={switchList ? "active" : ""}
              onClick={handleSwitchList}
            >
              Groups
            </TitleStyle>
          </ListTitle>
          {!switchList ? <ListFriend /> : <ListGroup />}
        </Stack>
      </Container>
      <CreateGroupModal isOpen={isOpenModal} handleClose={handleCloseModal} />
    </SideBarLayout>
  );
};

const ListTitle = styled("div")`
  display: flex;
  width: 100%;
  position: relative;
  margin-top: 10px;

  &::after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    right: auto;
    width: 50%;
    height: 3px;
    border-radius: 50px;
    background: #353849;
    transition: 0.5s;
  }

  &.active {
    &::after {
      right: 0;
      left: auto;
    }
  }
`;

const TitleStyle = styled("div")`
  width: 50%;
  padding: 5px 12px;
  text-align: center;
  cursor: pointer;
  color: #4f4f4f;
  font-weight: bold;
  font-size: 18px;

  &.active {
    color: #353849;
  }
`;

const SideBarLayout = styled(Box)`
  width: 350px;
  height: 100vh;
  padding: 10px 0 30px 0;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  left: 0;
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
