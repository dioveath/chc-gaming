import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";

import UploadClipModal from "./UploadClipModal";
import ClipCard from "./ClipCard";

import { Marginer } from '../../../../components/Marginer';
import { FlexContainer, WrapContainer } from "../../../../components/base";
import Button from "../../../../components/Button";
import { Text } from "../../../../components/Text";

import { useGetClipsQuery } from "../../../../redux/ClipApi";
import BounceLoader from "react-spinners/BounceLoader";

import { MdError } from 'react-icons/md';

const Container = styled.div`
  ${tw`
w-full
h-full
flex
flex-col
`}
`;

const LoadingContainer = styled.div`
  ${tw`
w-full
h-96
grid
place-items-center
`}
`;

export default function ClipsPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useSelector(state => state.auth);
  const { data, error, isLoading } = useGetClipsQuery({ author: auth.userId });

  return (
    <Container>
      <UploadClipModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <FlexContainer
        className="my-2"
        justify="space-between"
        align="items-center"
      >
        <Text className="text-2xl font-semibold"> Your Clips </Text>
        <Button onClick={() => setIsModalOpen(true)}> Upload Clip </Button>
      </FlexContainer>
      
      {isLoading ? (
        <LoadingContainer>
          <BounceLoader color="red" />
        </LoadingContainer>
      ) : (
        <WrapContainer gap="1rem">
          {data?.clips?.clips?.map((c) => {
            return (
              <ClipCard key={c.id} clip={c} />
            );
          })}
        </WrapContainer>
      )}
      
      {error && <LoadingContainer>
		     <FlexContainer direction='col'
                                    align='center'
                                    justify='center'>
                       <MdError size={40} color='white'/>
		       <Text className="text-xl fomt-semibold"> Something went wrong!</Text>                       
                     </FlexContainer>
                </LoadingContainer>}

      {/* Why the fu** this isn't working' */}
      <Marginer vertical='200px' horizontal='200px'/> 
    </Container>
  );
}
