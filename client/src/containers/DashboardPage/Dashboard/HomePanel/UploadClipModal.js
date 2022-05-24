import { useState, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import { Text, BoldText } from "../../../../components/Text";
import { Input, Select, SelectOption } from "../../../../components/Form";
import Button, { IconButton } from "../../../../components/Button";
import { FlexContainer, WrapContainer } from "../../../../components/base";

import { FiUploadCloud } from "react-icons/fi";

const ModalContainer = styled.div.attrs((props) => ({
  className: props.className
}))`
  ${tw`
fixed
z-50
w-[80%]
h-[80%]
top-[10%]
left-[10%]
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

export default function UploadClipModal() {
  const [isOpen, setModelOpen] = useState(true);
  const [previewVideo, setPreviewVideo] = useState(null);
  const fileRef = useRef(null);
  const videoPreviewRef = useRef(null);

  const onVideoChange = (e) => {
    let fileUrl = "";
    if (e.target.files[0]) {
      fileUrl = window.URL.createObjectURL(e.target.files[0]);
      setPreviewVideo(fileUrl);
    }
  };

  const onVideoCancel = (e) => {
    videoPreviewRef.current.src = "";
    setPreviewVideo(null);
  };

  return (
    <ModalContainer className={!isOpen && "hidden"}>
      <ModalHeader className='relative'>
        <FlexContainer w="100%" items="center" justify="center">
          <BoldText> Upload Clip </BoldText>
        </FlexContainer>
        <IconButton className='absolute px-2 py-1 right-0'
                    onClick={() => {
                      setModelOpen(false);
                    }}> Cancel </IconButton>
      </ModalHeader>
      <ModalBody>
        <WrapContainer w="100%" justify="center" gap='2rem'>
          <VideoContainer className={previewVideo ? "relative" : "hidden"}>
            <video
              className={previewVideo ? "" : "hidden"}
              src={previewVideo}
              ref={videoPreviewRef}
              controls
            ></video>


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
            <Input type="text" />
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
          className="mt-2"
          w="100%"
          gap="0.5rem"
          justify="space-between"
        >
          <Button type="outlined" w="100%">
            Discard
          </Button>
          <Button w="100%"> Publish </Button>
        </FlexContainer>
      </ModalFooter>
    </ModalContainer>
  );
}
