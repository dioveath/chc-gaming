import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";

import { Text } from "../../../components/Text";
import { FlexContainer } from "../../../components/base";
import Button from "../../../components/Button";
import { GiEarthSpit } from "react-icons/gi";

import { useGetClipsQuery } from "../../../redux/ClipApi";
import { useGetArenaQuery, useGetArenasQuery } from "../../Arena/arenaApiSlice";
import { useSelector } from "react-redux";

const Container = styled.div`
  ${tw`
    w-full
    h-full
  `}
`;

export default function ClanPage() {
  const userId = useSelector((state) => state.auth.userId);
  const { data, error, isLoading, isFetching } = useGetArenasQuery({
    query: { owner: userId },
  });

  return (
    <Container>
      <FlexContainer w="100%" h="100%" justify="center" align="center">
        <FlexContainer direction="col" align="center">
          <GiEarthSpit size="4rem" color="white" />
        </FlexContainer>
        <FlexContainer>
          <ul>
            {data &&
              data.arenas.arenas.map((arena) => (
                <li key={arena.id}>
                  <Link className="text-red-600" to={{ pathname: `/organizer/${arena.id}/dashboard` }}>
                    {arena.name}
                  </Link>
                </li>
              ))}
          </ul>
        </FlexContainer>
      </FlexContainer>
    </Container>
  );
}