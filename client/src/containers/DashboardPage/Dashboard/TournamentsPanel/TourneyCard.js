import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";

import { FlexContainer } from "../../../../components/base";
import { NormalText, BoldText, Text } from "../../../../components/Text";
import Button from "../../../../components/Button";

import { toast } from "react-toastify";

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

const StatusBadge = ({ status }) => {
  let bgColor = "bg-blue-500";

  switch (status) {
    case "accepted":
      bgColor = "bg-green-500";
      break;
    case "rejected":
      bgColor = "bg-red-500";
      break;
    case "cancelled":
      bgColor = "bg-yellow-500";
      break;
  }

  return (
    <div className={`${bgColor} p-1 px-2 rounded-md`}>
      <BoldText className="uppercase text-center">{status}</BoldText>
    </div>
  );
};

export default function TournamentCard({ tourney }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [isRegistered, setRegistered] = useState(
    tourney.registrations.filter((m) => m.registrant_id === auth.userId)
      .length > 0
  );

  const registerData = tourney.registrations.find((m) => m.registrant_id === auth.userId);

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
            <NormalText> Location </NormalText>
            <BoldText>  { tourney.location} </BoldText>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer justify="space-between">
          <FlexContainer direction="col">
            <NormalText> Modes </NormalText>
            <BoldText> Solo </BoldText>
          </FlexContainer>

          <FlexContainer direction="col">
            <NormalText> Status </NormalText>
            <StatusBadge status={registerData?.status}/>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer justify="center" w="100%">
          <Button
            w="100%"
            onClick={() => {
              console.log("fsafdisanvaosievnasei");
              toast.info("Feature not available yet!");
            }}
          >
            View Tourney
          </Button>
        </FlexContainer>
      </FlexContainer>
    </TournamentCardContainer>
  );
}
