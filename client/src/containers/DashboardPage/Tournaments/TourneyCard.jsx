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
  useRegisterVerifyTourneyMutation,
} from "../../../redux/TourneyApi";

import config from '../../../config/config';
import KhaltiCheckout from 'khalti-checkout-web';

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

  const [registerVerifyTourney ] = useRegisterVerifyTourneyMutation();

  const isRegistered =
        tourney.registrations.filter((m) => m.member_id === auth.userId).length > 0;

  const khaltiConfig = {
    "publicKey": config.khaltiPublicKey,
    "productIdentity": tourney.id,
    "productName": tourney.title,
    "productUrl": "https://www.youtube.com/watch?v=hKIGnR4LKdM",
    "eventHandler": {
      async onSuccess(payload) {
        toast.promise(registerVerifyTourney({ tourneyId: tourney.id, payload }).unwrap(),
                      {
                        pending: "Verifying payment...",
                        success: "Payment Verified",
                        error: "Couldn't verify the payment"
                      });
      },
      onError(error) {
        toast.error(error.message);
      },
      onClose(){
        console.log("widget is closing!");
      }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],    
  };

  let checkout = new KhaltiCheckout(khaltiConfig);

  const onRegisterHandler = async (e) => {
    e.preventDefault();


    if (isRegistered)
      checkout.show({amount: tourney.registration_fee});
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
            { isRegistered ? "Pay Reg Fee" : "Register Now" }
          </Button>
        </FlexContainer>
      </FlexContainer>
    </TournamentCardContainer>
  );
}
