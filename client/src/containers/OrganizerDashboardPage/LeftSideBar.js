import { useState } from 'react';

import styled from 'styled-components';
import tw from 'twin.macro';

import {
  FlexContainer,
  NormalText,
  BoldText
} from '../../components/base';

import { Marginer } from '../../components/Marginer';

import { IconContext } from 'react-icons';
import { FcLandscape } from 'react-icons/fc';
import { FaUserFriends } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import {
  GiHamburgerMenu,
  GiOrganigram,
  GiCastle
} from 'react-icons/gi';

import { MenuItems } from './MenuItems.js';

const Container = styled.div`
position: absolute;
top: 0;
left: 0;
// left: ${props => props.active ? '0' : '-220px'};
width: ${props => props.active ? '300px' : '90px'};

${tw`
bg-black
h-full
overflow-hidden
transition-all
`}
`;

const DashboardLogoContainer = styled.img`
width: ${props => props.active ? '80px' : '40px'};
height: ${props => props.active ? '80px' : '40px'};

${tw`
rounded-full
overflow-hidden
object-cover
shadow-md
border-2 border-gray-800
transition-all
`}

`;

const MenuContainer = styled.div`
${tw`
flex
flex-col
justify-center
items-center
px-2
py-4
`}
`;

const MenuButtonContainer = styled.div`
${tw`
w-full
px-6
py-4
flex
items-center
justify-start
rounded-md
shadow-sm
bg-transparent
transition-all
cursor-pointer
hover:bg-gray-600
`}

justify-content: ${props => props.active ? 'flex-start' : 'center' };

`;

const InteractableContainer = styled.div`
${tw`
cursor-pointer
px-1
`}
`;


const MenuItem = ({active, icon, color, name, ...props}) => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '28'}}>
      <MenuButtonContainer active={active}>
        { icon }
        { active ?
          <>
            <Marginer horizontal='1rem'/>
            <BoldText> { name } </BoldText>        
          </> : <></>}
      </MenuButtonContainer>
    </IconContext.Provider>
  );
};



export default function LeftSideBar(){
  const [isOpen, setIsOpen] = useState(true);

  const toggleBar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);    
  };

  return (
    <Container active={isOpen}>
      <FlexContainer justify={isOpen ? 'flex-end' : 'center'} pad='1rem'>
        <InteractableContainer onClick={toggleBar}>
          {isOpen ?
           <MdCancel size='36' color='white'/>
           : <GiHamburgerMenu size='28' color='white'/>
          }
        </InteractableContainer>
      </FlexContainer>
      <FlexContainer direction='col'
                     justify='center'
                     align='center'>
        <DashboardLogoContainer src='/assets/images/chc_gaming_logo.png' active={isOpen}/>
        <Marginer vertical='0.5rem'/>
        { isOpen ?
          <>
            <BoldText> Charicha Gaming </BoldText>
            <NormalText> In chaos! </NormalText>                     
          </> : null}
      </FlexContainer>

      <FlexContainer direction='col'
                     justify={isOpen ? 'flex-start' : 'center'}
                     pad='0rem 0.4rem'>
        { MenuItems.map((item) =>
          <MenuItem active={isOpen}
                    icon={item.icon}
                    name={item.name}/>)
        }
      </FlexContainer>
    </Container>
  );
}
