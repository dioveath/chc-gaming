import { useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";

import { Text, BoldText } from "../../../components/Text";

import { Input } from "../../../components/AccountBox/FormElements.js";

import { FlexContainer } from "../../../components/base";

import { Marginer } from "../../../components/Marginer";

import Button, { SubmitButton } from "../../../components/Button";
import ListTileImage from "./MediaListTile.js";
import ClipLoader from "react-spinners/ClipLoader";

import config from "../../../config/config.js";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { pending, error, addTourney } from "../../../redux/TourneySlice.js";

const Container = styled.div`
  ${tw`
max-w-4xl
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
  const game = useRef();
  const maxPlayers = useRef();
  const location = useRef();
  const platform = useRef();
  const registrationFee = useRef();
  const registrationStartDate = useRef();
  const registrationEndDate = useRef();
  const startDate = useRef();
  const endDate = useRef();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const tourney = {
        title: title.current.value,
        game: game.current.value,
        platforms: [platform.current.value],
        max_players: maxPlayers.current.value,
        location: location.current.value,
        registration_fee: registrationFee.current.value,
        registration_open_date: registrationStartDate.current.value,
        registration_end_date: registrationEndDate.current.value,
        start_date: startDate.current.value,
        end_date: endDate.current.value,
        managers: [{
          user_id: auth.userId,
          role: 'admin'
        }],
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
      navigate("/organizer/tourneys/" + response.data.newTourney.id);
    } catch (e) {
      console.log(e);
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

        <BoldText> Game </BoldText>
        <Marginer vertical="0.5rem" />
        <Select id="" name="" ref={game}>
          <SelectOption> FIFA 22 </SelectOption>
          <SelectOption> PUBG Mobile </SelectOption>
          <SelectOption> DOTA 2 </SelectOption>
        </Select>

        <BoldText> Platforms </BoldText>
        <Marginer vertical="0.5rem" />
        <Select id="" name="" ref={platform}>
          <SelectOption value='ps4'> PS4 </SelectOption>
          <SelectOption value='pc'> PC </SelectOption>
          <SelectOption value='mobile'> Mobile </SelectOption>
        </Select>        

        <Marginer vertical="1rem" />

        <BoldText> No. of Players </BoldText>
        <Marginer vertical="0.5rem" />
        <Select id="" name="" ref={maxPlayers}>
          <SelectOption> 8 </SelectOption>
          <SelectOption> 16 </SelectOption>
          <SelectOption> 32 </SelectOption>
          <SelectOption> 64 </SelectOption>
        </Select>

        <Text className="font-semibold mt-4"> Schedules </Text>
        <Text fontSize="0.7rem">Schedule & plan your tourney</Text>
        <FlexContainer gap="1rem" justify="space-between" className="mt-2">
          <Text className="text-sm font-semibold">
            {" "}
            Registraion Start Date{" "}
          </Text>
          <Text className="text-sm font-semibold"> Registration End Date </Text>
          <Text className="text-sm font-semibold"> Tournament Start Date </Text>
          <Text className="text-sm font-semibold"> Tournament End Date </Text>
        </FlexContainer>

        <FlexContainer gap="1rem">
          <Input
            type="date"
            ref={registrationStartDate}
            placeholder="Registration Start Date"
          />
          <Input
            type="date"
            ref={registrationEndDate}
            placeholder="Registration End Date"
          />
          <Input
            type="date"
            ref={startDate}
            placeholder="Tournament Start Date"
          />
          <Input type="date" ref={endDate} placeholder="Tournament End Date" />
        </FlexContainer>

        <Marginer vertical="1rem" />
        <BoldText> Location </BoldText>
        <Input type="text" placeholder="Location" ref={location}></Input>

        <Marginer vertical="1rem" />
        <BoldText> Registration Fee </BoldText>
        <Input
          type="number"
          placeholder="Rs. 1000"
          min={0}
          ref={registrationFee}
        ></Input>

        <SubmitButton type="submit"> Create Tourney </SubmitButton>
      </FormContainer>
      <BottomMargin />
    </Container>
  );
}
