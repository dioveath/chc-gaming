import styled from 'styled-components';
import tw from 'twin.macro';

import { BoldText } from '../../../../components/Text';
import Post from '../../../../components/Post';

const HomePanelContainer = styled.div`

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
flex-wrap
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
      <Post/>
      <Post/>
      <Post/>
      <Post/>      

    </HomePanelContainer>
  );

}
