import { useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
${tw`
w-full
flex
flex-col
items-center
my-6
`}`;

const TitleText = styled.p`
${tw`
font-bold
text-lg
text-white
`}`;

const BodyText = styled.p`
${tw`
text-base
text-white
`}
`;

export default function ScheduleSection(){
  const { selectedTourney } = useSelector(state => state.tourney);

  const startDateString = new Date(selectedTourney.start_date).toString().substring(0, 16);
  const endDateString = new Date(selectedTourney.end_date).toString().substring(0, 16);

  return (
    <Container>
      <TitleText> Tournament Starts on: </TitleText>
      <BodyText> { startDateString } </BodyText>
      <TitleText> Tournament Ends on: </TitleText>
      <BodyText> { endDateString } </BodyText>      
    </Container>
  );

}
