import styled from "styled-components";
import tw from "twin.macro";

import { useGetUserQuery } from '../../../../redux/UserApi';

import { Text, NormalText, BoldText } from "../../../../components/Text";
import { FlexContainer, WrapContainer } from "../../../../components/base";
import Button from "../../../../components/Button";

import { toast } from 'react-toastify';


const Container = styled.div`
${tw`
relative
w-full
h-48
rounded-md
overflow-hidden
shadow-2xl
`}
`;


const AvatarImage = styled.img`
${tw`
object-cover
w-16
h-16
md:w-20
md:h-20
rounded-full
border-2
border-red-700
shadow-2xl
`}
`;

const BackgroundCover = styled.div`
${tw`
relative
`}
`;

export default function MatchShowCard({ match, userId, tourney }){
  const participant = tourney.participants.find((p) => p.participant_id === userId);
  const userTourneyParticipant = tourney.tourney_data.participant.find((p) => p.name === participant.name);

  const opponent1Player = tourney.tourney_data.participant.find((p) => p.id === match.opponent1.id);
  const opponent2Player = tourney.tourney_data.participant.find((p) => p.id === match.opponent2.id);
  let userOpponent = opponent1Player.name === userTourneyParticipant.name ? opponent2Player : opponent1Player;
  let userMatchPlayer = opponent1Player.name === userTourneyParticipant.name ? opponent1Player : opponent2Player;

  let userScore = match.status === 4 && match.opponent1.id === userOpponent.id && match.opponent2.score;
  let opponentScore = match.status === 4 && match.opponent1.id === userOpponent.id && match.opponent1.score;

  const opponentUserId = tourney.participants.find((p) => p.name === userOpponent.name).participant_id;

  const { data: meUserData } = useGetUserQuery(userId);
  const { data: opponentUserData } = useGetUserQuery(opponentUserId);

  return (
    <Container>
      <BackgroundCover>
	<div className='absolute inset-0 bg-gray-900 bg-opacity-75 h-full'></div>
	<img alt="" src="/assets/images/celebration.jpg" className='object-cover h-80'/>
      </BackgroundCover>

      <FlexContainer className="absolute bottom-0 top-0 left-0 right-0" w='100%' h='100%' direction='col' justify='center' align='center' gap='0.4rem'>
        <FlexContainer w='100%' justify='center' align='center' className='gap-1 md:gap-8'>
	  <FlexContainer direction='col' justify='center' align='center' className='w-24 md:w-32 gap-1'>
            <AvatarImage src={meUserData?.profile_link}/>
	    <Text className='text-xs md:text-lg font-semibold'> { meUserData?.gaming_name }</Text>
          </FlexContainer>

	  <FlexContainer direction='col' justify='center' align='center' className='gap-1'>
	    <Text className='text-base md:text-3xl font-bold'> Round { match?.round_id + 1} </Text>
	    <FlexContainer align='center' className='gap-2 md:gap-16'>
	      <Text className='text-4xl font-bold'> { userScore || 0 } </Text>
	      <Text className='text-base md:text-xl font-bold'> - VS - </Text>
	      <Text className='text-4xl font-bold'> { opponentScore || 0 } </Text>
            </FlexContainer>
            <MatchStatus status={match.status}/>
          </FlexContainer>

	  <FlexContainer direction='col' justify='center' align='center' className='w-24 md:w-32 gap-1'>
            <AvatarImage src={opponentUserData?.profile_link}/>
            <Text className='text-xs md:text-lg font-semibold'> { opponentUserData?.gaming_name }</Text>
          </FlexContainer>
        </FlexContainer>        
        <Button onClick={() => {
          toast.info("Match will start soon!");
        }}> { match?.status !== 4 ? "Start Match" : "Report"} </Button>
      </FlexContainer>
    </Container>
  );

}


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
