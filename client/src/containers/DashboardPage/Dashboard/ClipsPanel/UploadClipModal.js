import { useState, useRef } from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";
import tw from "twin.macro";

import { storage, ref, uploadString, getDownloadURL } from '../../../../lib/firebase';

import { Text, BoldText } from "../../../../components/Text";
import { Input, Select, SelectOption } from "../../../../components/Form";
import Button from "../../../../components/Button";
import { FlexContainer, WrapContainer } from "../../../../components/base";
import { FiUploadCloud } from "react-icons/fi";

import { toast } from 'react-toastify';

const ModalContainer = styled.div.attrs((props) => ({
  className: props.className
}))`
  ${tw`
fixed
z-30
w-full
h-full
left-0
top-0
overflow-scroll
bg-black
border-2
border-gray-800
rounded-md
p-4
py-6
shadow-2xl
transition-all
backdrop-filter

`}
`;

const ModalHeader = styled.div.attrs((props) => ({
  className: props.className
}))`
  ${tw`
w-full
flex
items-center
mb-2
transition-all
`}
`;

const ModalBody = styled.div`
  ${tw`
w-full
transition-all
`}
`;

const ModalFooter = styled.div`
  ${tw`
w-full
transition-all
`}
`;

const FileCustomInputContainer = styled.div.attrs((props) => ({
  className: props.className,
}))`
  ${tw`
w-[15rem]
h-[27rem]
flex
flex-col
justify-center
items-center
rounded-md
p-4
border-2
border-dashed
border-white
hover:border-red-700
hover:cursor-pointer
transition-all
`}
`;

const VideoContainer = styled.div.attrs((props) => ({
  className: props.className,
}))`
  ${tw`
w-[15rem]
h-[27rem]

flex
justify-center
items-center
rounded-md
border-2
border-red-300
overflow-hidden
transition-all
`}
`;

export default function UploadClipModal({ isModalOpen, setIsModalOpen}) {
  const { data } = useSelector(state => state.user);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef(null);
  const videoPreviewRef = useRef(null);
  const titleRef = useRef(null);
  const privacyRef = useRef(null);

  const onVideoChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0])
      reader.readAsDataURL(e.target.files[0]);

    reader.onload = (readerEvent) => {
      setPreviewVideo(readerEvent.target.result);
    };
    
  };

  const onVideoCancel = (_e) => {
    videoPreviewRef.current.src = "";
    setPreviewVideo(null);
  };

  const uploadVideoClip = async (_e) => {
    const toastId = toast.loading("Uploading...");    
    if(previewVideo){
      try { 
        const videoRef = ref(storage, `clips/${data.id}/${titleRef.current.value}:${Date.now()}`);

        const uploadResult = await uploadString(videoRef, previewVideo, 'data_url');
        const downloadUrl = await getDownloadURL(uploadResult.ref);

        toast.update(toastId, {
          render: "Clipped successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });        
        
      } catch(e){
        console.log(e);
        toast.update(toastId, {
          render: e.message,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });        
      }
    }
  };

  return (
    <ModalContainer className={!isModalOpen && "hidden"}>
      <ModalHeader className='relative'>
        <FlexContainer w="100%" items="center" justify="center">
          <BoldText> Upload Clip </BoldText>
        </FlexContainer>
        <Button className='absolute right-0'
                    onClick={() => {
                      onVideoCancel();
                      setIsModalOpen(false);
                    }}> Cancel </Button>
      </ModalHeader>
      <ModalBody>
        <WrapContainer w="100%" justify="center" gap='2rem'>
          <VideoContainer className={previewVideo ? "relative" : "hidden"}>
            <video
              className={previewVideo ? "" : "hidden"}
              src={previewVideo}
              ref={videoPreviewRef}
              controls
            >
            </video>


          </VideoContainer>
          <FlexContainer className={previewVideo ? "align-center gap-4 mt-2" : "hidden"}>
              <Button text='Reupload'
                      onClick={() => { fileRef.current.click(); }}/>
              <Button type='outlined'
                      text='Cancel'
                      onClick={onVideoCancel}/>
            </FlexContainer>          

          <FileCustomInputContainer
            className={previewVideo && "hidden"}
            onClick={() => {
              fileRef.current.click();
            }}
          >
            <input
              type="file"
              ref={fileRef}
              onChange={onVideoChange}
              className="hidden"
              accept="video/mp4, video/webm"
            />

            <FiUploadCloud size="26" color="white" />
            <Text className="text-xs text-white font-semibold">
              Select clip to upload
            </Text>

            <FlexContainer
              className="w-full flex-col mt-4"
              justify="center"
              items="center"
              gap="0.2rem"
            >
              <Text className="text-xs text-white" fontSize="12px">
                720x1280 resoluation or higher
              </Text>
              <Text className="text-xs text-white" fontSize="12px">
                MP4 or WebM
              </Text>
              <Text className="text-xs text-white" fontSize="12px">
                Up to 2 Minutes
              </Text>
              <Text className="text-xs text-white" fontSize="12px">
                Less than 100 MB
              </Text>
            </FlexContainer>
          </FileCustomInputContainer>

          <FlexContainer direction="col" gap="0.4rem">
            <BoldText className="mt-2"> Title </BoldText>
            <Input type="text" ref={titleRef}/>
            <BoldText> Cover </BoldText>
            <Select>
              <SelectOption> Private </SelectOption>
              <SelectOption> Followers </SelectOption>
              <SelectOption> Public </SelectOption>
            </Select>

            <BoldText> Run a copyright check </BoldText>
            <Text fontSize="10px">
              We'll check your video for potential copyright infringements on
              used sounds. If infringements are found, you can edit the video
              before posting. Learn more
            </Text>
          </FlexContainer>
        </WrapContainer>
      </ModalBody>
      <ModalFooter>
        <FlexContainer
          className="my-6"
          w="100%"
          gap="0.5rem"
          justify="space-between "
        >
          <Button type="outlined" w="100%" onClick={() => {
            onVideoCancel();
            setIsModalOpen(false);
          }}>
            Discard
          </Button>
          <Button w="100%" onClick={uploadVideoClip} isLoading={isUploading}> Publish </Button>
        </FlexContainer>
      </ModalFooter>
    </ModalContainer>
  );
}
