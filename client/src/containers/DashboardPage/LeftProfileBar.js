import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  LeftBarContainer,
  ProfileContainer,
  NormalText,
  BoldText,
  ProfileStatsContainer,
} from './DashboardElements.js';

import MenuItem from '../../components/LeftNavbar/MenuItem.js';
import { setActiveMenu } from '../../redux/UserDashboardSlice.js';

import {
  FlexContainer
} from '../../components/base';

import {
  Text
} from '../../components/Text';

import { Marginer } from '../../components/Marginer';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../components/Responsive';
import { FaTimes } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';



export default function LeftProfileBar({ menuItems }){
  const { data, isPending, error } = useSelector(state => state.user);
  const { dashboard } = useSelector(state => state.userDashboard);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const [ open, setOpen] = useState(!isMobile);
  const dispatch = useDispatch();

  console.log(dashboard);

  return (
    <LeftBarContainer active={open}>

      <Marginer vertical='4rem'/>
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
                    <BoldText> { data.first_name + ' ' + data.last_name } </BoldText>
                    <Text fontSize='0.7rem'
                          fontWeight='400'> @{ data.gaming_name }</Text>
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
          return (<MenuItem open={open}
                            active={dashboard.activeMenu === item.name}
                            icon={item.icon}
                            name={item.name}
                            onClick={() => { dispatch(setActiveMenu(item.name)); }}/>);
        })}
      </FlexContainer>

    </LeftBarContainer>    
  );
}

