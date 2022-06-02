import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";

import { FlexContainer } from "../../../components/base";
import { NormalText, BoldText, Text } from "../../../components/Text";
import Button from "../../../components/Button";

import { toast } from "react-toastify";
import {
  useRegisterTourneyMutation,
  useDeregisterTourneyMutation,
} from "../../../redux/TourneyApi";

// import KhaltiCheckout from 'khalti-checkout-web';

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
  const auth = useSelector((state) => state.auth);
  const [registerTourney, { isLoading: isRegisterPending }] =
    useRegisterTourneyMutation();
  const [deregisterTourney, { isLoading: isDeregisterPending }] =
    useDeregisterTourneyMutation();
  const isRegistered =
        tourney.members.filter((m) => m.member_id === auth.userId).length > 0;

  const onRegisterHandler = async (e) => {
    e.preventDefault();

    if (isRegistered)
      toast.promise(
        deregisterTourney({
          tourneyId: tourney.id,
          userId: auth.userId,
        }).unwrap(),
        {
          pending: `DeRegistering to ${tourney.title}`,
          success: `DeRegistered succesfully in ${tourney.title}`,
          error: `DeRegistration error in ${tourney.title}`,
        }
      );
    else
      toast.promise(
        registerTourney({
          tourneyId: tourney.id,
          userId: auth.userId,
        }).unwrap(),
        {
          pending: `Registering to ${tourney.title}`,
          success: `Registered succesfully in ${tourney.title}`,
          error: `Registration error in ${tourney.title}`,          
        }
      );
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

          <FlexContainer direction="col" align="right">
            <NormalText> Regions </NormalText>
            <BoldText> Nepal </BoldText>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer justify="space-between">
          <FlexContainer direction="col">
            <NormalText> Modes </NormalText>
            <BoldText> Solo </BoldText>
          </FlexContainer>
          <FlexContainer direction="col" align="right">
            <NormalText> Registration Fee </NormalText>
            <BoldText className="text-right">
              Rs. {tourney.registration_fee}
            </BoldText>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer justify="center" w="100%">
          <Button w="100%" onClick={onRegisterHandler}>
            {isRegistered ? "Already Registered" : "Register Now"}
          </Button>
        </FlexContainer>
      </FlexContainer>
    </TournamentCardContainer>
  );
}
