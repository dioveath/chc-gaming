import styled from 'styled-components';
import tw from 'twin.macro';

import { Text } from '../../../components/Text';
import { FlexContainer } from '../../../components/base';
import Button from '../../../components/Button';
import { GiEarthSpit } from 'react-icons/gi';

const Container = styled.div`
${tw`
w-full
h-full
`}
`;

export default function ClanPage(){
  
  return (
    <Container>
      <FlexContainer w='100%'
                     h='100%'
                     justify='center'
                     align='center'>

        <FlexContainer direction='col'
                       align='center'>
          <GiEarthSpit size='4rem' color='white'/>
          <Text fontSize='1.4rem'
                fontWeight='700'> You're not in a clan.</Text>          
        </FlexContainer>


      </FlexContainer>
    </Container>
  );

}
