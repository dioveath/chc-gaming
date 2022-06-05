import styled from 'styled-components';
import tw from 'twin.macro';

import { useParams } from "react-router-dom";
import {
  useGetTourneyQuery
} from '../../../redux/TourneyApi';

import {
  Text
} from '../../../components/Text';

import {
  FlexContainer 
} from '../../../components/base';

import {
  Marginer 
} from '../../../components/Marginer';

import Button from '../../../components/Button';
import ListTileImage from '../../../components/Tourneys/MediaListTile';

import {
  Input,
  TextArea,
  UnorderedList,
  ListItem
} from '../../../components/Form';

const Container = styled.div`
${tw`
w-full
`}
`;

export default function Settings(){
  const { tourneyId } = useParams();
  const { data: tourney, error } = useGetTourneyQuery(tourneyId);    

  console.log(tourney);

  return (
    <Container>
      <Text className="font-bold text-3xl mt-4"> Settings </Text>

      <Text className='font-bold text-2xl mt-8'> { tourney.title } </Text>
      <Text className='font-bold text-xl mt-4'> Description </Text>
      <TextArea defaultValue={tourney.description}></TextArea>
      
      <Text className='font-bold text-xl'> Medias / Promotion </Text>
      <Text fontSize="0.7rem">
        Share photos or a video of/for the tournament. Medias can't exceed 10 photos & 1 video
      </Text>

      <FlexContainer direction="col" align="space-between">
        <ListTileImage />
      </FlexContainer>

      <FlexContainer gap="1rem">
        <Button text="Add Photo" />
        <Button text="Add Video" />
      </FlexContainer>

      <Text fontSize="0.7rem">
        Live link, if it will be broadcasted online
      </Text>
      <Input type='text' placeholder='Live link'></Input>      

      <Text className='font-bold text-xl'> Prizes </Text>      
      <Text fontSize="0.7rem">
        Add Prizes here, for winner, runner-ups, or custom achievements like best goal, most goal, etc.
      </Text>      

      <FlexContainer gap='1rem'>
        <Input type='text' placeholder='Prize Title'></Input>
        <Input type='number' placeholder='Prize Value - usually Rs.'></Input>
      </FlexContainer>
      <TextArea placeholder='Small Description of the prize - How it can be achieved, etc.'></TextArea>
      <Button> Add Prize </Button>

      <Text className='font-bold text-xl'> Sponsers / Supporters </Text>
      <FlexContainer gap='1rem'>
        <Input type='text' placeholder='Sponser Name'></Input>
        <Input type='text' placeholder='Sponser Value - In numbers to prioritize'></Input>
      </FlexContainer>
      <Input type='text' placeholder='Sponser Website (optional) if any'></Input>
      <Button> Add Sponser </Button>

      <Text className='font-bold text-xl'> Managers </Text>
      <Text fontSize="0.7rem">
        Add managers so they can manage this tournamnet too
      </Text>
      <UnorderedList>
	<ListItem> <Text className='text-sm'> Saroj Rai </Text> </ListItem>
	<ListItem> <Text className='text-sm'> Ajaya RajBhandari </Text> </ListItem>        
      </UnorderedList>

      <Input type="text" placeholder='Search...'></Input>
      <Button> Add Manager</Button>

      <Text className='font-bold text-xl'> Location </Text>
      <Text fontSize="0.7rem">
        Specify where you tournaments will held
      </Text>      
      <Input type="text" placeholder='Location - eg. Charicha Tower, Online, etc.'></Input>
      <Button> Update Location </Button>

      <Text className='font-bold text-xl'> Start Date </Text>
      <Text fontSize="0.7rem">
        When will the tournament start
      </Text>

      <FlexContainer gap='1rem' justify='space-between'>
	<Text> Registraion End Date </Text>
	<Text> Tournament Start Date </Text>
	<Text> Tournament End Date </Text>                
      </FlexContainer>      

      <FlexContainer gap='1rem'>
        <Input type="date" placeholder="Registration end Date"/>      
        <Input type="date" placeholder="Tournament Start Date"/>
        <Input type="date" placeholder="Tournament End Date"/>          
      </FlexContainer>
    
      <Button> Update Dates </Button>      
      
      <Marginer vertical='10rem'/>
    </Container>
  )
}
