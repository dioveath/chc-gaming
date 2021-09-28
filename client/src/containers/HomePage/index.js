import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import Navbar from  '../../components/Navbar';
import TopSection from '../HomePage/TopSection';
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


export default function HomePage(){
  return <PageContainer>
           <Navbar/>
           <TopSection/>
           <Footer/>
         </PageContainer>;
}
