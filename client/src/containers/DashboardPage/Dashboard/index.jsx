import { BottomTab, BottomTabPanel } from '../../../components/BottomTab';
import { Text } from '../../../components/Text';
import HomePanel from './HomePanel';
import ClipsPanel from './ClipsPanel';
import TournamentsPanel from './TournamentsPanel';
import MatchesPanel from './MatchesPanel';
import styled from 'styled-components';
import tw from 'twin.macro';

import { Marginer } from '../../../components/Marginer';

import { IconContext } from 'react-icons';
import { GiSofa, GiCheckboxTree } from 'react-icons/gi';
import { DiHtml5Multimedia } from 'react-icons/di';
import { IoFootballOutline } from 'react-icons/io5';
import { SiPremierleague, SiPlaycanvas } from 'react-icons/si';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { BiMoviePlay } from 'react-icons/bi';

const MainSectionContainer = styled.div`
${tw`
w-full
h-full
`}
`;

const PanelItems = [
  {
    name: "Clips",
    headerIcon: <BiMoviePlay color='white' className='w-6 h-6 p-0 m-0'/>,
    panel: <ClipsPanel/>
  },
  {
    name: "Matches",
    headerIcon: <IoFootballOutline color='white' className='w-6 h-6 p-0 m-0'/>,
    panel: <MatchesPanel/>
  },
  {
    name: "Lobby",
    headerIcon: <GiSofa color='white' className='w-6 h-6 p-0 m-0'/>,
    panel: <HomePanel/>
  },  
  {
    name: "Tournaments",
    headerIcon: <GiCheckboxTree color='white' className='w-6 h-6 p-0 m-0'/>,
    panel: <TournamentsPanel/>
  },
  {
    name: "Leagues",
    headerIcon: <SiPremierleague/>,
    panel: <div className='grid place-items-center mt-10'>
            <Text className='text-xl'> Coming soon! </Text>
          </div>
  },     
];

export default function Dashboard(){
  return (
    <MainSectionContainer>
      <BottomTab>
        { PanelItems.map((p) => <BottomTabPanel key={p.name} name={p.name} headerIcon={p.headerIcon}>
                                  {p.panel}
                                  <Marginer vertical='20rem'/>
                                </BottomTabPanel>)}
      </BottomTab>
    </MainSectionContainer>
  );
}
