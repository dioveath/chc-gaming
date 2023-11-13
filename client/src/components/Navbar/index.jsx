import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";

import { NavContainer, LogoContainer, NavItems, UserItems } from "./NavbarElements";
import { Logo } from "../Logo";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../Responsive";

const NavbarContainer = styled.nav.attrs((props) => ({
  className: props.className,
}))`
  background-color: rgba(148, 27, 0, 0.7);
  height: 56px;
  z-index: 9999999;

  top: 0;
  left: 0;

  ${(props) => props.isMobile === "true" && tw`fixed top-0 left-0 w-full bg-transparent`}

  ${tw`
        w-full
        flex
        flex-row
        items-center
        sm:px-3
        lg:px-12
        justify-between
    `}
`;

const Navbar = ({ page }) => {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const isTablet = useMediaQuery({ maxWidth: SCREENS.md });

  return (
    <NavbarContainer isMobile={isMobile.toString()}>
      <NavContainer>
        <LogoContainer to={'/'}>{isTablet ? <Logo size="20px" /> : <Logo />}</LogoContainer>
        <NavItems page={page} />
      </NavContainer>
      <NavContainer>{!isMobile && <UserItems />}</NavContainer>
    </NavbarContainer>
  );
};

export default Navbar;
