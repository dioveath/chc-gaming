import { useRef, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import { Text } from "../../../../components/Text";
import { FlexContainer } from "../../../../components/base";
import { AiFillHeart } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

import Button from "../../../../components/Button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useModal,
} from "../../../../components/Modal";

import {
  Input,
  Select,
  SelectOption
} from '../../../../components/Form';

import { useDeleteClipMutation, useUpdateClipMutation } from "../../../../redux/ClipApi";
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

const VideoDisplayContainer = styled.div`
${tw`
w-full
h-48
bg-black
shadow-2xl
flex
justify-center
overflow-hidden
hover:cursor-pointer
`}
`;

export default function ClipCard({ clip }) {
  const { isOpen, onClose, onOpen } = useModal();
  const [deleteClip, { isLoading: isDeleting }] = useDeleteClipMutation();
  const [updateClip] = useUpdateClipMutation();

  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const privacyRef = useRef(null);

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

  const onUpdateHandler = () => {

    toast.promise(updateClip({
      id: clip.id,
      title: titleRef.current.value,
      privacy: privacyRef.current.value,
    }).unwrap(), {
      pending: "Updating...",
      success: "Update successful",
      error: {
        render: (data) => {
          console.log(data);
          return "Couldn't update the clip!";
        }
      }
    });
    videoRef.current.pause();    
    onClose();
  }

  const onDeleteHandler = () => {
    videoRef.current.pause();
    toast.promise(deleteClip(clip.id).unwrap(), {
      pending: "Deleting..",
      success: "Delete the clip!",
      error: "Couldnt delete the clip!",
    });
    onClose();    
  }

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
      <FlexContainer className="hover:cursor-pointer bg-red-800 hover:bg-red-500 rounded-md">
        <MdEdit color="white" size="30" onClick={onOpen} />
      </FlexContainer>

      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <ModalHeader>
          <Text className='font-bold'> Update Clip </Text>
        </ModalHeader>
	<ModalBody>
	  <VideoDisplayContainer>
            <video
              className='h-40'
          src={clip.video_url}
          ref={videoRef}
          autoPlay="autoplay"
          muted
          controls
          disablePictureInPicture
        ></video>            
          </VideoDisplayContainer>

	  <Text className='font-bold'>Title</Text>
	  <Input type='text' ref={titleRef} placeholder={clip.title} defaultValue={clip.title}></Input>

	  <Text className='font-bold'>Privacy</Text>          
	  <Select ref={privacyRef}>
            <SelectOption value='public'> Public </SelectOption>
            <SelectOption value='followers'> Followers </SelectOption>
            <SelectOption value='private'> Private </SelectOption>            
          </Select>
	  <Text className='font-bold'>
            { clip.likes.length } Likes
          </Text>
	  <Text className='font-bold'>
            Uploaded on: { new Date(clip.createdAt).toLocaleString() }
          </Text>                    
        </ModalBody>
        <ModalFooter>
          <Button w="100%"
                  onClick={onUpdateHandler}>
            Update
          </Button>          

          <Button
            w="100%"
            onClick={onDeleteHandler}
          >
            Delete
          </Button>

          <Button w="100%" type="outlined" onClick={() => {
            videoRef.current.pause();
            onClose();
          }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
