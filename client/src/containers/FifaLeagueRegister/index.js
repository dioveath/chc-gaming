import styled from 'styled-components';
import tw from 'twin.macro';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { RegisterFifaSection } from './RegisterSection';

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

export function FifaLeagueRegister(){
  return (
    <PageContainer>
      <Navbar/>
      <RegisterFifaSection/>
      <Footer/>
    </PageContainer>
  );
}


export default FifaLeagueRegister; 
