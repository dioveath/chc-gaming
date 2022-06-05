import styled from "styled-components";
import tw from "twin.macro";

import { useParams } from "react-router-dom";
import {
  useGetTourneyQuery
} from '../../../redux/TourneyApi';

import { NormalText, BoldText, Text } from "../../../components/Text";
import { FlexContainer, WrapContainer } from "../../../components/base";
import Button, { IconButton } from "../../../components/Button";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FcTreeStructure } from 'react-icons/fc';
import { MdAdd } from 'react-icons/md';

const Container = styled.div`
  ${tw`
w-full
`}
`;

const StructCardContainer = styled.div`
${tw`
max-w-xs
w-full
h-48
flex
flex-col
justify-center
items-center
gap-1
rounded-md
shadow-2xl
p-6
bg-black
`}
`;

export default function Structure() {
  const { tourneyId } = useParams();
  const { data: tourney, error } = useGetTourneyQuery(tourneyId);    

  return (
    <Container>
      <WrapContainer w="100%" justify="space-between" align="center">
        <Text fontSize="2rem" fontWeight="700">
          Structure
        </Text>
      </WrapContainer>

      <WrapContainer gap='2rem'>
	<StructCardContainer>
          <FcTreeStructure size={50}/>
          <BoldText> 1. Playoffs </BoldText>
	  <NormalText> Single Elimination </NormalText>

	  <IconButton w={'100%'}
            icon={<BiDotsVerticalRounded size='24' color='white'/>}> Configure </IconButton>
        </StructCardContainer>

	<StructCardContainer>
          <MdAdd size={50} color='white'/>

	  <IconButton w={'100%'}
            icon={<BiDotsVerticalRounded size='24' color='white'/>}> Create New Stage </IconButton>
        </StructCardContainer>        
      </WrapContainer>
    </Container>
  );
}
