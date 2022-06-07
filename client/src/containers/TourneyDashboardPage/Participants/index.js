import { useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";

import { useParams } from "react-router-dom";
import {
  useGetTourneyQuery
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

const totalRegistered = tourney.participants.length;
  const totalPending = tourney.participants.filter(
    (m) => m.status === "pending"
  ).length;

  const totalRejected = tourney.participants.filter(
    (m) => m.status === "rejected"
  ).length;
  const totalCancelled = tourney.participants.filter(
    (m) => m.status === "cancelled"
  ).length;

  const allAccepted = tourney.participants.filter(
    (m) => m.status === "accepted"
  );
  const totalAccepted = allAccepted.length;
  
  
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
          <CountText> { totalPending }</CountText>
          <Text fontSize="1.2rem" fontWeight="700">
            Pending
          </Text>
        </CounterCardContainer>
        <CounterCardContainer direction="col">
          <CountText> { totalRejected }</CountText>
          <Text fontSize="1.2rem" fontWeight="700">
            Rejected
          </Text>
        </CounterCardContainer>
        <CounterCardContainer direction="col">
          <CountText>{ totalAccepted }</CountText>
          <Text fontSize="1.2rem" fontWeight="700">
            Accepted
          </Text>
        </CounterCardContainer>
        <CounterCardContainer direction="col">
          <CountText> { totalCancelled } </CountText>
          <Text fontSize="1.2rem" fontWeight="700">
            Cancelled
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
            <THead> Player ID </THead>
            <THead> Reg ID </THead>
            <THead> Registered Date </THead>
            <THead> Actions </THead>
          </TRow>
        </thead>
        <tbody>
          {!error && allAccepted.map((m) => {
            return (
              <TRow>
                <TData> { m.status } </TData>
                <TData> { m.member_id } </TData>
                <TData> { m.reg_id} </TData>
                <TData> { m.registered_date.substring(0, 10) } </TData>
                <TData>
                  <FlexContainer gap="0.4rem">
                    <IconButton
                      pad={"0.4rem"}
                      icon={<AiOutlineFileDone size="20" color="green" />}
                    ></IconButton>
                    <IconButton
                      onClick={() => {
                        toast.info("Will disqualify");
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
