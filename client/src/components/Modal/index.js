import { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import Button from "../Button";
import { FlexContainer } from "../base";

const ModalContainer = styled.div.attrs((props) => ({
  className: props.className,
}))`
  width: clamp(50%, 700px, 90%);
  height: min(30%, 200px);

  ${tw`
fixed
top-0
right-0
bottom-0
left-0
m-auto
flex
flex-col
justify-center
items-center
bg-red-700/60
rounded-md
shadow-2xl
overflow-hidden
z-30
`}
`;

const ModalOverlay = styled.div.attrs((props) => ({
  className: props.className,
}))`
  ${tw`
fixed
flex
justify-center
items-center
top-0
left-0
w-full
h-full
bg-gray-700/80
z-20
`}
`;

export const ModalHeader = styled.div.attrs((props) => ({
  className: props.className,
}))`
  ${tw`
flex
justify-center
items-center
w-full
h-14
bg-black
`}
`;

export const ModalBody = styled.div`
  ${tw`
h-full
`}
`;

export function Modal({ isOpen, onClose, actionHandler, children }) {
  return (
    <>
      <ModalContainer className={!isOpen && "hidden"}>
        <FlexContainer w="100%" h="100%">
          {children}
        </FlexContainer>
        <FlexContainer
          className="w-full p-4 justify-center items-center bottom-0"
          gap="1rem"
        >
          <Button w="100%" onClick={actionHandler}>
            Delete
          </Button>
          <Button w="100%" type="outlined" onClick={onClose}>
            Cancel
          </Button>
        </FlexContainer>
      </ModalContainer>
      <ModalOverlay onClick={onClose} className={!isOpen && "hidden"} />
    </>
  );
}

export const useModal = () => {
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };

  return { isOpen, onClose, onOpen };
};
