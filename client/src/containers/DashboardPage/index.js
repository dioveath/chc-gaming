import styled from 'styled-components';
import tw from 'twin.macro';

import { useSelector } from 'react-redux';
import LeftProfileBar from './LeftProfileBar.js';
import MainSection from './MainSection.js';
import RightBarSection from './RightBarSection.js';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Marginer } from '../../components/Marginer';

import {
  FlexContainer
} from '../../components/base';

import {
  Text
} from '../../components/Text';

import BounceLoader from 'react-spinners/BounceLoader';
import { MdOutlineError } from 'react-icons/md';

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
  const { isPending, isError } = useSelector(state => state.user);

  if(isError) return <PageContainer>
                       <FlexContainer direction='col' justify='center' align='center'>
                         <MdOutlineError size='4rem' color='white'/>
                         <Text fontSize='1.4rem'
                               fontWeight='600'
                               color='white'> Server Error | 500 </Text>                         
                       </FlexContainer>
                     </PageContainer>;

  return (
    <>
      {isPending ?
       <PageContainer>
         <FlexContainer justify='center' align='center'>
           <BounceLoader color='red'/>
         </FlexContainer>         
       </PageContainer>
       :
       <>
         <Navbar/>
         <Marginer vertical='6rem'/>
         <PageContainer>
           
           <LeftProfileBar/>
           <MainSection/>
           <RightBarSection/>

         </PageContainer>
         <Footer/>
       </>
      }
    </>
  );
}
