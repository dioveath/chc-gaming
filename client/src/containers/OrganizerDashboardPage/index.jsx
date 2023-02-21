import styled from 'styled-components';
import tw from 'twin.macro';

import { useSelector } from 'react-redux';
import LeftSideBar from './LeftSideBar';
import { MenuItems } from './MenuItems';

const PageContainer = styled.div`
  background: radial-gradient(#1D0207, #0D0000);
${tw`
flex
w-screen
h-screen
overflow-x-hidden
gap-4
`}

`;

const ContentContainer = styled.div`
  ${tw`
w-full
h-full
p-2
flex
justify-center
`}
`;

export default function OrganizerDashboardPage(){
  const { dashboard } = useSelector(state => state.organizer);
  const renderContent = MenuItems.find((menu) => menu.name === dashboard.activeMenu);

  

  return (
      <PageContainer>
        <LeftSideBar/>
	<ContentContainer>
          { renderContent?.content }
        </ContentContainer>
      </PageContainer>      
  );
}
