import styled from "styled-components";
import tw from "twin.macro";

import { FlexContainer } from "../../../components/base";
import { Text } from "../../../components/Text";

const Container = styled.div`
${tw`
`}
`;


export default function Matches(){
  
  return (
    <Container>
      <FlexContainer justify="flex-start">
        <Text fontSize="2rem" fontWeight="700">
          Matches
        </Text>
        

      </FlexContainer>      
    </Container>
  );

}
