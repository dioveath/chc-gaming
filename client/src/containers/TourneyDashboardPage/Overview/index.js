import styled from "styled-components";
import tw from "twin.macro";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";


import {
  useGetTourneyQuery
} from '../../../redux/TourneyApi';

import StatusCard from "./components/StatusCard";

import { Text, NormalText, BoldText } from "../../../components/Text";
import { FlexContainer, WrapContainer } from "../../../components/base";
import Button, { IconButton } from "../../../components/Button";
import { CardContainer } from "./components/StatusCard/Elements";

import { MdAdd } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

const Container = styled.div`
  ${tw`
w-full
`}
`;

const LargeCountText = (props) => (
  <Text fontSize="4rem" fontWeight="800">
    {props.children}
  </Text>
);

const StructureContainer = styled(FlexContainer)`
  ${tw`
w-full
bg-red-900
px-4
py-2
rounded-md
border-2
border-transparent
`}
  ${(props) => props.status === "setup" && tw`bg-blue-700`}
${(props) => props.status === "pending" && tw`bg-purple-700`}
${(props) => props.status === "running" && tw`bg-green-700`}
${(props) => props.status === "complete" && tw`bg-yellow-700`}
`;

const StructureTile = ({ stage, matchType, players, status }) => (
  <StructureContainer justify="space-between" status={status}>
    <FlexContainer direction="col">
      <BoldText> {stage} </BoldText>
      <NormalText> {matchType} </NormalText>
    </FlexContainer>
    <FlexContainer justify="space-between" align="center" gap="1rem">
      <NormalText> {players}/16 Players </NormalText>
      <NormalText> {status} </NormalText>
      <IconButton icon={<BsThreeDotsVertical />} pad="0" />
    </FlexContainer>
  </StructureContainer>
);

export default function OverviewPage() {
  const { tourneyId } = useParams();
  const { data: tourney, error } = useGetTourneyQuery(tourneyId);

  if(error){
    return (
      <Container>
        <Text> Server ERROR | 500 </Text>
	<Text> { console.log(error) }</Text>
      </Container>
    )
  }

  return (
    <Container>
      <BoldText> Overview </BoldText>
      <WrapContainer gap="1rem">
        <StatusCard />
        <CardContainer>
          <FlexContainer justify="space-between"
                         align='center'>
            <BoldText> Participants </BoldText>
            <Button>
              <FlexContainer gap="0.5rem" align="center">
                <MdAdd color="white" size="1rem" /> Add{" "}
              </FlexContainer>
            </Button>
          </FlexContainer>
          <FlexContainer justify="space-between">
            <FlexContainer direction="col" align="center">
              <LargeCountText> { tourney.members.length } </LargeCountText>
              <NormalText> Participants </NormalText>
            </FlexContainer>
            <FlexContainer direction="col" align="center">
              <LargeCountText> 0 </LargeCountText>
              <NormalText> Checked In </NormalText>
            </FlexContainer>
            <FlexContainer direction="col" align="center">
              <LargeCountText> { tourney.max_players } </LargeCountText>
              <NormalText> Tournament Size </NormalText>
            </FlexContainer>
          </FlexContainer>
        </CardContainer>

        <CardContainer>
          <FlexContainer justify="space-between" align="center" gap="2rem">
            <BoldText> Structure </BoldText>
            <IconButton icon={<MdAdd color="white" size="1.5rem" />}>
              Create New Stage
            </IconButton>
          </FlexContainer>

          <FlexContainer direction="col" gap="0.5rem">
            <StructureTile
              stage={"1. Playoffs"}
              matchType={"Single Elimination"}
              players={10}
              status={"complete"}
            />
            <StructureTile
              stage={"2. Knockout"}
              matchType={"Single Elimination"}
              players={16}
              status={"setup"}
            />
          </FlexContainer>
        </CardContainer>

        <CardContainer>
          <FlexContainer justify="space-between" align="center" gap="2rem">
            <BoldText> Registrations </BoldText>
          </FlexContainer>

          <FlexContainer justify="space-between">
            <FlexContainer direction="col" align="center">
              <LargeCountText> 0 </LargeCountText>
              <NormalText> Pending </NormalText>
            </FlexContainer>
            <FlexContainer direction="col" align="center">
              <LargeCountText> 0 </LargeCountText>
              <NormalText> Accepted </NormalText>
            </FlexContainer>
            <FlexContainer direction="col" align="center">
              <LargeCountText> 20 </LargeCountText>
              <NormalText> Refused </NormalText>
            </FlexContainer>
            <FlexContainer direction="col" align="center">
              <LargeCountText> 20 </LargeCountText>
              <NormalText> Cancelled </NormalText>
            </FlexContainer>            
          </FlexContainer>
        </CardContainer>

      </WrapContainer>
    </Container>
  );
}
