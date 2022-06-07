import { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import { useParams } from "react-router-dom";

import { BracketsManager } from "brackets-manager";
import { InMemoryDatabase } from "brackets-memory-db";

import { useGetTourneyQuery } from "../../../redux/TourneyApi";

import { useGetUsersQuery } from "../../../redux/UserApi";

import { NormalText, BoldText, Text } from "../../../components/Text";

import { Input } from "../../../components/Form";

import { FlexContainer, WrapContainer } from "../../../components/base";

import Button, { IconButton } from "../../../components/Button";
import { MdAdd } from "react-icons/md";
import { BiShuffle, BiDotsVerticalRounded } from "react-icons/bi";

import useScript from "../../../hooks/useScript";
import useLink from "../../../hooks/useLink";

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

const storage = new InMemoryDatabase();
let manager = new BracketsManager(storage);

export default function Placements() {
  const { tourneyId } = useParams();
  const { data: tourney, error } = useGetTourneyQuery(tourneyId);

  const tourneyPlayers = tourney.members.filter((t) => t.status === "accepted");

  const { isLoaded } = useScript(
    "https://cdn.jsdelivr.net/npm/brackets-viewer@latest/dist/brackets-viewer.min.js"
  );
  useLink(
    "https:cdn.jsdelivr.net/npm/brackets-viewer@latest/dist/brackets-viewer.min.css",
    "stylesheet"
  );
  useLink("/brackets/themes/dark-blue.css", "stylesheet");

  const playerIds = Array.from(tourneyPlayers, (p) => p.member_id);

  const { data: users } = useGetUsersQuery({ $or: playerIds });

  const render = async () => {
    const b = document.getElementById("bracketsViewer");
    b.innerHTML = "";

    const data = await manager.get.tournamentData(1234);

    if(isLoaded)
    window.bracketsViewer.render({
      stages: data.stage,
      matches: data.match,
      matchGames: data.match_game,
      participants: data.participant,
    });
  };

  const generateBrackets = async () => {
    const tourneyData = await manager.get.tournamentData(1234);

    if (tourneyData && tourneyData.stage.length) {
      await manager.delete.stage(tourneyData.stage[0].id);
    }

    await manager.create({
      name: "Knockout Stage",
      tournamentId: 1234,
      type: "single_elimination",
      settings: {
        size: tourney.max_players,
        balanceByes: true,
        grandFinal: "simple",
      },
      seeding: playerIds,
    });

    render();
  };

  useEffect(() => {
    generateBrackets();
  }, [isLoaded]);

  return (
    <Container>
      <FlexContainer justify="space-between">
        <Text fontSize="2rem" fontWeight="700">
          Placements
        </Text>
      </FlexContainer>

      <FlexContainer direction="col" w="100%">
        <FlexContainer justify="space-between" align="center" w="100%">
          <Text fontSize="1.5rem" fontWeight="700">
            {" "}
            Seeding{" "}
          </Text>
          <FlexContainer align="center" gap="1rem">
            <IconButton icon={<MdAdd size={20} color="green" />} pad="0.5rem">
              {" "}
              Add{" "}
            </IconButton>
            <IconButton
              icon={<BiShuffle size={20} color="royalblue" />}
              pad="0.5rem"
            />
            <IconButton
              icon={<BiDotsVerticalRounded size={20} color="royalblue" />}
              pad="0.5rem"
            />
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
            {tourneyPlayers.map((p, i) => (
              <TRow key={p.id}>
                <TData> {i + 1} </TData>
                <TData> {p.member_id} </TData>
              </TRow>
            ))}
          </tbody>
        </Table>
      </FlexContainer>

      <FlexContainer direction="col">
        <FlexContainer w="100%" justify="space-between">
          <Text fontSize="1.2rem" fontWeight="700">
            Single Elimination Tree
          </Text>
          <Button onClick={generateBrackets}> Generate Stage </Button>
        </FlexContainer>

        <div id="bracketsViewer" className="brackets-viewer"></div>

        <FlexContainer w="100%" justify="flex-end">
          <Button> Save Matches </Button>
        </FlexContainer>
      </FlexContainer>
    </Container>
  );
}
