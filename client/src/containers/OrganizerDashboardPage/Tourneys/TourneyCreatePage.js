import { useRef } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useHistory } from 'react-router-dom';

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

import Button, { SubmitButton } from '../../../components/Button';
import ListTileImage from './MediaListTile.js';

import config from '../../../config/config.js';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { pending, error, addTourney, setSelectedTourney } from '../../../redux/TourneySlice.js';


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


const FormContainer = styled.form`
${tw`
w-full
`}
`;


export default function TourneyCreatePage(){
  const title = useRef();
  const description = useRef();
  const game = useRef();
  const maxPlayers = useRef();
  const registrationFee = useRef();
  const venue = useRef();
  const startDate = useRef();
  const endDate = useRef();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(pending());

    try {
      const tourney = {
          title: title.current.value,
          description: description.current.value,
          game: game.current.value,
          max_players: maxPlayers.current.value,
          location: venue.current.value,
          registration_fee: registrationFee.current.value,
          start_date: startDate.current.value,
          end_date: endDate.current.value,
          members: [],
          managers: [auth.userId],
          sponserships: [],
          prizes: [],
          matches: [],
      };
            
      const options = {
        method: 'POST',
        url: `${config.serverUrl}/api/v1/tourneys`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.accessToken
        },
        data: tourney
      };

      const response = await axios.request(options);
      dispatch(addTourney(response.data.newTourney));
      history.push('/organizer/tourneys/' + response.data.newTourney.id);

    } catch (e){
      console.log(e.message);
      dispatch(error(e.response.data.errorList));
    }
  };
  
  return (
    <Container>

      <FormContainer onSubmit={submitHandler}>

      <BoldText> Title </BoldText>
      <Marginer vertical='0.5rem'/>      
      <Input type='text' placeholder='Charicha FIFA 22 Tournament' ref={title}></Input>

      <Marginer vertical='1rem'/>      

      <BoldText> Description </BoldText>
      <Marginer vertical='0.5rem'/>      
      <TextArea
        ref={description}
        placeholder='Charicha FIFA 22 Tournament is the best tournament to win grand prizes of up to Rs. 50.000. We are sponsored by Charicha itself.'/>

      <BoldText> Game </BoldText>
      <Marginer vertical='0.5rem'/>
      <Select id="" name="" ref={game}>
        <SelectOption> FIFA 22 </SelectOption>
        <SelectOption> PUBG Mobile </SelectOption>        
      </Select>

      <Marginer vertical='1rem'/>

      <BoldText> No. of Players </BoldText>
      <Marginer vertical='0.5rem'/>
      <Select id="" name="" ref={maxPlayers}>
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

      <Marginer vertical='1rem'/>        
      <BoldText> Start Date </BoldText>
      <Input type="date" placeholder="Start of Tournament " ref={startDate}/>

      <Marginer vertical='1rem'/>        
      <BoldText> End Date </BoldText>
      <Input type="date" placeholder="End of Tournament" ref={endDate}/>      

      <Marginer vertical='1rem'/>        
      <BoldText> Venue </BoldText>
        <Input type='Venue' placeholder='Location' ref={venue}></Input>

        <Marginer vertical='1rem'/>
      <BoldText> Registration Fee </BoldText>
        <Input type='number' placeholder='Rs. 1000' min={0} ref={registrationFee}></Input>                

      <SubmitButton type="submit"> Create Tourney </SubmitButton>
      </FormContainer>

    </Container>
  );

}
