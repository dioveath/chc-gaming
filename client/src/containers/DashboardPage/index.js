import styled from 'styled-components';
import tw from 'twin.macro';

import { useSelector } from 'react-redux';
import LeftProfileBar from './LeftProfileBar.js';
import MainSection from './MainSection.js';
import RightBarSection from './RightBarSection.js';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Marginer } from '../../components/Marginer';

const PageContainer = styled.div`
  background: radial-gradient(#1D0207, #0D0000);
${tw`
flex
flex-wrap
w-screen
h-screen
items-start
justify-center
overflow-x-hidden
gap-4
px-6
`}
`;



export default function DashboardPage(){
  const user = useSelector(state => state.auth);

  return (
    <>
      <Navbar/>
      <Marginer vertical='6rem'/>
      <PageContainer>
        
        {/* <LeftProfileBar/> */}
        <MainSection/>
        <RightBarSection/>

      </PageContainer>
      <Footer/>
    </>
  );
}
