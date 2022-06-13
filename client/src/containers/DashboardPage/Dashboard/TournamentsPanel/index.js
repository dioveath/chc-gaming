import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";

import { useGetTourneysQuery } from "../../../../redux/TourneyApi";

import { Marginer } from '../../../../components/Marginer';
import { Text } from "../../../../components/Text";
import TournamentCard from "./TourneyCard";

const Container = styled.div``;

const TournamentListContainer = styled.div`
  ${tw`
flex
flex-wrap
gap-4
my-4
`}
`;

export default function TournamentsPanel() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data } = useGetTourneysQuery();
  const registeredTourneys = data?.tourneys?.filter((t) =>
    t.registrations.find((r) => r.registrant_id === auth.userId)
  );

  return (
    <Container>
      <Text fontSize="2rem" fontWeight="700" className="mb-6">
        Your Upcoming Tournaments
      </Text>

      <TournamentListContainer>
        {registeredTourneys?.map((tourney) => {
          return <TournamentCard key={tourney.id} tourney={tourney} />;
        })}

        {registeredTourneys && !registeredTourneys.length && (
          <Text>
            You haven't registered for any tournament! Register and visit again!
          </Text>
        )}
      </TournamentListContainer>
      <Marginer vertical='20rem'/>
    </Container>
  );
}
