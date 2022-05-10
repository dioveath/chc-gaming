import styled from 'styled-components';
import tw from 'twin.macro';

import { useSelector } from 'react-redux';
import LeftProfileBar from './LeftProfileBar.js';
import { NormalText } from './DashboardElements.js';

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





export default function DashboardPage(){
  const user = useSelector(state => state.auth);

  return (
    <PageContainer>
      
      <LeftProfileBar/>
      <NormalText> Welcome, {user.gaming_name} </NormalText>
      <NormalText> You secured 3rd position in Charicha FIFA 22 League Season 3! </NormalText>
      
      <NormalText> Your Upcoming matches: </NormalText>
      <ul>
        <li> <NormalText> vs void </NormalText> </li>
        <li> <NormalText> vs subba </NormalText> </li>
      </ul>
      <NormalText> Upcoming tournaments for you based on your ranks, </NormalText>
      <ul>
        <li> <NormalText> Charicha FIFA 22 Tournament </NormalText> </li>
        <li> <NormalText> xTreme Esports FIFA  </NormalText> </li>
      </ul>      
    </PageContainer>
  );
}
