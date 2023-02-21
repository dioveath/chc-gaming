import { useState, useEffect, useMemo, createRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useParams } from "react-router-dom";

import {
  useGetTourneyQuery,
  useUpdateTourneyMutation,
} from "../../../redux/TourneyApi";

import { FlexContainer } from "../../../components/base";
import { Text } from "../../../components/Text";
import { Input } from "../../../components/Form";
import Button from "../../../components/Button";

import { BracketsManager } from "brackets-manager";
import { InMemoryDatabase } from "brackets-memory-db";

import { toast } from 'react-toastify';

const Container = styled.div`
  ${tw`
`}
`;

const storage = new InMemoryDatabase();
const manager = new BracketsManager(storage);

export default function Matches() {
  const { tourneyId } = useParams();
  const { data: tourney, isLoading, error } = useGetTourneyQuery(tourneyId);
  const [updateTourney] = useUpdateTourneyMutation();
  
  const matchesToBePlayed = tourney.tourney_data?.match.filter(
    (m) => m?.opponent1?.id != null && m?.opponent2?.id != null
  );
  const matchParticipants = tourney.tourney_data?.participant;

  console.log(matchesToBePlayed);

  const opponent1Field = useMemo(
    () =>
      Array.from({ length: matchesToBePlayed.length }).map(() => createRef()),
    [matchesToBePlayed.length]
  );
  const opponent2Field = useMemo(
    () =>
      Array.from({ length: matchesToBePlayed.length || 0 }).map(() => createRef()),
    [matchesToBePlayed.length]
  );

  const loadTourneyData = async () => {
    if (Object.keys(tourney.tourney_data)?.length !== 0) {
      const tourneyCopyData = JSON.parse(JSON.stringify(tourney.tourney_data));
      storage.setData(tourneyCopyData);
    }
  };

  useEffect(() => {
    (async () => {
      loadTourneyData();
    })();
  }, []);

  return (
    <Container>
      <FlexContainer justify="flex-start" direction="col">
        <Text fontSize="2rem" fontWeight="700">
          Matches
        </Text>

        <FlexContainer direction="col" justify="center" align="center">
          {matchesToBePlayed.map((m, i) => (
            <FlexContainer direction="col" gap="0.6rem" className="my-6">
	      <Text className='font-bold text-lg'> Round { m.round_id + 1 }</Text>
              <FlexContainer gap="0.5rem" align="center">
                <Text className="font-bold">{matchParticipants.find(p => p.id === m.opponent1.id)?.name}</Text>
                <Input type="number" ref={opponent1Field[i]} />
                <Text>vs</Text>
                <Input type="number" ref={opponent2Field[i]} />
                <Text className="font-bold">{matchParticipants.find(p => p.id === m.opponent2.id)?.name}</Text>
              </FlexContainer>
              <Button
                w="100%"
                onClick={async () => {
                  let score1 = opponent1Field[i]?.current.value || 0;
                  let score2 = opponent2Field[i]?.current.value || 0;                  

                  await manager.update.match({
                    id: m.id,
                    opponent1: {
                      id: m.opponent1.id,
                      score: score1,
                      result: score1 > score2 ? "win" : "loss",
                    },
                    opponent2: {
                      id: m?.opponent2?.id,
                      score: score2,
                      result: score2 > score1 ? "win" : "loss",
                    },
                  });
                  const data = await manager.get.tournamentData(1234);
                  toast.promise(updateTourney({id: tourneyId, tourney_data: data }).unwrap(),
                                {
                                  pending: "Updating Matche..!",
                                  success: "Successfully updated..!",
                                  error: "Error while updating"
                                });
                }}
              >
                Set Match
              </Button>
            </FlexContainer>
          ))}
        </FlexContainer>
      </FlexContainer>
    </Container>
  );
}
