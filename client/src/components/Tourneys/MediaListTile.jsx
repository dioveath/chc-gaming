import styled from 'styled-components';
import tw from 'twin.macro';

import {
  FlexContainer
} from '../base';

import {
  NormalText
} from '../Text';


import { RiEditCircleFill } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';

const ListTileImage = styled.img`
width: ${props => props.w || '64px'};
height: ${props => props.h || '64px'};
object-fit: scale-down;
${tw`
`}
`;



const ActionButtonContainer = styled.div`
${tw`
p-2
flex
justify-center
items-center
rounded-md
shadow-md
bg-[#922626]
`}

&:hover { 
filter: brightness(140%);
cursor: pointer;
}
`;


export default function ListMediaTile(){
  return (
    <FlexContainer align='center' justify='space-between' gap='1rem'>
      <ListTileImage src='assets/images/altair.jpg'/>
      <NormalText> 850 x 1332</NormalText>
      <FlexContainer gap='1rem'>
        <ActionButtonContainer>
          <RiEditCircleFill size='24px' color='white'/>
        </ActionButtonContainer>
        <ActionButtonContainer>
          <FaTrashAlt size='24px' color='white'/>
        </ActionButtonContainer>                      
      </FlexContainer>
    </FlexContainer>    
  );
}
