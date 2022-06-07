import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";

import { FlexContainer } from "../../../../components/base";
import { NormalText, BoldText, Text } from "../../../../components/Text";
import Button from "../../../../components/Button";

import axios from "axios";
import { toast } from 'react-toastify';

import { updateTourney, pending, error } from "../../../../redux/TourneySlice";
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
  const { isPending } = useSelector(state => state.tourney);

  const [isRegistered, setRegistered] = useState(
    tourney.registrations.filter((m) => m.registrant_id === auth.userId).length > 0
  );

  const onRegisterHandler = async (e) => {
    e.preventDefault();
    dispatch(pending());
    
    const toastId = toast.loading("Registering");

    const options = {
      method: "POST",
      url: `${config.serverUrl}/api/v1/tourneys/${tourney.id}/register`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.accessToken,
      },
    };

    try {
      const response = await axios.request(options);
      setRegistered(
        response.data.updatedTourney.registrations.filter((m) => m.registrant_id === auth.userId).length > 0
      );
      dispatch(updateTourney(response.data.updatedTourney));
      toast.update(toastId, {
        render: "Registered Successfully",
        type: "Success",
        isLoading: false,
        autoClose: 3000
      });
    } catch (e) {
      console.log(e);
      toast.update(toastId, {
        render: e.response ? e.response.data.errorList[0] : e.message,
        type: 'error',
        isLoading: false,
        autoclose: 3000
      });
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
