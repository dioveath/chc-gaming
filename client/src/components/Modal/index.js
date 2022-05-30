import { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import Button from '../Button';
import { FlexContainer } from '../base';



const ModalContainer = styled.div.attrs(props => ({
  className: props.className
}))`
${tw`
w-1/2
h-1/4
fixed
top-1/4
left-1/4
bg-red-700/60
rounded-md
shadow-2xl
overflow-hidden
z-30
`}
`;

const ModalOverlay = styled.div.attrs(props => ({
  className: props.className
}))`
${tw`
fixed
top-0
left-0
w-full
h-full
bg-transparent
z-20
`}
`;

export const ModalHeader = styled.div.attrs(props => ({
  className: props.className
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

export function Modal({ isOpen, onClose, actionHandler, children }){
  return (
    <>
      <ModalContainer className={!isOpen && "hidden"}>
        { children }
	<FlexContainer className='w-full p-4 justify-center items-center absolute bottom-0' gap='1rem'>
	  <Button w='100%' onClick={actionHandler}> Delete </Button>
	  <Button w='100%' type='outlined' onClick={onClose}> Cancel </Button>                  
        </FlexContainer>
      </ModalContainer>
      <ModalOverlay onClick={onClose} className={!isOpen && "hidden"}/>
    </>
  );

}


export const useModal = () => {
  const [ isOpen, setOpen ] = useState(false);

  const onOpen = () => {
    setOpen(true);
    console.log("fsadaefasievn");
  };

  const onClose = (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    console.log("fsafd");
    setOpen(false);
  };

  return { isOpen, onClose, onOpen };
};
