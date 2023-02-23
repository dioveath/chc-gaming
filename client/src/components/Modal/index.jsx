import { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import Button from "../Button";
import { FlexContainer } from "../base";
import { motion } from "framer-motion";

const ModalContainer = styled(motion.div).attrs((props) => ({
  className: props.className,
}))`
  width: clamp(50%, 700px, 90%);
  height: min(50%, 400px);

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
bg-black/90
rounded-md
shadow-2xl
overflow-hidden
z-30
`}
`;

const ModalOverlay = styled(motion.div).attrs((props) => ({
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
py-3
bg-red-800
font-bold
`}
`;

export const ModalBody = styled.div`
  ${tw`
h-full
w-full
p-4
overflow-scroll
`}
`;

export const ModalFooter = styled.div`
  ${tw`
w-full
p-4
flex
justify-center
items-center
bottom-0
gap-1
`}
`;

export function Modal({ isOpen, onClose, children }) {
  if(!isOpen) return <></>
  return (
    <>
      <ModalContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </ModalContainer>
      <ModalOverlay onClick={onClose}/>
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
