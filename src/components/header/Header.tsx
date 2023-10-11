import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Badge, Container, IconButton, Stack } from "@mui/material";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderWrapper>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          py={1}
          gap={2}
        >
          <CustomIconButton color="primary" size="small" sx={{ mr: "auto" }}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </CustomIconButton>
          <CustomIconButton color="primary">
            <Badge variant="dot" color="error">
              <FontAwesomeIcon icon={faBell} />
            </Badge>
          </CustomIconButton>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Avatar />
            <CustomIconButton color="primary" size="small">
              <FontAwesomeIcon icon={faChevronDown} />
            </CustomIconButton>
          </Stack>
        </Stack>
      </Container>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled("header")`
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - 350px);
`;

const CustomIconButton = styled(IconButton)`
  transition: 0.3s;
  &:hover {
    color: #5463bc;
  }
`;

export default Header;
