import styled from "styled-components";
import tw from "twin.macro";

import { Text, NormalText, BoldText } from "../../../../components/Text";
import { FlexContainer, WrapContainer } from "../../../../components/base";
import Button from "../../../../components/Button";

import { toast } from 'react-toastify';

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

const MatchStatus = ({ status }) => {
  let bgColor = 'bg-blue-500';
  let statusName = 'Waiting';
  switch(status) {
  case 2:
    bgColor = 'bg-green-500'
    statusName = 'Ready';
    break;
  case 3:
    bgColor = 'bg-pink-500'
    statusName = 'Running';    
    break;
  case 4:
    bgColor = 'bg-yellow-500'
    statusName = 'Completed';
    break;
  case 5:
    bgColor = 'bg-indigo-500'
    statusName = 'Archived';    
    break;
  }

  return (
    <Text className={`px-2 py-1 rounded-md uppercase font-semibold ${bgColor}`}> { statusName} </Text>
  )
};

const MatchCard = ({ match, userId, tourney}) => {
  const participant = tourney.participants.find((p) => p.participant_id === userId);
  const userParticipant = tourney.tourney_data.participant.find((p) => p.name === participant.name);
  const opponent1Player = tourney.tourney_data.participant.find((p) => p.id === match.opponent1.id);
  const opponent2Player = tourney.tourney_data.participant.find((p) => p.id === match.opponent2.id);

  let userOpponent = opponent1Player.name === userParticipant.name ? opponent2Player : opponent1Player;
   
  return (
        <MatchCardContainer>
          <TournamentCardImage
            alt="Tournament Cover Image"
            src="/assets/images/celebration.jpg"
          />
          <MatchDetailsContainer>
            <FlexContainer direction="col">
              <NormalText> { tourney.game } </NormalText>
              <BoldText> Tournament </BoldText>
            </FlexContainer>

            <FlexContainer justify="space-between">
              <FlexContainer direction="col">
                <NormalText> Round </NormalText>
                <BoldText> { match.round_id + 1 } </BoldText>
              </FlexContainer>

              <FlexContainer direction="col">
                <NormalText> Location </NormalText>
                <BoldText> { tourney.location } </BoldText>
              </FlexContainer>
            </FlexContainer>

	    <FlexContainer justify='space-between'>
              <FlexContainer direction="col">
              <NormalText> Opponent </NormalText>
              <BoldText> { userOpponent.name } </BoldText>
              </FlexContainer>
              <FlexContainer direction="col">
              <NormalText> Status </NormalText>
                <MatchStatus status={match.status}/>
              </FlexContainer>
            </FlexContainer>    

            <FlexContainer justify="center" w="100%">
              <Button w="100%" disabled={true} onClick={() => {
                toast.info("Match will start now!");
              }}>
                Start Now
              </Button>
            </FlexContainer>
          </MatchDetailsContainer>
        </MatchCardContainer>    
  );
};


export default MatchCard;
