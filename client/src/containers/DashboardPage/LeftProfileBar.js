import LogoProfile from '../../assets/images/logo_profile.png';
import { useSelector } from 'react-redux';

import {
  LeftBarContainer,
  ProfileContainer,
  FlexContainer,
  NormalText,
  BoldText,
  ProfileStatsContainer,
  MenuContainer,
  MenuButtonContainer
} from './DashboardElements.js';

import { Marginer } from '../../components/Marginer';
import { FaUserFriends } from 'react-icons/fa';
import { FcLandscape } from 'react-icons/fc';
import { GiCastle, GiOrganigram } from 'react-icons/gi';


export default function LeftProfileBar(){
  const user = useSelector(state => state.user);

  return (
    <LeftBarContainer>
      <FlexContainer align='center' gap='1rem' pad='1rem 1.6rem'>
        <ProfileContainer
          src='assets/images/altair.jpg'>
          {/* <img alt={user.first_name + ' Profile Image'} */}
          {/*      src='assets/images/altair.jpg' */}
          {/*      width='100%' height='100%' */}
          {/*      objectFit='cover'/> */}
        </ProfileContainer>
        <FlexContainer direction='col'>
          <BoldText> Saroj Rai </BoldText>
          <NormalText> Immortal </NormalText>                  
        </FlexContainer>
      </FlexContainer>

      <ProfileStatsContainer>
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
      </ProfileStatsContainer>

      <MenuContainer>
      <MenuButtonContainer>
        <FaUserFriends size='32' color='royalblue'/>
        <Marginer horizontal='1rem'/>
        <BoldText> Friends </BoldText>
      </MenuButtonContainer>

      <MenuButtonContainer>
        <GiCastle size='32' color='orange'/>
        <Marginer horizontal='1rem'/>
        <BoldText> Your clan </BoldText>
      </MenuButtonContainer>

      <MenuButtonContainer>
        <FcLandscape size='32' color='royalblue'/>
        <Marginer horizontal='1rem'/>
        <BoldText> Explore </BoldText>
      </MenuButtonContainer>


      <MenuButtonContainer>
        <GiOrganigram size='32' color='pink'/>
        <Marginer horizontal='1rem'/>
        <BoldText> Tournament Organizer </BoldText>
      </MenuButtonContainer>      
      </MenuContainer>


      

    </LeftBarContainer>    
  );
}

