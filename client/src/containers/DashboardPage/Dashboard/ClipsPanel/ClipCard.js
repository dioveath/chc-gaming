import styled from "styled-components";
import tw from "twin.macro";

import { Text } from '../../../../components/Text';
import { FlexContainer, WrapContainer } from '../../../../components/base';
import { BsFillPlayFill } from 'react-icons/bs';

const ClipCardContainer = styled.div`
${tw`
relative
w-48
h-72
bg-black
rounded-md
shadow-2xl
grid
items-center
hover:cursor-pointer
`}
`;


export default function ClipCard({ videoSrc, playCount }){
  return (
      <ClipCardContainer>
	<video src={videoSrc} autoplay="autoplay" muted disablePictureInPicture></video>
	<FlexContainer className='absolute bottom-0 px-4 py-8'
                       gap='0.2rem'
                       align='center'>
          <BsFillPlayFill color='white' size='24'/>
	  <Text className='font-bold'
                fontSize='0.8rem'> { playCount } </Text>
        </FlexContainer>


      </ClipCardContainer>    
  );
}
