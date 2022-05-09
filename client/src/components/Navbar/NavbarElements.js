import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/AuthSlice';

import { slide as Menu } from 'react-burger-menu';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../Responsive';
import Button from '../Button';
import { Marginer } from '../Marginer';

import BurgerStyles  from './BurgerMenuStyles';



export const NavContainer = styled.div`
    ${tw`
flex
    `}
`;


export const LogoContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 0px;
margin: 0px;
`;


// export const Button = styled.nav`
//     background-color: #B71B1B; color: white; padding: 5px 40px;
//     border-radius: 4px;
//     ${tw`
// hover:bg-red-900
// ml-6
// shadow-md
//     `}
//     ${props => props.primary && css`
// background-color: #220303;
// `}
// `;

const UserContainer = styled.div`
${tw`
flex
justify-between
`}
`;


const ListContainer = styled.ul`
z-index: 20;
display: flex;
flex-direction: row;
list-style: none;
align-items: center;

@media only screen and (max-width: 640px) { 
flex-direction: column;
}

`;

const NavItem = styled(Link)`

padding: 20px 0px;

@media only screen and (max-width: 640px) { 
width: 100%;
}

&:hover { 
background-color: #220303;
}

// &:first-of-type { 
// margin-left: 10px;
// }

    ${tw`
text-xs
md:text-sm
lg:text-base
text-white
font-semibold
sm:px-2
md:px-5
cursor-pointer
transition
duration-300
ease-in-out
 `}

${props => props.menu && css`

padding: 10px 0px;

${tw`
text-white
text-xl
focus:text-white
`}
`}
`;

const UsernameText = styled.span`
color: white;
font-size: 14px;
font-weight: bolder;
`;

const UserDesktopContainer = styled.div`
display: flex;
color: white;
font-size: 19px;
align-items: center;
`;

const UserMobileContainer = styled.div`
display: flex;
flex-direction: column;
color: white;
font-size: 18px;
`;


export function UserItems(){
  // isLogin
  const user = useSelector((state) => state.user);
  const isAuth = useSelector((state) => state.auth).accessToken != null;

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  };

  return (
    <UserContainer>
      { isAuth ? <UserDesktopContainer>

                   {/* <UsernameText> */}
                   {/*   { "Hello, Mr. " + user.first_name } */}
                   {/* </UsernameText> */}
                   {/* <Marginer/> */}

                   <Button text={ "Mr. " + user.first_name + " Profile" }  type="outlined" to={ `/profile/${user.user_id}` } />   
                   <Button text="Logout" onClick={handleLogoutClick}/>
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
  const user = useSelector((state) => state.user);
  const isAuth = useSelector((state) => state.auth).accessToken != null;
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const dispatch = useDispatch();

  const history = useHistory();

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
        
        { isAuth ?
          <UserMobileContainer>
            <NavItem menu to={`/profile/${user.user_id}`}> {user.first_name} </NavItem>
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
        Leagues
      </NavItem>
      <NavItem to="/tourneys">
        Tournaments
      </NavItem>
      <NavItem to="/">
        About Us
      </NavItem>      
    </ListContainer>
  );
}
