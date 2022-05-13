import styled from 'styled-components';
import tw from 'twin.macro';

import { useSelector } from 'react-redux';
import LeftProfileBar from './LeftProfileBar.js';
import MainSection from './MainSection.js';
import FriendsPage from './Friends';
import ClanPage from './Clan';
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
import { FaUserFriends } from 'react-icons/fa';
import { FcLandscape } from 'react-icons/fc';
import { GiCastle } from 'react-icons/gi';
import { MdDashboard } from 'react-icons/md';


const PageContainer = styled.div`
  background: radial-gradient(#1D0207, #0D0000);
padding-left: 60px;
${tw`
flex
w-screen
h-screen
justify-center
overflow-x-hidden
`}
`;


const MenuItems = [
  {
    'name': 'Dashboard',
    'icon': <MdDashboard/>,
    'content': <MainSection/>
  },
  {
    'name': 'Friends',
    'icon': <FaUserFriends/>,
    'content': <FriendsPage/>
  },
  {
    'name': 'Your Clan',
    'icon': <GiCastle/>,
    'content': <ClanPage/>
  },
  {
    'name': 'Explore',
    'icon': <FcLandscape/>,
    'content': <MainSection/>
  }  
];



export default function DashboardPage(){
  const { isPending, isError } = useSelector(state => state.user);
  const { dashboard } = useSelector(state => state.userDashboard);
  const renderContent = MenuItems.find((menu) => menu.name === dashboard.activeMenu).content;  

  if(isError) return <FlexContainer bg={'radial-gradient(#1D0207, #0D0000)'}
                                    w='100vw'
                                    h='100vh'
                                    justify='center'
                                    align='center'>
                       <MdOutlineError size='4rem' color='white'/>
                       <Text fontSize='1.4rem'
                             fontWeight='600'
                             color='white'> Server Error | 500 </Text>                         
                     </FlexContainer>;

  if(isPending) return <FlexContainer bg={'radial-gradient(#1D0207, #0D0000)'}
                                       w='100vw'
                                       h='100vh'
                                       justify='center'
                                       align='center'>
                          <BounceLoader color='red'/>
                        </FlexContainer>;

  return (
    <>
      <PageContainer>
        <LeftProfileBar menuItems={MenuItems}/>
        <FlexContainer justify='center'
                       pad='0.5rem'
                       gap='1rem'>
          { renderContent }
        </FlexContainer>
      </PageContainer>
    </>
  );
}
