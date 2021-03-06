import { useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";

import { useParams } from "react-router-dom";
import {
  useGetTourneyQuery,
  useUpdateTourneyMutation,  
} from '../../../redux/TourneyApi';


import {
  NormalText,
  BoldText,
  Text
} from '../../../components/Text';

import {
  FlexContainer,
  WrapContainer
} from '../../../components/base';

import Button, { IconButton } from '../../../components/Button';
import { RiRefreshLine, RiFilter3Fill } from "react-icons/ri";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

import { toast } from 'react-toastify';

const Container = styled.div`
${tw`
`}
`;

const CountText = styled(Text)`
  ${tw`
font-bold
text-5xl
`}
`;

const CounterCardContainer = styled(FlexContainer)`
  ${tw`
max-w-[6rem]
w-full
flex
flex-col
justify-center
items-center
`}
`;

const RegStatsContainer = styled(WrapContainer)`
  background-color: black;
  ${tw`
bg-black
p-6
gap-6
flex
justify-between
rounded-md
shadow-md
`}
`;

const Table = styled.table`
  border-collapse: collapse;
  box-shadow: 0 5px 10px black;
  background-color: black;
  text-align: left;

  border-radius: 5px;
  color: white;
`;

const THead = styled.th`
  padding: 1rem 2rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-size: 1rem;
  font-weight: 800;
`;

const TData = styled.td`
  padding: 0.7rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
`;

const TRow = styled.tr`
  &:nth-child(event) {
    background-color: #f40b41;
    color: white;
  }
`;

export default function Participants(){
  const { tourneyId } = useParams();
  const { data: tourney, error } = useGetTourneyQuery(tourneyId);
  const [updateTourney] = useUpdateTourneyMutation();  

  const totalRegistered = tourney.participants.length;

  const totalReady = tourney.participants.filter(
    (m) => m.status === "ready"
  ).length;

  const totalCheckedin = tourney.participants.filter(
    (m) => m.status === "checkedin"
  ).length;
  const totalPlaying = tourney.participants.filter(
    (m) => m.status === "playing"
  ).length;

  const totalForfeit = tourney.participants.filter(
    (m) => m.status === "forfeit"
  ).length;

  const onDisqualify = () => {
    
  };

  
  return (
    <Container>
      <FlexContainer justify='space-between'>
	<Text fontSize='2rem'
              fontWeight='700'> Participants </Text>
      </FlexContainer>

      <RegStatsContainer>
        <CounterCardContainer direction="col">
          <CountText> { totalRegistered }</CountText>
          <Text fontSize="1.2rem" fontWeight="700">
            Total
          </Text>
        </CounterCardContainer>
        <CounterCardContainer direction="col">
          <CountText> { totalReady }</CountText>
          <Text fontSize="1.2rem" fontWeight="700">
            Ready
          </Text>
        </CounterCardContainer>
        <CounterCardContainer direction="col">
          <CountText> { totalCheckedin }</CountText>
          <Text fontSize="1.2rem" fontWeight="700">
            Checkedin
          </Text>
        </CounterCardContainer>
        <CounterCardContainer direction="col">
          <CountText>{ totalForfeit }</CountText>
          <Text fontSize="1.2rem" fontWeight="700">
            Forfeit
          </Text>
        </CounterCardContainer>
        <CounterCardContainer direction="col">
          <CountText> { totalPlaying } </CountText>
          <Text fontSize="1.2rem" fontWeight="700">
            Playing
          </Text>
        </CounterCardContainer>
      </RegStatsContainer>

      <FlexContainer justify="space-between">
        <FlexContainer direction="col">
          <Text fontSize="1.5rem" fontWeight="700">
            List of Participants
          </Text>
          <NormalText> Last Update </NormalText>
          <NormalText> 5/22/2022 </NormalText>
        </FlexContainer>

        <FlexContainer gap="1rem">
          <IconButton icon={<RiRefreshLine size="20" color="white" />}>
            Refresh
          </IconButton>
          <IconButton icon={<RiFilter3Fill size="20" color="white" />}>
            Show filters
          </IconButton>
        </FlexContainer>
      </FlexContainer>

      <Table>
        <thead>
          <TRow>
            <THead> Status </THead>
            <THead> Player Name </THead>
            <THead> Reg ID </THead>
            <THead> Registered Date </THead>
            <THead> Actions </THead>
          </TRow>
        </thead>
        <tbody>
          {!error && tourney.participants.map((p, index) => {
            return (
              <TRow key={p.registration_id}>
                <TData> { p.status } </TData>
                <TData> { p.name } </TData>
                <TData> { p.registration_id} </TData>
                <TData> { p.created_at.substring(0, 10) } </TData>
                <TData>
                  <FlexContainer gap="0.4rem">
                    <IconButton
                      onClick={() => {
                        let allParticipants = [...tourney.participants];
                        let updateParticipant = { ...p }

                        allParticipants.splice(index, 1);
                        updateParticipant.status = 'ready';

                        allParticipants.push(updateParticipant);

                        toast.promise(
                          updateTourney({
                            id: tourneyId,
                            participants: allParticipants
                          }).unwrap(),
                          {
                            pending: "Accepting....",
                            success: "Accepted Successfully",
                            erorr: "Couldn't accept.."
                          }
                        );                        
                      }}
                      pad={"0.4rem"}
                      
                      
                      icon={<AiOutlineFileDone size="20" color="green" />}
                    ></IconButton>
                    <IconButton
                      onClick={() => {
                        let allParticipants = [...tourney.participants];
                        let updateParticipant = { ...p }

                        allParticipants.splice(index, 1);
                        updateParticipant.status = 'disqualified';

                        allParticipants.push(updateParticipant);

                        toast.promise(
                          updateTourney({
                            id: tourneyId,
                            participants: allParticipants
                          }).unwrap(),
                          {
                            pending: "Disqualifying....",
                            success: "Disqualified Successfully",
                            erorr: "Couldn't disqualify.."
                          }
                        );

                      }}
                      pad={"0.4rem"}
                      icon={<MdOutlineCancel size="20" color="red" />}
                    ></IconButton>
                  </FlexContainer>
                </TData>
              </TRow>
            );
          })}
        </tbody>
      </Table>      
    </Container>
  );

} 
