import { useSelector } from 'react-redux';
import { Marginer } from '../../components/Marginer';

import {
  Container,
  BottomContainer,
  TitleContainer,
  TitleText,
} from './ProfileElements';

import UserInfoSection from './UserInfoSection.js';


export function ProfileSection(){
  let user = useSelector((state) => state.user);

  return (
    <Container>
      <UserInfoSection/>
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
