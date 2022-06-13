import { useState, useEffect, useRef } from 'react';

import {
  LeftBarContainer,
  ProfileContainer,
  ProfileStatsContainer,
} from './../../DashboardPage/LeftSideBar/StyledElements.js';

import MenuItem from '../../../components/LeftNavbar/MenuItem';

import {
  FlexContainer
} from '../../../components/base';

import {
  Text,
  NormalText,
  BoldText
} from '../../../components/Text';

import { Marginer } from '../../../components/Marginer';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../../components/Responsive';
import { FaTimes } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

const useClickOutside = (handler) => {
  const domNodeRef = useRef();

  useEffect(() => {
    const mouseHandler = (event) => {
      if(!domNodeRef.current.contains(event.target))
        handler();
    };

    window.addEventListener('mousedown', mouseHandler);
    return () => window.removeEventListener('mousedown', mouseHandler);
  }, [handler]);

  return domNodeRef;
};

export default function LeftSideBar({ menuItems, onChangeMenu, activeMenu }){
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const [ open, setOpen] = useState(!isMobile);

  const navNode = useClickOutside(() => {
    setOpen(false);
  });

  return (
    <LeftBarContainer active={open} ref={navNode}>
      <FlexContainer justify={ open ? 'flex-end' : 'center'}
                     onClick={() => { setOpen(!open); }}
                     pad={ open ? '2rem' : '1rem'}>
        { open ?
          <FaTimes size='2rem' color='white'/> :
          <GiHamburgerMenu size='2rem' color='white'/>}
      </FlexContainer>
      
      <FlexContainer align='center' justify='center' gap='1rem' pad='1rem 0rem'>
        <ProfileContainer src='assets/images/altair.jpg'
                          active={open}>
        </ProfileContainer>
        { open && <FlexContainer direction='col'>
                    <BoldText> { "Tournament "} </BoldText>
                    <Text fontSize='0.7rem'
                          fontWeight='400'> @{ "Tournament ID " }</Text>
                    <Text fontSize='0.8rem'
                          fontWeight='500'> { 'Immortal' }</Text>          
                  </FlexContainer> }

      </FlexContainer>

      { open && <ProfileStatsContainer>
                    <FlexContainer direction='col'
                                   justify='center'
                                   align='center'>
                      <BoldText> 57 </BoldText>
                      <NormalText> Clips </NormalText>
                    </FlexContainer>
                    <FlexContainer direction='col'
                                   justify='center'
                                   align='center'>
                      <BoldText> 10.2K  </BoldText>
                      <NormalText> Followers </NormalText>
                    </FlexContainer>
                    <FlexContainer direction='col'
                                   justify='center'
                                   align='center'>
                      <BoldText> 2.7K  </BoldText>
                      <NormalText> Following </NormalText>
                    </FlexContainer>                
                  </ProfileStatsContainer> }

      <FlexContainer direction='col'
                     pad='1rem 0.4rem'
                     gap='0.5rem'>
        { menuItems.map((item) => {
          return (<MenuItem key={item.name}
                            open={open}
                            active={activeMenu === item.name}
                            icon={item.icon}
                            name={item.name}
                            onClick={() => { onChangeMenu(item.name); }}/>);
        })}
      </FlexContainer>

    </LeftBarContainer>    
  );
}
