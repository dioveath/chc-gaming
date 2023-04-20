import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";

import {
  NavContainer,
  LogoContainer,
  NavItems,
  UserItems,
} from "./NavbarElements";
import { Logo } from "../Logo";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../Responsive";

const NavbarContainer = styled.nav`
  background-color: rgba(148, 27, 0, 0.7);
  height: 56px;
  z-index: 9999999;
  
  top: 0;
  left: 0;

  @media only screen and (max-width: 640px) {
    position: sticky;
  }

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

const Navbar = (props) => {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const isTablet = useMediaQuery({ maxWidth: SCREENS.md });

  return (
    <NavbarContainer>
      <NavContainer>
        <LogoContainer>
          {isTablet ? <Logo size="20px" /> : <Logo />}
        </LogoContainer>
        <NavItems />
      </NavContainer>
      <NavContainer>{!isMobile && <UserItems />}</NavContainer>
    </NavbarContainer>
  );
};

export default Navbar;
