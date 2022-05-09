
import LogoProfile from '../../assets/images/logo_profile.png';
import { Marginer } from '../../components/Marginer';

import { useSelector } from 'react-redux';

import {
  Container,
  TopContainer,
  BottomContainer,
  TitleContainer,
  BasicInformationContainer,
  Stats1Container,
  PrimaryStatsContainer,
  ProfileAvatarContainer,
  InformationText,
  TitleText,
  SubtitleText
} from './ProfileElements';



export function ProfileSection(){

  var user = useSelector((state) => state.user);

  return (
    <Container>
      <TitleContainer>
        <TitleText>
          { user.first_name } Profile
        </TitleText>
      </TitleContainer>
      <TopContainer>

        <PrimaryStatsContainer>
          <ProfileAvatarContainer>
            <img alt={user.first_name + ' Profile Image'}src={LogoProfile}/>
          </ProfileAvatarContainer>

          <BasicInformationContainer>
            <SubtitleText> Basic Information </SubtitleText>
            <Marginer vertical="10px"/>
            <InformationText title="Name: " info={`${user.first_name} ${user.last_name}`}/>
            <InformationText title="Gaming Name: " info={`${user.gaming_name}`}/>
            <InformationText title="Email: " info={`${user.email}`}/>
            <InformationText title="Medals: " info={` N/A `}/>
            <InformationText title="Achievments: " info={` N/A `}/>
            <InformationText title="Trophies: " info={` N/A `}/>
            <InformationText title="Tags: " info={` N/A `}/>                                                
          </BasicInformationContainer>

        </PrimaryStatsContainer>

        <Stats1Container>
          <SubtitleText>
            Stats
          </SubtitleText>
        </Stats1Container>
      </TopContainer>
      <Marginer vertical="30px"/>
      <BottomContainer>
        <TitleContainer>
          <TitleText>
            All Stats
          </TitleText>
        </TitleContainer>
              
      </BottomContainer>      
    </Container>
  );
}
