import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { Logo } from "../Logo";
import { Marginer } from "../Marginer";

import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import RequireAuth from '../../containers/Auth/RequireAuth';
import ResetPassword from '../../containers/Auth/ResetPassword';
import ForgotPassword from '../../containers/Auth/ForgotPassword';
import ArenaRegister from '../../containers/Arena/ArenaRegister';
import Logout from "./Logout";

import { AnimatePresence, motion } from "framer-motion";

const BoxContainer = styled(motion.div)`
  width: 350px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: black;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;

  @media only screen and (min-width: 460px) {
    width: 400px;
  }

  @media only screen and (min-width: 600px) {
    width: 450px;
  }  

  ${tw`
    transition-all
  `}
`;

const TopContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const BackDrop = styled.div`
  background: #b71b1b;
  background: linear-gradient(
    180deg,
    rgba(183, 27, 27, 1) 36%,
    rgba(120, 0, 0, 1) 100%
  );
  color: white;

  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  left: -70px;

  z-index: 100;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  ${tw`
animate-pulse
`}
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 100;
`;

const HeaderText = styled.div`
  color: rgba(255, 255, 255, 1);
  font-size: 26px;
  font-weight: 700;
  line-height: 1.24;
  z-index: 10;
  margin: 0;
  margin-bottom: 8px;
  text-align: center;
`;

const SmallText = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  font-size: 11px;
`;

const ContentContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  padding: 0px 30px;
  flex-direction: column;

  @media only screen and (min-width: 460px) {
    padding: 0px 50px;
  }
`;

const getHeader = (path) => {
  switch(path){
  case '/auth/register':
    return 'REGISTER';
  case '/auth/login':
    return 'LOGIN';
  case '/auth/reset':
    return 'RESET CREDENTIALS';
  case '/auth/forgot':
    return 'FORGOT CREDENTIALS';
  case '/auth/arena':
    return 'REGISTER ARENA';
  default:
    return 'WHY YOU HERE?';
  }
};

export function AccountBox(props) {
  const location = useLocation();
  const header = getHeader(location.pathname);

  return (
    <BoxContainer layout>
      <TopContainer>
        <BackDrop />
        <HeaderContainer>
          <HeaderText>{ header }</HeaderText>
        </HeaderContainer>
      </TopContainer>
      <AnimatePresence exitBeforeEnter={true}>
        <ContentContainer>
          <Marginer vertical="2rem" />
          <LogoContainer>
            <Logo size="50px" />
          </LogoContainer>
          <Marginer vertical="2rem" />
          <SmallText>Enter your Gaming Identity</SmallText>

          <Routes>
            <Route path={`/`} element={<Navigate to='login'/>}/>
            <Route path={`/reset`} element={<ResetPassword/>}/>            
            <Route path={`/login`} element={<LoginForm/>}/>
            <Route path={`/register`} element={<RegisterForm/>}/>
            <Route path={`/logout`} element={<Logout/>}/>
            <Route path={'/forgot'} element={<ForgotPassword/>}/>
          </Routes>
        </ContentContainer>
      </AnimatePresence>
      <Marginer vertical="4rem" />
    </BoxContainer>
  );
}
