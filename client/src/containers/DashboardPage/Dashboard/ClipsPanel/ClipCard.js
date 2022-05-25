import { useRef, useEffect } from 'react';
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
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {

    if(!cardRef.current || !videoRef.current) return;
    
    const onMouseOver = () => {
      videoRef.current.play();
    };
    const onMouseOut = () => {
      videoRef.current.pause();
    };    

    cardRef.current.addEventListener('mouseover', onMouseOver);
    cardRef.current.addEventListener('mouseout', onMouseOut);
  
  });

  return (
      <ClipCardContainer ref={cardRef}>
	<video src={videoSrc}
               ref={videoRef}
               autoPlay="autoplay"
               muted
               disablePictureInPicture></video>
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
