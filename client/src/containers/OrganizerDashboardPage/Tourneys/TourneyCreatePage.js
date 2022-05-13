import styled from 'styled-components';
import tw from 'twin.macro';

import {
  Text,
  BoldText,
} from '../../../components/Text';

import {
  Input
} from '../../../components/AccountBox/FormElements.js';

import {
  FlexContainer
} from '../../../components/base';

import { Marginer } from '../../../components/Marginer';

import Button from '../../../components/Button';
import ListTileImage from './MediaListTile.js';


const Container = styled.div`
${tw`
max-w-lg
w-full
`}
`;

const TextArea = styled.textarea`
color: #fff;
background-color: #220303;

width: 100%;
height: 100px;
font-size: 14px;
outline: none;
padding: 10px 10px;
margin: 5px 0px;
border-radius: 5px;
border-bottom: 2px solid transparent;
transition: all 300ms ease-in-out;

&::placeholder { 
color: rgba(255, 255, 255, 0.4);
font-size: 12px;
}

&:not(:last-of-type) { 

}

&:focus { 
outline: none;
border-bottom: 2px solid rgb(183,27,27);
}
`;


const Select = styled.select`
color: #fff;
background-color: #220303;
border-radius: 5px;
border-bottom: 2px solid transparent;
transition: all 300ms ease-in-out;
padding: 10px 10px;

${tw`
outline-none
w-full
`}

&::placeholder { 
color: rgba(255, 255, 255, 0.4);
font-size: 12px;
}

&:not(:last-of-type) { 

}

&:focus { 
outline: none;
border-bottom: 2px solid rgb(183,27,27);
}
`;

const SelectOption = styled.option`
color: #fff;
background-color: #220303;
border-radius: 5px;
border-bottom: 2px solid transparent;
transition: all 300ms ease-in-out;
padding: 10px 10px;
outline: none;

`;

export default function TourneyCreatePage(){
  
  return (
    <Container>

      <BoldText> Title </BoldText>
      <Marginer vertical='0.5rem'/>      
      <Input type='text' placeholder='Charicha FIFA 22 Tournament'></Input>

      <Marginer vertical='1rem'/>      

      <BoldText> Description </BoldText>
      <Marginer vertical='0.5rem'/>      
      <TextArea
        placeholder='Charicha FIFA 22 Tournament is the best tournament to win grand prizes of up to Rs. 50.000. We are sponsored by Charicha itself.'/>

      <BoldText> Game </BoldText>
      <Marginer vertical='0.5rem'/>
      <Select id="" name="">
        <SelectOption> FIFA 22 </SelectOption>
        <SelectOption> PUBG Mobile </SelectOption>        
      </Select>

      <Marginer vertical='1rem'/>

      <BoldText> No. of Players </BoldText>
      <Marginer vertical='0.5rem'/>
      <Select id="" name="">
        <SelectOption> 8 </SelectOption>        
        <SelectOption> 16 </SelectOption>
        <SelectOption> 32 </SelectOption>
        <SelectOption> 64 </SelectOption>
        <SelectOption> 128 </SelectOption>                
      </Select>      

      <Marginer vertical='1rem'/>

      <BoldText> Media </BoldText>
      <Text fontSize='0.7rem'>
        Share photos or a video. Medias can't exceed 10 photos & 1 video
      </Text>

      <FlexContainer direction='col' align='space-between'>
        <ListTileImage/>
      </FlexContainer>

      <FlexContainer gap='1rem'>
        <Button text='Add Photo'/>
        <Button text='Add Video'/>              
      </FlexContainer>

      <BoldText> Venue </BoldText>
      <Input type='Venue' placeholder='Location'></Input>

      <Button text='Create Tourney'/>

    </Container>
  );

}
