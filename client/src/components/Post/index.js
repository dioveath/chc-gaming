import styled from 'styled-components';
import tw from 'twin.macro';
import {
  NormalText,
  BoldText
} from '../Text';

import { AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import { IoMdShareAlt } from 'react-icons/io';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';


const PostContainer = styled.div`
${tw`
flex
flex-col
gap-4
`}
`;

const MediaContainer = styled.div`
${tw`
rounded-t-md
overflow-hidden
`}
`;

const DescriptionContainer = styled.div`
${tw`
px-4
py-2
`}
`;

const PostStatusContainer = styled.div`
${tw`
flex
gap-4
`}
`;

const PostCardContainer = styled.div`
${tw`
rounded-md
// bg-[#141414]
bg-black
overflow-hidden
`}
`;

const AvatarContainer = styled.div`
${tw`
rounded-full
overflow-hidden
`}
`;

const InteractableContainer = styled.div`
${tw`
flex
justify-around
`}
`;

const StatusContainer = styled.div`
${tw`
flex
flex-col
`}
`;

const SmallText = styled.p`
${tw`
text-xs
font-light
text-white
`}
`;

const FlexContainer = styled.div`
${tw`
flex
`}

gap: ${props => props.gap || '0.25rem'}
`;

const StatsContainer = styled.div`
${tw`
flex
justify-between
px-4
py-2
`}
`;

const CardButton = styled.button`
${tw`
w-full
flex
gap-2
py-2
justify-center
bg-[#383838]
cursor-pointer
hover:bg-[#222222]
`}
`;

export default function Post(){
  
  return (
    <PostContainer>
      <PostStatusContainer>
        <AvatarContainer>
          <img alt="" src="assets/images/jayvai.png"/>
        </AvatarContainer>
        <StatusContainer>
          <FlexContainer>
            <BoldText> IceRush </BoldText>
            <NormalText> clipped in </NormalText>
            <BoldText> FIFA 22 </BoldText>
          </FlexContainer>
          <SmallText> 5 mins ago </SmallText>
        </StatusContainer>
      </PostStatusContainer>

      <PostCardContainer>
        <MediaContainer>
          <img alt="" src="assets/images/celebration.jpg"
               width="600px" height='300px'
               objectFit='cover'/>
        </MediaContainer>
        
        <DescriptionContainer>
          <BoldText> Wonder Goal </BoldText>
        </DescriptionContainer>
        <StatsContainer>
          <FlexContainer>
            <AiFillHeart color='red'/> <SmallText> 3.2 LIkes </SmallText>
          </FlexContainer>
          <FlexContainer gap='1rem'>
            <SmallText> 12.8K Views </SmallText>
            <SmallText> 1.2K Comments </SmallText>
            <SmallText> 394K Shares </SmallText>                        
          </FlexContainer>          
        </StatsContainer>
        <InteractableContainer>
          <CardButton>
            <AiFillHeart color='red'/> <SmallText> Like </SmallText>            
          </CardButton>
          <CardButton>
            <AiOutlineComment color='royalblue'/> <SmallText> Comment </SmallText>            
          </CardButton>
          <CardButton>
            <IoMdShareAlt color='orange'/> <SmallText> Share </SmallText>            
          </CardButton>
          <CardButton>
            <BsFillBookmarkHeartFill color='pink'/> <SmallText> Save </SmallText>            
          </CardButton>                              
        </InteractableContainer>
      </PostCardContainer>

    </PostContainer>
  );

}
