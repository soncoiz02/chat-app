import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Badge,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { useAppSelector } from "../../redux/hook";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const headerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.onscroll = () => {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        if (headerRef.current) headerRef.current.classList.add("active");
      } else {
        if (headerRef.current) headerRef.current.classList.remove("active");
      }
    };
  }, []);

  return (
    <HeaderWrapper ref={headerRef}>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          py={1}
          gap={2}
        >
          <CustomIconButton
            color="primary"
            size="small"
            sx={{ mr: "auto" }}
            onClick={() => navigate("/")}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </CustomIconButton>
          <CustomIconButton color="primary">
            <Badge variant="dot" color="error">
              <FontAwesomeIcon icon={faBell} />
            </Badge>
          </CustomIconButton>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Avatar src={userInfo?.avatar} />
            <Typography variant="body1" fontWeight={700}>
              {userInfo?.displayName}
            </Typography>
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
  z-index: 999;
  transition: 0.5s;

  &.active {
    background: #fff;
    border-radius: 0 0 15px 15px;
    box-shadow: 0px 0px 2px 0px rgba(145, 158, 171, 0.2),
      0px 12px 24px -4px rgba(145, 158, 171, 0.12);
  }
`;

const CustomIconButton = styled(IconButton)`
  transition: 0.3s;
  &:hover {
    color: #5463bc;
  }
`;

export default Header;
