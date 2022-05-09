import styled from 'styled-components';

import { Marginer } from '../../components/Marginer';

const BodyText = styled.p`
font-size: 12px;
font-weight: normal;
color: white;
`;

const RulesContainer = styled.div`
width: 100%;
display: flex;
justify-content: flex-start;
padding: 10px 30px;
`;

export default function RulesSection(){

  return (
    <RulesContainer>
      <BodyText>
        1. Welcome to the Charicha League.
      </BodyText>
      <Marginer vertical="10px"/>          
    </RulesContainer>    
  );

} 


