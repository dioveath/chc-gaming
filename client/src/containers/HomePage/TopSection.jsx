import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";

import FifaLeaguePoster from "../../assets/images/fifa_league_poster.png";

import { Marginer } from "../../components/Marginer";
import { FlexContainer } from "../../components/base";

const TopSectionContainer = styled.div`
  padding-bottom: 40px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${tw`
 `}
`;

const Image = styled.div`
  img {
    width: 70vw;
    height: auto;
    opacity: 1;
    border-radius: 5px;
  }

  @media only screen and (max-width: 1024px) {
    img {
      width: 90vw;
    }
  }

  @media only screen and (max-width: 640px) {
    img {
      width: 100vw;
    }
  }
`;

const TextContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;

  @media only screen and (max-width: 640px) {
  }

  ${tw`
`}
`;

const HeadingText = styled.h1`
  ${tw`
text-2xl
sm:text-3xl
sm:tracking-wider
md:text-5xl

text-white
font-bold
sm:mt-4
sm:mb-2
`}
`;

const SloganText = styled.h4`
  ${tw`
text-white
sm:text-xl
sm:tracking-wide

text-sm
font-semibold
uppercase
sm:m-2
`}
`;

const SubHeadingText = styled.h2`
  ${tw`
text-sm
text-white

sm:text-2xl

font-bold
tracking-wide
mt-5
sm:mt-12
`}
`;

const LargeButton = styled(Link)`
  background-color: #b71b1b;
  min-width: 150px;

  background-color: ${(props) => props.secondary && "#191121"};

  ${tw`
text-white
text-center
text-base
font-bold
uppercase
m-4
shadow-2xl
outline-none
rounded-lg
transition-all
border-2
border-transparent
hover:border-red-500
hover:border-2
px-8
py-2
`}

  &:hover {
    filter: brightness(1.2);
  }

  @media only screen and (min-width: 640px) {
    ${tw`
px-16
py-2
text-2xl
`}
  }
`;

export default function TopSection() {
  const auth = useSelector((state) => state.auth);

  return (
    <TopSectionContainer>
      <Image>
        <img src={FifaLeaguePoster} alt="Fifa League Poster" />
      </Image>
      <TextContainer>
        <HeadingText>FIFA 22 TOURNAMENT</HeadingText>
        <SloganText>For the Game, For the World</SloganText>
        <SubHeadingText>STARTS FROM JUNE-10</SubHeadingText>
        <Marginer vertical="20px" />
      </TextContainer>

      <FlexContainer>
        {auth.accessToken && <LargeButton to="/dashboard"> Go to App Dashboard </LargeButton>}
        {!auth.accessToken && (
          <>
            <LargeButton to="/auth/login">Login</LargeButton>
            <LargeButton to="/auth/register" secondary>
              Register
            </LargeButton>
          </>
        )}
      </FlexContainer>
    </TopSectionContainer>
  );
}
