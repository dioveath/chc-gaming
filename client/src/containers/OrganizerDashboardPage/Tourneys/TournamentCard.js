import styled from 'styled-components';
import tw from 'twin.macro';

import {
  NormalText,
  BoldText,
  FlexContainer
} from '../../../components/base';
import Button from '../../../components/Button';

const TournamentCardContainer = styled.div`
${tw`
rounded-md
shadow-2xl
w-64
h-64
bg-black
justify-between
overflow-hidden
cursor-pointer
`}
`;

const TournamentCardImage = styled.img`
${tw`
object-cover
w-full
h-full
opacity-60
`}
`;


export default function TournamentCard(props){
  return (
    <TournamentCardContainer>
      <TournamentCardImage alt="Tournament Cover Image"
                           src="/assets/images/celebration.jpg"/>
      <FlexContainer direction='col'
                     align='space-between'
                     gap='1rem'
                     pad='1rem'
                     style={{
                       'position': 'relative',
                       'transform': 'translate(0, -100%)'
                     }}>
        <FlexContainer direction='col' >
          <NormalText> FIFA 22 </NormalText>
          <BoldText> Tournament </BoldText>            
        </FlexContainer>


        <FlexContainer justify='space-between'>
          <FlexContainer direction='col'>
            <NormalText> Players </NormalText>
            <BoldText> 32 Players </BoldText>
          </FlexContainer>

          <FlexContainer direction='col'>
            <NormalText> Regions </NormalText>
            <BoldText> Nepal </BoldText>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction='col'>
          <NormalText> Modes </NormalText>
          <BoldText> Solo </BoldText>
        </FlexContainer>

        <FlexContainer justify='center'>
          <Button text='Edit Tourney'/>
        </FlexContainer>
      </FlexContainer>
    </TournamentCardContainer>);
}
