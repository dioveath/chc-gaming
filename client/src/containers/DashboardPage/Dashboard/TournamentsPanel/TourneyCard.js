import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";

import { FlexContainer } from "../../../../components/base";
import { NormalText, BoldText, Text } from "../../../../components/Text";
import Button from "../../../../components/Button";

import axios from "axios";
import { updateTourney } from "../../../../redux/TourneySlice";
import config from "../../../../config/config";

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

const ErrorListBox = styled.ul`
  ${tw`
w-full
`}
`;

const ErrorContainer = styled.li`
  ${tw`
flex
w-full
p-2
bg-red-800
rounded-md
`}
`;

export default function TournamentCard({ tourney }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [isPending, setPending] = useState(false);
  const [errors, setErrors] = useState([]);

  const [isRegistered, setRegistered] = useState(
    tourney.members.filter((m) => m.member_id === auth.userId).length > 0
  );

  const onRegisterHandler = async (e) => {
    e.preventDefault();
    setPending(true);

    const options = {
      method: "POST",
      url: `${config.serverUrl}/api/v1/tourneys/${tourney.id}/register/${auth.userId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.accessToken,
      },
    };

    try {
      const response = await axios.request(options);
      dispatch(updateTourney(response.data.updatedTourney));
      setRegistered(
        tourney.members.filter((m) => m.member_id === auth.userId).length > 0
      );
      setPending(false);
      setErrors([]);
    } catch (e) {
      console.log(e);
      setPending(false);
      setErrors(e.response.data.errorList);
    }
  };

  return (
    <TournamentCardContainer>
      <TournamentCardImage
        alt="Tournament Cover Image"
        src="/assets/images/celebration.jpg"
      />
      <FlexContainer
        direction="col"
        align="space-between"
        gap="1rem"
        pad="1rem"
        style={{
          position: "relative",
          transform: "translate(0, -100%)",
        }}
      >
        <FlexContainer direction="col">
          <NormalText> {tourney.game} </NormalText>
          <BoldText> Tournament </BoldText>
        </FlexContainer>

        <FlexContainer justify="space-between">
          <FlexContainer direction="col">
            <NormalText> Players </NormalText>
            <BoldText> {tourney.max_players} Players </BoldText>
          </FlexContainer>

          <FlexContainer direction="col">
            <NormalText> Regions </NormalText>
            <BoldText> Nepal </BoldText>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="col">
          <NormalText> Modes </NormalText>
          <BoldText> Solo </BoldText>
        </FlexContainer>

        <FlexContainer direction="col">
          <ErrorListBox />
          {errors.map((e) => (
            <ErrorContainer key={e}>
              <Text fontSize="0.5rem" color="white">
                {e}
              </Text>
            </ErrorContainer>
          ))}
          <ErrorListBox />
        </FlexContainer>

        <FlexContainer justify="center" w="100%">
          <Button
            w="100%"
            disabled={isRegistered}
            onClick={onRegisterHandler}
          >
            {isPending
              ? "Registering... "
              : isRegistered
              ? "Already Registered"
              : "Register Now"}
          </Button>
        </FlexContainer>
      </FlexContainer>
    </TournamentCardContainer>
  );
}
