import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

import { Text } from '../../../components/Text';
import { FlexContainer } from '../../../components/base';
import Button from '../../../components/Button';
import { GiEarthSpit } from 'react-icons/gi';

import { useGetClipsQuery } from '../../../redux/ClipApi';
import { useGetArenasQuery } from '../../Arena/arenaApiSlice';;


const Container = styled.div`
${tw`
w-full
h-full
`}
`;

export default function ClanPage(){
  const { data, error, isLoading, isFetching } = useGetArenasQuery();
    
  console.log(data, error);

  return (
    <Container>
      <FlexContainer w='100%'
                     h='100%'
                     justify='center'
                     align='center'>

        <FlexContainer direction='col'
                       align='center'>
          <GiEarthSpit size='4rem' color='white'/>
        </FlexContainer>
      </FlexContainer>
    </Container>
  );

}
