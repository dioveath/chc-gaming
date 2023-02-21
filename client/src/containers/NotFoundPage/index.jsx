import styled from 'styled-components';
import tw from 'twin.macro';
import { NotFound } from './NotFound';

const PageContainer = styled.div`
  background: radial-gradient(#1D0207, #0D0000);
${tw`
flex
flex-col
w-screen
h-screen
items-center
justify-center
overflow-x-hidden
`}

`;





export default function NotFoundPage(){
  return <PageContainer>
           <NotFound/>
         </PageContainer>;
}
  
