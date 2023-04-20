import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/AuthSlice';

import { slide as Menu } from 'react-burger-menu';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../Responsive';
import Button from '../Button';
import { Marginer } from '../Marginer';

import BurgerStyles  from './BurgerMenuStyles';
import PuffLoader from 'react-spinners/PuffLoader';
import { useGetUserQuery } from '../../redux/UserApi';


export const NavContainer = styled.div`
  ${tw`flex px-4 md:px-2`}
`;


export const LogoContainer = styled.div.attrs((props) => ({
  className: props.className,
}))`
  ${tw`flex items-center justify-center p-0 m-0`}
`;

const UserContainer = styled.div`
  ${tw` flex justify-between `}
`;


const ListContainer = styled.ul`
  ${tw`z-20 flex flex-col items-center justify-center list-none sm:flex-row`}
`;

const NavItem = styled(Link)`
  ${tw`text-xs md:text-sm text-white font-semibold sm:px-2 md:px-5 cursor-pointer
    transition duration-300 ease-in-out hover:text-cornellred
  `}
`;

const UserDesktopContainer = styled.div`
display: flex;
color: white;
font-size: 19px;
align-items: center;
gap: 1rem;
`;

const UserMobileContainer = styled.div`
display: flex;
flex-direction: column;
color: white;
font-size: 18px;
gap: 1rem;
`;


export function UserItems(){
  const { accessToken, userId } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetUserQuery(userId, { skip: !userId });

  const isAuth = accessToken != null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };


  return (
    <UserContainer>
      { isAuth ? <UserDesktopContainer>
                        <Button  type="outlined" to={ isLoading ? '' : `/dashboard` } {...{disabled: isLoading}}>
                          { isLoading ? <PuffLoader color='white' size={14}/> : data?.gaming_name }
                        </Button>
                        {/* <Button text="Logout" onClick={handleLogoutClick}/> */}
                      </UserDesktopContainer>
        : <UserDesktopContainer>
            <Button text="Login" type="outlined" to="/auth/login"/>
            <Button text="Register" to="/auth/register"/>      
          </UserDesktopContainer>
      }
    </UserContainer>
  );
}

export function NavItems(){
  const { accessToken, userId } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetUserQuery(userId, { skip: !userId });
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const dispatch = useDispatch();
  const history = useNavigate();

  const isAuth = accessToken != null;

  const handleLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  };  

  if(isMobile) {
    return (
      <Menu right styles={BurgerStyles}>
        <ListContainer>
          <NavItem menu to="/" exact>
            Home
          </NavItem>
          <NavItem menu to="/">
            Leagues
          </NavItem>
          <NavItem menu to="/tourneys">
            Tourneys
          </NavItem>
          <NavItem menu to="/">
            About Us
          </NavItem>
          <NavItem menu to="/">
            <hr/>
          </NavItem>
          
          { isAuth && !isLoading ?
            <UserMobileContainer>
              <NavItem menu to={`/profile/${data.id}`}> {data.first_name} </NavItem>
              <NavItem menu onClick={handleLogoutClick}> Logout </NavItem>
            </UserMobileContainer>
            :
            <UserMobileContainer>
              <NavItem menu to="/auth/login">
                Login
              </NavItem>
              <NavItem menu to="/auth/register">
                Register
              </NavItem>
            </UserMobileContainer>
          }

        </ListContainer>
      </Menu>
    );
  }

  return (
    <ListContainer>
      <NavItem to="/">
        Home
      </NavItem>
      <NavItem to="/">
        Clips
      </NavItem>      
      <NavItem to="/">
        Leagues
      </NavItem>
      <NavItem to="/tourneys">
        Tourneys
      </NavItem>
      <NavItem to="/">
        Market Place        
      </NavItem>      
    </ListContainer>
  );
}
