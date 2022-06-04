import { useRef, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import { Text } from "../../../../components/Text";
import { FlexContainer } from "../../../../components/base";
import { AiFillHeart } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import Button from '../../../../components/Button';
import { Modal, ModalHeader, ModalFooter, useModal } from "../../../../components/Modal";
import { useDeleteClipMutation } from "../../../../redux/ClipApi";
import { toast } from "react-toastify";

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
overflow-hidden
hover:cursor-pointer
`}
`;

export default function ClipCard({ clip }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const { isOpen, onClose, onOpen } = useModal();
  const [deleteClip, { isLoading: isDeleting }] = useDeleteClipMutation();

  useEffect(() => {
    if (!cardRef.current || !videoRef.current) return;

    const onMouseOver = () => {
      videoRef.current.play();
    };
    const onMouseOut = () => {
      videoRef.current.pause();
    };

    cardRef.current.addEventListener("mouseover", onMouseOver);
    cardRef.current.addEventListener("mouseout", onMouseOut);
  }, []);

  return (
    <>
      <ClipCardContainer ref={cardRef}>
        <video
          src={clip.video_url}
          ref={videoRef}
          autoPlay="autoplay"
          muted
          disablePictureInPicture
        ></video>
        <FlexContainer
          className="absolute bottom-0 px-4 py-8"
          gap="0.2rem"
          align="center"
        >
          <AiFillHeart color="white" size="17" />
          <Text className="font-bold" fontSize="0.8rem">
            {clip.likes.length}
          </Text>
        </FlexContainer>
      </ClipCardContainer>
      <FlexContainer className="hover:cursor-pointer hover:bg-red-500">
        <MdDelete color="white" size="30" onClick={onOpen} />
      </FlexContainer>

      <Modal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}>
        <ModalHeader>
          <Text> Are you sure you want to delete ?</Text>
        </ModalHeader>
        <ModalFooter>
          <Button w="100%" onClick={() => {
          toast.promise(deleteClip(clip.id).unwrap(), {
            pending: "Deleting..",
            success: "Delete the clip!",
            error: "Couldnt delete the clip!",
          });
          onClose();
        }}>
            Delete
          </Button>
          <Button w="100%" type="outlined" onClick={onClose}>
            Cancel
          </Button>          
        </ModalFooter>
      </Modal>
    </>
  );
}
