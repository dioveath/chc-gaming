import styled from 'styled-components';
import tw from 'twin.macro';

import { useSelector } from 'react-redux';
import LogoProfile from '../../assets/images/logo_profile.png';
import LeftSideBar from './LeftSideBar.js';

const PageContainer = styled.div`
  background: radial-gradient(#1D0207, #0D0000);
${tw`
flex
flex-col
w-screen
h-screen
items-start
overflow-x-hidden
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
      <LeftSideBar/>
    </PageContainer>
  );
}
