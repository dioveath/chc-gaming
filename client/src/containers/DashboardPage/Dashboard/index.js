import { Tab, TabPanel } from '../../../components/Tab';
import { Text } from '../../../components/Text';
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
        <TabPanel name='Leagues'>
	  <div className='grid place-items-center mt-10'>
            <Text className='text-xl'> Coming soon! </Text>
          </div>
        </TabPanel>
      </Tab>
    </MainSectionContainer>
  );
}
