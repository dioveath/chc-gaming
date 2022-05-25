import styled from "styled-components";
import tw from "twin.macro";

import { Text, NormalText, BoldText } from "../../../../components/Text";
import { FlexContainer, WrapContainer } from "../../../../components/base";
import Button from "../../../../components/Button";

const Container = styled.div`
  ${tw`
w-full
`}
`;

const MatchCardContainer = styled.div`
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

const MatchDetailsContainer = styled.div`
  ${tw`
relative
flex
flex-col
gap-4
p-4
`}
transform: translate(0, -100%);
`;


export default function MatchesPanel() {
  return (
    <Container>
      <Text fontSize="2rem" fontWeight="700">
        Your Upcoming Matches
      </Text>

      <WrapContainer>
        <MatchCardContainer>
      <TournamentCardImage
        alt="Tournament Cover Image"
        src="/assets/images/celebration.jpg"
      />
      <MatchDetailsContainer>
        <FlexContainer direction="col">
          <NormalText> FIFA 22 </NormalText>
          <BoldText> Tournament </BoldText>
        </FlexContainer>

        <FlexContainer justify="space-between">
          <FlexContainer direction="col">
            <NormalText> Modes </NormalText>
            <BoldText> Solo </BoldText>
          </FlexContainer>

          <FlexContainer direction="col">
            <NormalText> Location </NormalText>
            <BoldText> Charicha Gaming </BoldText>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="col">
          <NormalText> Opponent </NormalText>
          <BoldText> icerush </BoldText>
        </FlexContainer>

        <FlexContainer justify="center" w="100%">
          <Button
            w="100%"
            disabled={true}
            onClick={() => { }}
          >
            Start Now
          </Button>
        </FlexContainer>
      </MatchDetailsContainer>
        </MatchCardContainer>
      </WrapContainer>
    </Container>
  );
}
