import styled from "styled-components";
import tw from "twin.macro";
import { useSelector } from "react-redux";

import { useGetTourneysQuery } from "../../../../redux/TourneyApi";

import { Text, NormalText, BoldText } from "../../../../components/Text";
import { FlexContainer, WrapContainer } from "../../../../components/base";
import Button from "../../../../components/Button";

import MatchCard from "./MatchCard";

const Container = styled.div`
  ${tw`
w-full
`}
`;

export default function MatchesPanel() {
  const { data } = useGetTourneysQuery();
  const auth = useSelector((state) => state.auth);

  const pTourneys = data?.tourneys.filter((t) =>
    t.participants.find((p) => p.participant_id === auth.userId)
  );

  return (
    <Container>
      <Text fontSize="2rem" fontWeight="700">
        Your Upcoming Matches
      </Text>

      <FlexContainer direction='col' className='my-4'>
        {pTourneys?.map((t) => (
          <FlexContainer direction='col'>
            <FlexContainer direction='col' className='my-2'>
              <Text className="font-bold text-lg"> {t.title}</Text>
            </FlexContainer>
            <Matches tourney={t} userId={auth.userId}/>
          </FlexContainer>
        ))}
        {pTourneys && !pTourneys.length && <Text> You havent' registered for any tournaments. So, No matches for you! </Text>}
      </FlexContainer>
    </Container>
  );
}


const Matches = ({ tourney, userId }) => {
  const participant = tourney.participants.find((p) => p.participant_id === userId);
  const tourneyPlayer = tourney.tourney_data.participant.find((p) => p.name === participant.name);

  const matches = tourney.tourney_data.match.filter((m) => {
    if(m.status !== 2 && m.status !== 1) return false;
    if(m?.opponent1 === null || m?.opponent2 === null) return false;
    if(m?.opponent1?.id === null || m?.opponent2?.id === null) return false;
    if(m.opponent1.id === tourneyPlayer.id || m.opponent2.id === tourneyPlayer.id) return true;
    return false;
  });

  return (
    <WrapContainer>
      { matches.map((m) => <MatchCard match={m} userId={userId} tourney={tourney}/>)}
      { !matches.length && <Text> You don't have any match this round! </Text> }
    </WrapContainer>          
  );
};
