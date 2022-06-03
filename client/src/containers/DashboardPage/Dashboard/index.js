import { Tab, TabPanel } from '../../../components/Tab';
import HomePanel from './HomePanel';
import ClipsPanel from './ClipsPanel';
import TournamentsPanel from './TournamentsPanel';
import MatchesPanel from './MatchesPanel';
import styled from 'styled-components';
import tw from 'twin.macro';

const MainSectionContainer = styled.div`
${tw`
w-full
h-full
`}
`;

export default function Dashboard(){
  return (
    <MainSectionContainer>
      <Tab>
        <TabPanel name='Home'>
          <HomePanel/>
        </TabPanel>
        <TabPanel name='Clips'>
          <ClipsPanel/>
        </TabPanel>
        <TabPanel name='Matches'>
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
