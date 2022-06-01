import styled from 'styled-components';
import tw from 'twin.macro';
import { Text, BoldText } from '../../../../components/Text';
import { FlexContainer } from '../../../../components/base';

const Container = styled.div`
${tw`

`}
`;

const PostCardContainer = styled.div`
${tw`
rounded-md
bg-black
overflow-hidden
`}
`;

const MediaContainer = styled.div`
${tw`
grid
place-items-center
rounded-t-md
overflow-hidden
max-h-96
`}
`;

const DescriptionContainer = styled.div`
${tw`
px-4
py-4
flex
flex-col
gap-2
`}
`;

export default function OpeningCard(){
  return (
    <Container>
      <PostCardContainer>
        <MediaContainer>
         <img alt="Charicha Gaming Opening" src="assets/images/celebration.jpg"/> 
        </MediaContainer>
        
        <DescriptionContainer>
	  <FlexContainer direction='col'>
            <Text className='text-lg md:text-xl font-bold'> Welcome to </Text>
            <Text className='text-lg md:text-xl font-bold text-red-600'> Charicha Gaming! </Text>            
          </FlexContainer>

          <Text className='text-base md:text-lg font-semibold text-green-400'> "A platform for gamers to showcase their skills." </Text>
	  <Text className='text-sm md:text-md font-thin'> ⇒ What's fun if we can't showcase our stats with others. </Text>
	  <Text className='text-sm md:text-md font-thin'> ⇒ Join tournaments, win tournaments, update your stats, join eSports teams, win more! </Text>
	  <Text className='text-sm md:text-md font-thin'> ⇒ Upload montage clips, get traction, be popular! </Text>

	  <FlexContainer w='100%' className='bg-red-700 p-4 rounded-md'>
            <Text className='text-sm md:text-base font-bold'> Follow other gamers to get updates! </Text>          
          </FlexContainer>          
        </DescriptionContainer>

      </PostCardContainer>
    </Container>
  );
} 
