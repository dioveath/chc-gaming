import styled from 'styled-components';
import tw from 'twin.macro';

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
import { MdAdd } from 'react-icons/md';
import { BiShuffle, BiDotsVerticalRounded } from 'react-icons/bi';

const Container = styled.div`
${tw``}
`;

const Table = styled.table`
  border-collapse: collapse;
  box-shadow: 0 5px 10px black;
  background-color: black;
  text-align: left;
  overflow: hidden;
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
  &:nth-child(even) {
    background-color: #f40b41;
    color: white;
  }
`;


const MatchContainer = styled(FlexContainer)`
${tw`
max-w-sm
w-full
p-2
flex-col
justify-start
rounded-md
border-2
border-red-800
`}
`;

const RoundContainer = styled(FlexContainer)`
${tw`
flex-col
items-center
`}
`;


export default function Placements(){
  const { tourneyId } = useParams();
  const { data: tourney, error } = useGetTourneyQuery(tourneyId);    

  return (
    <Container>
      <FlexContainer justify='space-between'>
	<Text fontSize='2rem'
              fontWeight='700'> Placements </Text>
      </FlexContainer>
      
      <FlexContainer direction='col' w='100%'>
	<FlexContainer justify='space-between'
                       align='center'
                       w='100%'>
	  <Text fontSize='1.5rem' fontWeight='700'> Seeding </Text>
	  <FlexContainer align='center' gap='1rem'>
	    <IconButton icon={<MdAdd size={20} color='green'/>} pad='0.5rem'> Add </IconButton>
	    <IconButton icon={<BiShuffle size={20} color='royalblue'/>} pad='0.5rem'/> 
	    <IconButton icon={<BiDotsVerticalRounded size={20} color='royalblue'/>} pad='0.5rem'/>
          </FlexContainer>
        </FlexContainer>

	<Table>
	  <thead>
	    <TRow>
            <THead> # </THead>
            <THead> Name </THead>
            </TRow>
          </thead>
	  <tbody>
	    <TRow>
	      <TData> 1 </TData>
	      <TData> dioveath </TData>              
            </TRow>
	    <TRow>
	      <TData> 2 </TData>
	      <TData> icerush </TData>              
            </TRow>
	    <TRow>
	      <TData> 3 </TData>
	      <TData> uJackal5 </TData>              
            </TRow>
	    <TRow>
	      <TData> 4 </TData>
	      <TData> neo </TData>              
            </TRow>
	    <TRow>
	      <TData> 5 </TData>
	      <TData> nungkha </TData>              
            </TRow>
	    <TRow>
	      <TData> 5 </TData>
	      <TData> prison </TData>              
            </TRow>                                             
          </tbody>
        </Table>
        
      </FlexContainer>

      <FlexContainer direction='col'>
	<Text fontSize="1.2rem" fontWeight="700"> Single Elimination Tree </Text>
	<FlexContainer>
	  <RoundContainer>
	    <Button disabled={true}> Round 1 </Button>
	    <MatchContainer>
	      <IconButton icon={MdAdd}>#1</IconButton>
	      <IconButton icon={MdAdd}>#2</IconButton>              
            </MatchContainer>
	    <MatchContainer>
	      <IconButton icon={MdAdd}>#1</IconButton>
	      <IconButton icon={MdAdd}>#2</IconButton>              
            </MatchContainer>
	    <MatchContainer>
	      <IconButton icon={MdAdd}>#1</IconButton>
	      <IconButton icon={MdAdd}>#2</IconButton>              
            </MatchContainer>                        
          </RoundContainer>

	  <RoundContainer>
	    <Button disabled={true}> Round 2 </Button>
	    <MatchContainer>
	      <IconButton icon={MdAdd}>#1</IconButton>
	      <IconButton icon={MdAdd}>#2</IconButton>              
            </MatchContainer>
	    <MatchContainer>
	      <IconButton icon={MdAdd}>#1</IconButton>
	      <IconButton icon={MdAdd}>#2</IconButton>              
            </MatchContainer>
	    <MatchContainer>
	      <IconButton icon={MdAdd}>#1</IconButton>
	      <IconButton icon={MdAdd}>#2</IconButton>              
            </MatchContainer>                        
          </RoundContainer>

	  <RoundContainer>
	    <Button disabled={true}> Round 2 </Button>
	    <MatchContainer>
	      <IconButton icon={MdAdd}>#1</IconButton>
	      <IconButton icon={MdAdd}>#2</IconButton>              
            </MatchContainer>
	    <MatchContainer>
	      <IconButton icon={MdAdd}>#1</IconButton>
	      <IconButton icon={MdAdd}>#2</IconButton>              
            </MatchContainer>
	    <MatchContainer>
	      <IconButton icon={MdAdd}>#1</IconButton>
	      <IconButton icon={MdAdd}>#2</IconButton>              
            </MatchContainer>                        
          </RoundContainer>                    
        </FlexContainer>
      </FlexContainer>

    </Container>
  );
}
