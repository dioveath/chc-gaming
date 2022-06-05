import { useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useHistory } from "react-router-dom";

import { Text, BoldText } from "../../../components/Text";

import { Input } from "../../../components/AccountBox/FormElements.js";

import { FlexContainer } from "../../../components/base";

import { Marginer } from "../../../components/Marginer";

import Button, { SubmitButton } from "../../../components/Button";
import ListTileImage from "./MediaListTile.js";
import ClipLoader from 'react-spinners/ClipLoader';

import config from "../../../config/config.js";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { pending, error, addTourney } from "../../../redux/TourneySlice.js";

const Container = styled.div`
  ${tw`
max-w-lg
w-full
my-4
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
    border-bottom: 2px solid rgb(183, 27, 27);
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
    border-bottom: 2px solid rgb(183, 27, 27);
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

const ErrorListBox = styled.ul`
  ${tw`
w-full
rounded-md
border
border-red-800
p-2
my-4
`}
`;

const ErrorContainer = styled.li`
  ${tw`
text-xs
text-red-600
`}
`;

const BottomMargin = styled.div`
  ${tw`
h-96
`}
`;

export default function TourneyCreatePage() {
  const title = useRef();
  const description = useRef();
  const game = useRef();
  const maxPlayers = useRef();
  const registrationFee = useRef();
  const venue = useRef();
  const startDate = useRef();
  const endDate = useRef();
  const registrationEndDate = useRef();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isPending, isError, errorMessages } = useSelector((state) => state.tourney);

  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(pending());

    try {
      const tourney = {
        title: title.current.value,
        description: description.current.value,
        status: "pending",
        game: game.current.value,
        max_players: maxPlayers.current.value,
        medias: [],
        location: venue.current.value,
        registration_fee: registrationFee.current.value,
        registration_end_date: registrationEndDate.current.value,
        start_date: startDate.current.value,
        end_date: endDate.current.value,
        members: [],
        managers: [auth.userId],
        sponserships: [],
        prizes: [],
        matches: [],
        hypes: [],
        live_link: "https://www.youtube.com/watch?v=hKIGnR4LKdM&t=54s",
      };

      const options = {
        method: "POST",
        url: `${config.serverUrl}/api/v1/tourneys`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
        data: tourney,
      };

      console.log(tourney);

      const response = await axios.request(options);
      dispatch(addTourney(response.data.newTourney));
      history.push("/organizer/tourneys/" + response.data.newTourney.id);
    } catch (e) {
      dispatch(error(e.response.data.errorList));
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={submitHandler}>
        <BoldText> Title </BoldText>
        <Marginer vertical="0.5rem" />
        <Input
          type="text"
          placeholder="Charicha FIFA 22 Tournament"
          ref={title}
        ></Input>

        <Marginer vertical="1rem" />

        <BoldText> Description </BoldText>
        <Marginer vertical="0.5rem" />
        <TextArea
          ref={description}
          placeholder="Charicha FIFA 22 Tournament is the best tournament to win grand prizes of up to Rs. 50.000. We are sponsored by Charicha itself."
        />

        <BoldText> Game </BoldText>
        <Marginer vertical="0.5rem" />
        <Select id="" name="" ref={game}>
          <SelectOption> FIFA 22 </SelectOption>
          <SelectOption> PUBG Mobile </SelectOption>
        </Select>

        <Marginer vertical="1rem" />

        <BoldText> No. of Players </BoldText>
        <Marginer vertical="0.5rem" />
        <Select id="" name="" ref={maxPlayers}>
          <SelectOption> 8 </SelectOption>
          <SelectOption> 16 </SelectOption>
          <SelectOption> 32 </SelectOption>
          <SelectOption> 64 </SelectOption>
          <SelectOption> 128 </SelectOption>
        </Select>

        <Marginer vertical="1rem" />

        <BoldText> Media </BoldText>
        <Text fontSize="0.7rem">
          Share photos or a video. Medias can't exceed 10 photos & 1 video
        </Text>

        <FlexContainer direction="col" align="space-between">
          <ListTileImage />
        </FlexContainer>

        <FlexContainer gap="1rem">
          <Button text="Add Photo" />
          <Button text="Add Video" />
        </FlexContainer>


        <Text className='font-semibold mt-4'> Schedules </Text>
        <Text fontSize="0.7rem">
          Schedule & plan your tourney
        </Text>        
      <FlexContainer gap='1rem' justify='space-between'>
	<Text className='text-sm font-semibold'> Registraion End Date </Text>
	<Text className='text-sm font-semibold'> Tournament Start Date </Text>
	<Text className='text-sm font-semibold'> Tournament End Date </Text>                
      </FlexContainer>      

      <FlexContainer gap='1rem'>
        <Input type="date" ref={startDate} placeholder="Registration end Date"/>      
        <Input type="date" ref={registrationEndDate} placeholder="Tournament Start Date"/>
        <Input type="date" ref={endDate} placeholder="Tournament End Date"/>          
      </FlexContainer>        

        <Marginer vertical="1rem" />
        <BoldText> Venue </BoldText>
        <Input type="Venue" placeholder="Location" ref={venue}></Input>

        <Marginer vertical="1rem" />
        <BoldText> Registration Fee </BoldText>
        <Input
          type="number"
          placeholder="Rs. 1000"
          min={0}
          ref={registrationFee}
        ></Input>

        <ErrorListBox>
          {isError &&
            errorMessages.map((e) => (
              <ErrorContainer key={e}>{e}</ErrorContainer>
            ))}
          { isPending && <ClipLoader color='red' size={10}/>}
        </ErrorListBox>

        <SubmitButton type="submit"> Create Tourney </SubmitButton>
      </FormContainer>
      <BottomMargin />
    </Container>
  );
}
