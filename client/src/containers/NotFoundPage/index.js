import styled from 'styled-components';
import tw from 'twin.macro';
import { GiGamepadCross } from 'react-icons/gi';

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


const Text = styled.p`
font-size: 1.2rem;
font-weight: 600;
color: white;
`;

const Border = styled.div`
height: 10px;
background-color: white;
`;


export default function NotFound(){
  return <PageContainer>
           <GiGamepadCross size='40px' color='white'/>
           <Border/>
           <Text> 404 | Not Found </Text>
         </PageContainer>;
}
  
