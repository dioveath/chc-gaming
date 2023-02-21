import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";

import { setTourneys, pending, error } from "../../../redux/TourneySlice";
import TournamentCard from "./TournamentCard";
import config from "../../../config/config";

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

export default function Tourneys() {
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
      <HTitleText> Your Tournaments </HTitleText>
      <TournamentListContainer>
        {allTourneys.map((tourney) => {
          return <TournamentCard key={tourney.id}
                                 tourney={tourney} />;
        })}
      </TournamentListContainer>
    </Container>
  );
}
