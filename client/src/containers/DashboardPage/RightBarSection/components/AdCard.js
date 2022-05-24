import styled from 'styled-components';
import tw from 'twin.macro';
import {
  NormalText,
  BoldText
} from '../../components/Text';
import FifaLeaguePoster from '../../assets/images/fifa_league_poster.png';

const AdCardContainer = styled.div`
${tw`
flex
flex-col
`}
`;

const PosterContainer = styled.img`
height: 135px;
${tw`
rounded-md
overflow-hidden
object-cover
`}
`;

export default function AdCard(){
  return (
    <AdCardContainer>
      <PosterContainer src={FifaLeaguePoster}/>
      <BoldText> FIFA League Season 4 - Register now! </BoldText>
      <NormalText> Compete with the best! </NormalText>
    </AdCardContainer>
  );
}
