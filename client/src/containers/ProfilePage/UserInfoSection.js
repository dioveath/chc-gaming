import { useSelector } from 'react-redux';
import LogoProfile from '../../assets/images/logo_profile.png';
import {
  TopContainer,  
  BasicInformationContainer,
  Stats1Container,
  PrimaryStatsContainer,
  ProfileAvatarContainer,
  InformationText,
  SubtitleText,
  TitleContainer,
  TitleText,  
} from './ProfileElements.js';

import { Marginer } from '../../components/Marginer';


export default function UserInfoSection(){
  const user = useSelector((state) => state.user);

  return (
    <>
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
          {/* <InformationText title="Games: " info={` N/A `}/> */}
          {/* <InformationText title="Other: " info={` N/A `}/> */}
          {/* <InformationText title="This: " info={` N/A `}/> */}
          {/* <InformationText title="That: " info={` N/A `}/> */}
        </Stats1Container>
      </TopContainer>
    </>
  );
}  
