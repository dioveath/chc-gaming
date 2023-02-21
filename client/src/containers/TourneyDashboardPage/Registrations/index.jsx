import { useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";

import { useParams } from "react-router-dom";
import {
  useGetTourneyQuery,
  useUpdateTourneyMutation,
} from "../../../redux/TourneyApi";

import { NormalText, BoldText, Text } from "../../../components/Text";
import { FlexContainer, WrapContainer } from "../../../components/base";
import Button, { IconButton } from "../../../components/Button";
import { Marginer } from "../../../components/Marginer";

import { RiRefreshLine, RiFilter3Fill } from "react-icons/ri";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { BsCashStack } from "react-icons/bs";

import { toast } from "react-toastify";

const Container = styled.div`
  ${tw`
w-full
flex
flex-col
gap-6
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
  table-layout: fixed;

  border-radius: 5px;
  color: white;
  overflow: hidden;
`;

const THead = styled.th`
  padding: 1rem 2rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-size: 1rem;
  font-weight: 800;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TData = styled.td`
  padding: 0.7rem 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TRow = styled.tr`
  &:nth-child(even) {
    ${tw`bg-red-800/40`}
    color: white;
  }
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
    <div className={`${bgColor} p-2 rounded-md`}>
      <p className="uppercase text-center">{status}</p>
    </div>
  );
};

export default function Participants() {
  const { tourneyId } = useParams();
  const { data: tourney, error } = useGetTourneyQuery(tourneyId);
  const [updateTourney] = useUpdateTourneyMutation();

  const totalRegistered = tourney.registrations.length;
  const totalPending = tourney.registrations.filter(
    (m) => m.status === "pending"
  ).length;
  const totalAccepted = tourney.registrations.filter(
    (m) => m.status === "accepted"
  ).length;
  const totalRejected = tourney.registrations.filter(
    (m) => m.status === "rejected"
  ).length;
  const totalCancelled = tourney.registrations.filter(
    (m) => m.status === "cancelled"
  ).length;

  console.log(tourney);

  return (
    <Container>
      <WrapContainer w="100%" justify="space-between" align="center">
        <Text fontSize="2rem" fontWeight="700">
          Registrations
        </Text>
        <Button to="" type="outlined">
          Public Registration Page
        </Button>
      </WrapContainer>

      <RegStatsContainer>
        <CounterCardContainer direction="col">
          <CountText> {totalRegistered}</CountText>
          <Text fontSize="1.2rem" fontWeight="700">
            Total
          </Text>
        </CounterCardContainer>
        <CounterCardContainer direction="col">
          <CountText> {totalPending}</CountText>
          <Text fontSize="1.2rem" fontWeight="700">
            Pending
          </Text>
        </CounterCardContainer>
        <CounterCardContainer direction="col">
          <CountText> {totalRejected}</CountText>
          <Text fontSize="1.2rem" fontWeight="700">
            Rejected
          </Text>
        </CounterCardContainer>
        <CounterCardContainer direction="col">
          <CountText> {totalAccepted} </CountText>
          <Text fontSize="1.2rem" fontWeight="700">
            Accepted
          </Text>
        </CounterCardContainer>
        <CounterCardContainer direction="col">
          <CountText> {totalCancelled} </CountText>
          <Text fontSize="1.2rem" fontWeight="700">
            Cancelled
          </Text>
        </CounterCardContainer>
      </RegStatsContainer>

      <FlexContainer justify="space-between">
        <FlexContainer direction="col">
          <Text fontSize="1.5rem" fontWeight="700">
            List of Registrations
          </Text>
          <NormalText> Last Update </NormalText>
          <NormalText> {tourney.updatedAt.substring(0, 10)} </NormalText>
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
            <THead> Entry Fee </THead>
            <THead> Actions </THead>
          </TRow>
        </thead>
        <tbody>
          {!error &&
            tourney.registrations.map((m, index) => {
              return (
                <TRow key={m.registrant_id}>
                  <TData>
                    {" "}
                    <StatusBadge status={m.status} />{" "}
                  </TData>
                  <TData> {m.registrant_id} </TData>
                  <TData> {m.registration_id} </TData>
                  <TData> {m.registered_date.substring(0, 10)} </TData>
                  <TData>
                    {m.fee_paid ? (
                      <Text className="text-green-500 font-semibold">PAID</Text>
                    ) : (
                      <Text className="text-yellow-500 font-semibold">
                        NOT PAID
                      </Text>
                    )}
                  </TData>
                  <TData>
                    <FlexContainer gap="0.4rem">
                      <IconButton
                        onClick={() => {
                          if (!m.fee_paid) {
                            toast.error(
                              "Player has not paid the registration fee!"
                            );
                            return;
                          }

                          if (m.status === "accepted") {
                            toast.error("Player has already been accepted!");
                            return;
                          }

                          let allRegistrations = [...tourney.registrations];
                          let allParticipants = [...tourney.participants];
                          let updatedMember = { ...m };
                          allRegistrations.splice(index, 1);

                          updatedMember.status = "accepted";

                          allRegistrations.push(updatedMember);
                          allParticipants.push({
                            participant_id: m.registrant_id,
                            registration_id: m.registration_id,
                            name: m.name,
                            status: "ready",
                            created_at: new Date(),
                            type: m.type,
                          });

                          toast.promise(
                            updateTourney({
                              id: tourneyId,
                              registrations: allRegistrations,
                              participants: allParticipants,
                            }).unwrap(),
                            {
                              pending: "Approving player registration...",
                              success: "Approved!",
                              error: "Couldnt approve!",
                            }
                          );
                        }}
                        pad={"0.4rem"}
                        icon={<AiOutlineFileDone size="20" color="green" />}
                      ></IconButton>
                      <IconButton
                        pad={"0.4rem"}
                        icon={<BsCashStack size="20" color="yellow" />}
                        onClick={() => {
                          if (m.fee_paid) {
                            toast.error(
                              "Player has already paid the registration fee!"
                            );
                            return;
                          }

                          if (m.status === "accepted") {
                            toast.error("Player has already been accepted!");
                            return;
                          }

                          let allRegistrations = [...tourney.registrations];
                          let updatedMember = { ...m };
                          allRegistrations.splice(index, 1);

                          updatedMember.fee_paid = true;
                          allRegistrations.push(updatedMember);

                          toast.promise(
                            updateTourney({
                              id: tourneyId,
                              registrations: allRegistrations,
                            }).unwrap(),
                            {
                              pending: "Paying registration fee...",
                              success: "Paid registration fee!",
                              error: "Couldnt pay registration fee!",
                            }
                          );
                        }}
                      ></IconButton>

                      <IconButton
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

      <Marginer vertical="10rem" />
    </Container>
  );
}
