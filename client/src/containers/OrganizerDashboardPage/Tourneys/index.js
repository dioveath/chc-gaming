import styled from 'styled-components';
import tw from 'twin.macro';

import TournamentCard from './TournamentCard.js';

const Container = styled.div`
${tw`
p-4
`}
`;

const HTitleText = styled.h1`
${tw`
font-semibold
leading-tight
text-5xl
text-white
`}
`;

const TournamentListContainer = styled.div`
${tw`
flex
flex-wrap
gap-4
my-4
`}
`;


export default function Tourneys(){
  return (
    <Container>
      <HTitleText> Your Tournaments </HTitleText>
      <TournamentListContainer>
        <TournamentCard/>
        <TournamentCard/>
        <TournamentCard/>
      </TournamentListContainer>
    </Container>
  );
}
