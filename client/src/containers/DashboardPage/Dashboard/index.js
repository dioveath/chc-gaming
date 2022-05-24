import { Tab, TabPanel } from '../../../components/Tab';
import HomePanel from './HomePanel';
import TournamentsPanel from './TournamentsPanel';
import MatchesPanel from './MatchesPanel';
import styled from 'styled-components';
import tw from 'twin.macro';

const MainSectionContainer = styled.div`
${tw`
`}
`;

export default function Dashboard(){
  return (
    <MainSectionContainer>
      <Tab>
        <TabPanel name='Home'>
          <HomePanel/>
        </TabPanel>
        <TabPanel name='Clips'></TabPanel>
        <TabPanel name='Your Matches'>
          <MatchesPanel/>
        </TabPanel>
        <TabPanel name='Tournaments'>
          <TournamentsPanel/>
        </TabPanel>
        <TabPanel name='Leagues'></TabPanel>
      </Tab>
    </MainSectionContainer>
  );
}
