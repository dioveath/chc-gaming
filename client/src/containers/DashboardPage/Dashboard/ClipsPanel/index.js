import styled from "styled-components";
import tw from "twin.macro";

import UploadClipModal from './UploadClipModal';
import ClipCard from './ClipCard';

import { WrapContainer } from '../../../../components/base';
import { Text } from '../../../../components/Text';

const Container = styled.div`
${tw`
`}
`;

export default function ClipsPanel(){

  return (
    <Container>
      <UploadClipModal/>
      <Text className="text-2xl font-semibold my-2"> Your Clips </Text>
      <WrapContainer gap='1rem'>
	<ClipCard playCount={10}/>
	<ClipCard playCount={3210}/>
      </WrapContainer>
    </Container>
  );

}
