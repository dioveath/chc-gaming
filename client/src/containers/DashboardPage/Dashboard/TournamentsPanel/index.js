import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";

import { setTourneys, pending, error } from "../../../../redux/TourneySlice";
import config from "../../../../config/config";

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
  const { allTourneys } = useSelector((state) => state.tourney);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(pending());

      try {
        const options = {
          method: "GET",
          url: `${config.serverUrl}/api/v1/tourneys`,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
        };

        const response = await axios.request(options);
        dispatch(setTourneys(response.data.tourneys));
      } catch (e) {
        console.log(e);
        dispatch(error(e.response.data.errorList));
      }
    })();
  }, [auth.accessToken, dispatch]);

  return (
    <Container>
      <Text fontSize="2rem" fontWeight="700">
        Upcoming Tournaments
      </Text>

      <TournamentListContainer>
        {allTourneys.map((tourney) => {
          return <TournamentCard key={tourney.id} tourney={tourney} />;
        })}
      </TournamentListContainer>
    </Container>
  );
}
