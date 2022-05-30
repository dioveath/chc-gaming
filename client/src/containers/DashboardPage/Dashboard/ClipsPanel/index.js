import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";

import UploadClipModal from "./UploadClipModal";
import ClipCard from "./ClipCard";

import { FlexContainer, WrapContainer } from "../../../../components/base";
import Button from "../../../../components/Button";
import { Text } from "../../../../components/Text";

import axios from "axios";
import config from "../../../../config/config";
import { setClips, pending, error } from "../../../../redux/ClipSlice";
import BounceLoader from "react-spinners/BounceLoader";

import { MdError } from 'react-icons/md';

const Container = styled.div`
  ${tw`
w-full
h-full
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
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const {
    allClips: { clips, pagination },
    isPending,
    isError
  } = useSelector((state) => state.clip);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        url: `${config.serverUrl}/api/v1/clips`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
        params: {
          author: auth.userId,
        },
      };

      try {
        dispatch(pending());
        const response = await axios.request(options);
        dispatch(setClips(response.data.clips));
      } catch (e) {
        console.log(e);
        dispatch(error(e.response ? e.response.data.errorList : e.message));
      }
    })();
  }, [auth.accessToken, auth.userId, dispatch]);

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

      {isPending ? (
        <LoadingContainer>
          <BounceLoader color="red" />
        </LoadingContainer>
      ) : (
        <WrapContainer gap="1rem">
          {clips.map((c) => {
            return (
              <ClipCard key={c.id} clip={c} />
            );
          })}
        </WrapContainer>
      )}

      {isError && <LoadingContainer>
		     <FlexContainer direction='col'
                                    align='center'
                                    justify='center'>
                       <MdError size={40} color='white'/>
		       <Text className="text-xl fomt-semibold"> Something went wrong!</Text>                       
                     </FlexContainer>
                  </LoadingContainer>}
    </Container>
  );
}
