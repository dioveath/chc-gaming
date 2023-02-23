import styled from 'styled-components';
import tw from 'twin.macro';

import {
  NormalText,
  BoldText
} from '../../../components/Text';
import {
  FlexContainer
} from '../../../components/base';

import Button from '../../../components/Button';
import { useSelector } from 'react-redux';

const Container = styled.div`
${tw`
max-w-lg
flex
flex-col
p-4
gap-2
my-4
bg-black
rounded-md
`}
`;

const Avatar = styled.img`
width: ${props => props.w || '40px'};
height: ${props => props.h || '40px'};
position: relative;

${tw`
object-cover
overflow-hidden
rounded-full
`}
`;


export default function ClanCard(){
  const { arena } = useSelector(state => state.organizer);

  return (
    <Container>
      <Avatar src='/assets/images/chc_gaming_logo.png' w='60px' h='60px'/>
      <NormalText> @{ arena.handle } </NormalText>
      <BoldText> { arena.name } </BoldText>
      <NormalText> Et, egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim, sit amet? Sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam. </NormalText>
      <FlexContainer justify='space-between'>
        <Button text='Create Tourney'/>
        <Button text='Create League' type='outlined'/>
        <Button text='Preview' to={`/arena/${arena.id}`}/>
      </FlexContainer>
    </Container>
  );
}
