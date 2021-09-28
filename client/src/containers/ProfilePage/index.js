import styled from 'styled-components';
import tw from 'twin.macro';
import Navbar from '../../components/Navbar';

import { ProfileSection } from './ProfileSection';
import Footer from '../../components/Footer';

const PageContainer = styled.div`
  background: radial-gradient(#1D0207, #0D0000);
${tw`
flex
flex-col
w-screen
h-screen
items-center
overflow-x-hidden
`}

`;


export function ProfilePage(){
  return (
    <PageContainer>
      <Navbar/>
      <ProfileSection/>
      <Footer/>
    </PageContainer>
  );
}

export default ProfilePage;
