import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';

import {
  FlexContainer,
  NormalText,
  BoldText
} from '../../components/base';

import { Marginer } from '../../components/Marginer';

import { IconContext } from 'react-icons';
import { MdCancel } from 'react-icons/md';
import {
  GiHamburgerMenu,
} from 'react-icons/gi';

import { MenuItems } from './MenuItems.js';
import { setActiveMenu } from '../../redux/OrganizerDashboardSlice.js';

const Container = styled.div`
// position: absolute;
// top: 0;
// left: 0;
// left: ${props => props.open ? '0' : '-220px'};
width: ${props => props.open ? '300px' : '90px'};

${tw`
bg-black
h-full
overflow-x-hidden
overflow-y-scroll
transition-all
`}
`;

const DashboardLogoContainer = styled.img`
width: ${props => props.open ? '80px' : '40px'};
height: ${props => props.open ? '80px' : '40px'};

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
`}

justify-content: ${props => props.open ? 'flex-start' : 'center' };
background-color: ${props => props.active ? '#922626' : 'transparent'};

&:hover { 
background-color: ${props => props.active ? 'rgb(17 24 39)' : 'rgb(31 41 55)'};
}

`;

const InteractableContainer = styled.div`
${tw`
cursor-pointer
px-1
`}
`;

const MenuItem = ({open, active,  icon, color, name, onClick, ...props}) => {
  return (
    <IconContext.Provider value={{ color: 'white', size: '28'}}>
      <MenuButtonContainer open={open} active={active} onClick={onClick}>
        { icon }
        { open ?
          <>
            <Marginer horizontal='1rem'/>
            <BoldText> { name } </BoldText>        
          </> : <></>}
      </MenuButtonContainer>
    </IconContext.Provider>
  );
};


export default function LeftSideBar(){
  const dispatch = useDispatch();
  const { dashboard } = useSelector(state => state.organizer);  
  const [isOpen, setIsOpen] = useState(true);

  const toggleBar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);    
  };

  const changeMenu = (menu) => {
    dispatch(setActiveMenu(menu));
  };

  return (
    <Container open={isOpen}>
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
        <DashboardLogoContainer src='/assets/images/chc_gaming_logo.png' open={isOpen}/>
        <Marginer vertical='0.5rem'/>
        { isOpen ?
          <>
            <BoldText> Charicha Gaming </BoldText>
            <NormalText> In chaos! </NormalText>                     
          </> : null}
      </FlexContainer>

      <FlexContainer direction='col'
                     justify={isOpen ? 'flex-start' : 'center'}
                     pad='1rem 0.5rem'>
        { MenuItems.map((item) =>
          <MenuItem key={item.name}
                    open={isOpen}
                    active={item.name === dashboard.activeMenu}
                    icon={item.icon}
                    name={item.name}
                    onClick={() => { changeMenu(item.name); }}/>)
        }
      </FlexContainer>
    </Container>
  );
}
