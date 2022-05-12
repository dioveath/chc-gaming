import styled from 'styled-components';
import tw from 'twin.macro';

import {
  BoldText,
} from './DashboardElements.js';

import Post from '../../components/Post/index.js';

const HomePanelContainer = styled.div`
min-width: 600px;
${tw`
flex
flex-col
gap-6
my-4
`}
`;

const AllBadgesContainer = styled.div`
${tw`
flex
gap-2
`}
`;

const BadgeContainer = styled.div`
${tw`
px-12
py-1
rounded-3xl
text-sm
text-white
font-medium
bg-[#BE2222]
border border-transparent
transition-all
`}

${props => props.outlined && tw`bg-transparent border-white`}

`;

export default function HomePanel(){
  
  return (
    <HomePanelContainer>
      <BoldText> Highlights </BoldText>
      <AllBadgesContainer>
        <BadgeContainer>
          FIFA 
        </BadgeContainer>
        <BadgeContainer outlined>
          PUBG Mobile 
        </BadgeContainer>
        <BadgeContainer outlined>
          DOTA 2
        </BadgeContainer>                        
      </AllBadgesContainer>

      <Post/>

    </HomePanelContainer>
  );

}