import styled from 'styled-components';
import tw from 'twin.macro';
import { useSelector }  from 'react-redux';

import { Marginer } from '../../components/Marginer';


const BodyText = styled.p`
${tw`
text-base
text-white
`}`;


const RulesContainer = styled.div`
width: 100%;
display: flex;
justify-content: flex-start;
padding: 10px 30px;
`;


export default function RulesSection(){
  const { selectedTourney } = useSelector(state => state.tourney);

  return (
    <RulesContainer>
      <BodyText> { selectedTourney.description } </BodyText>
      <Marginer vertical="10px"/>          
    </RulesContainer>    
  );

} 


