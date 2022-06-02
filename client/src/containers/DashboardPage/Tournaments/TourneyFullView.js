import styled from "styled-components";
import tw from "twin.macro";
import { Carousel } from "react-responsive-carousel";
import { Player, BigPlayButton } from "video-react";
import ReactPlayer from "react-player";
import "video-react/dist/video-react.css";

import { Text } from "../../../components/Text";
import { FlexContainer } from "../../../components/base";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const Container = styled.div`
  ${tw`
`}
`;

const YoutubeSlide = ({ url, isSelected }) => {
  return <ReactPlayer width={"auto"} url={url} playing={isSelected} />;
};

export default function TourneyFullView({ tourney }) {
  const customRenderItem = (item, props) => (
    <item.type {...item.props} {...props} />
  );

  // const getVideoThumb = (videoId) => `https://img.youtube.com/vi/${videoId}/default.jpg`;
  // const getVideoId = (url) => url.substr('https://www.youtube.com/embed/'.length, url.length);

  console.log(tourney);

  // covert tourney.start_date to readable format
  const startDate = new Date(tourney.start_date);

  return (
    <Container>
      <Carousel renderItem={customRenderItem} showThumbs={false}></Carousel>

      <FlexContainer direction="col" gap="0.4rem">
        <Text className="text-2xl font-bold">{tourney.title}</Text>
        <FlexContainer align="center" gap="0.2rem">
          <FaMapMarkerAlt className="text-sm text-red-600" />
          <Text className="text-xs font-light">{tourney.location}</Text>
        </FlexContainer>
        <FlexContainer align="center" gap="0.2rem">
          <FaCalendarAlt className="text-sm text-blue-600" />
          <Text className="text-xs font-light">
            {startDate.toLocaleDateString()}
          </Text>
        </FlexContainer>
        <Text className="text-base">{tourney.description}</Text>
      </FlexContainer>
    </Container>
  );
}
