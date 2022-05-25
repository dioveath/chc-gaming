import { useState } from 'react';
import styled from "styled-components";
import tw from "twin.macro";

import UploadClipModal from './UploadClipModal';
import ClipCard from './ClipCard';

import { FlexContainer, WrapContainer } from '../../../../components/base';
import Button from '../../../../components/Button';
import { Text } from '../../../../components/Text';

const Container = styled.div`
${tw`
`}
`;

export default function ClipsPanel(){
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  return (
    <Container>
      <UploadClipModal isModalOpen={isModalOpen}
                       setIsModalOpen={setIsModalOpen}/>
      <FlexContainer className='my-2'
                     justify='space-between'
                     align='items-center'>
        <Text className="text-2xl font-semibold"> Your Clips </Text>
	<Button onClick={() => setIsModalOpen(true)}> Upload Clip </Button>
      </FlexContainer>
      
      <WrapContainer gap='1rem'>
	<ClipCard playCount={10}/>
	<ClipCard playCount={3210}/>
      </WrapContainer>
    </Container>
  );

}
