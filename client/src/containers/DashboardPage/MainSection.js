import { Tab, TabPanel } from '../../components/Tab';
import HomePanel from './HomePanel.js';
import styled from 'styled-components';
import tw from 'twin.macro';

const MainSectionContainer = styled.div`
min-width: 600px;
${tw`
`}
`;

export default function MainSection(){
  return (
    <MainSectionContainer>
      <Tab>
        <TabPanel name='Home'>
          <HomePanel/>
        </TabPanel>
        <TabPanel name='Clips'></TabPanel>
        <TabPanel name='Your Matches'></TabPanel>
        <TabPanel name='Tournaments'></TabPanel>
        <TabPanel name='Leagues'></TabPanel>
      </Tab>
    </MainSectionContainer>
  );
}
