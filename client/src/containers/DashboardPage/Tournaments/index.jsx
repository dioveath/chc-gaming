import styled from 'styled-components';
import tw from 'twin.macro';

import { FlexContainer } from '../../../components/base';
import { Text } from '../../../components/Text';
import { Marginer } from '../../../components/Marginer';

import TourneyCard from './TourneyCard';
import TourneyFullView from './TourneyFullView';

import { useGetTourneysQuery } from '../../../redux/TourneyApi';
import BounceLoader from 'react-spinners/BounceLoader';


const Container = styled.div`
${tw`

`}
`;

const LoadingContainer = styled.div`
${tw`
w-full
h-screen
flex
justify-center
items-center
`}
`;

export default function Tournaments(){
  const { data, error, isLoading } = useGetTourneysQuery({});

  return (
    <Container>
      <FlexContainer
        w='100%'
        justify='flex-start'>
        <Text fontSize='1.5rem'
              fontWeight='700'> Tournaments </Text>
      </FlexContainer>

      { isLoading && <LoadingContainer>
          <BounceLoader color='red'/>
        </LoadingContainer>
      }

      <FlexContainer direction='col' w='100%'>
        { data && data.tourneys.map((t) => <TourneyFullView key={t.id} tourney={t}/>)}
      </FlexContainer>

      { error &&
        <>
          <Text className="text-lg font-bold"> Server Error | 500 </Text>
        </> }

      <Marginer vertical='20rem'/>

    </Container>
  );

}
