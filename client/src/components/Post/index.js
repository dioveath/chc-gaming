import styled from 'styled-components';
import tw from 'twin.macro';
import {
  NormalText,
  BoldText
} from '../Text';
import {
  FlexContainer
} from '../base';

import { AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import { IoMdShareAlt } from 'react-icons/io';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';

import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../Responsive';

const PostContainer = styled.div`
${tw`
flex
flex-col
gap-4
max-w-lg
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
  const isMobile = useMediaQuery({maxWidth: SCREENS.sm});
  console.log(isMobile);
  
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
               objectFit='cover'/>
        </MediaContainer>
        
        <DescriptionContainer>
          <BoldText> Wonder Goal </BoldText>
        </DescriptionContainer>
        <StatsContainer>
          <FlexContainer
            direction={isMobile && 'column'}
            align={isMobile && 'center'}>
            <AiFillHeart color='red'/> <SmallText> 3.2 LIkes </SmallText>
          </FlexContainer>
          <FlexContainer gap={ isMobile ? '0.2rem' : '2rem'}
                         direction={isMobile && 'column'}
                         align='flex-end'>
            <SmallText> 12.8K Views </SmallText>
            <SmallText> 1.2K Comments </SmallText>
            <SmallText> 394K Shares </SmallText>                        
          </FlexContainer>          
        </StatsContainer>
        <InteractableContainer>
          <CardButton>
            <AiFillHeart color='red'/>
            { isMobile || <SmallText> Like </SmallText> }
          </CardButton>
          <CardButton>
            <AiOutlineComment color='royalblue'/>
            { isMobile || <SmallText> Comment </SmallText> }
          </CardButton>
          <CardButton>
            <IoMdShareAlt color='orange'/>
            { isMobile || <SmallText> Share </SmallText> }
          </CardButton>
          <CardButton>
            <BsFillBookmarkHeartFill color='pink'/>
            { isMobile || <SmallText> Save </SmallText> }
          </CardButton>                              
        </InteractableContainer>
      </PostCardContainer>

    </PostContainer>
  );

}
