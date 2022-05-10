import styled from 'styled-components';
import tw from 'twin.macro';

import { useSelector } from 'react-redux';
import LogoProfile from '../../assets/images/logo_profile.png';

const PageContainer = styled.div`
  background: radial-gradient(#1D0207, #0D0000);
${tw`
flex
flex-col
w-screen
h-screen
items-start
overflow-x-hidden
px-6
md:px-12
lg:px-32
xl:px-64
`}

`;

const ProfileContainer = styled.div`
width: 96px;
${tw`
rounded-full
shadow-md
overflow-hidden
`}
`;

const NormalText = styled.p`
${tw`
text-base
text-white
`}
`;



export default function OrganizerDashboardPage(){
  const user = useSelector(state => state.auth);

  return (
    <PageContainer>
      <ProfileContainer>
        <img alt={user.first_name + ' Profile Image'} src={LogoProfile}/>
      </ProfileContainer>
      <NormalText> Welcome, {user.gaming_name} in OrganizerDashboardPage</NormalText>
      <NormalText> You can organize tournaments and leagues here! </NormalText>
      <NormalText> You organized Charicha FIFA 22 League Season 3! and these were the results! </NormalText>
      
      <NormalText> Other tournaments for you based on your organization ranks, </NormalText>
      <ul>
        <li> <NormalText> Charicha FIFA 22 Tournament </NormalText> </li>
        <li> <NormalText> xTreme Esports FIFA  </NormalText> </li>
      </ul>      
    </PageContainer>
  );
}
