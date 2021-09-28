import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Route, Switch, useRouteMatch, useLocation } from 'react-router-dom';

import { Logo } from '../Logo';
import { Marginer } from '../Marginer';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

const BoxContainer = styled.div`
min-width: 400px;
min-height: 480px;
display: flex;
flex-direction: column;
border-radius: 19px;
background-color: black;
box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
position: relative;
overflow: hidden;
`;

const TopContainer = styled.div`
width: 100%;
height: 50px;
display: flex;
flex-direction: column;
justify-content: flex-end;
`;

const BackDrop = styled.div`
background: #B71B1B;
background: linear-gradient(180deg, rgba(183,27,27,1) 36%, rgba(120,0,0,1) 100%);
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

const ContentContainer = styled.div`
width: 100%;
display: flex;
padding: 0px 50px;
flex-direction: column;
`;


export function AccountBox(props){

  var match = useRouteMatch();
  const location = useLocation();

  return (
    <BoxContainer>
      <TopContainer>
        <BackDrop/>
        <HeaderContainer>
          <HeaderText> { location.pathname == '/auth/login' ? 'LOGIN' : 'REGISTRATION'} </HeaderText>
        </HeaderContainer>
      </TopContainer>
      <ContentContainer>
        <Marginer vertical="50px"/>

        <LogoContainer>
          <Logo size="50px"/>
        </LogoContainer>

        <Marginer vertical="50px"/>
        <SmallText>Enter your Gaming Identity</SmallText>

        <Switch>
          <Route path={`${match.path}/login`}>
            <LoginForm/>
          </Route>
          <Route path={`${match.path}/register`}>
            <RegisterForm/>
          </Route>   
        </Switch>
      </ContentContainer>
    </BoxContainer>
  );
}
