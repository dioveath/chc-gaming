import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

import Skeleton from 'react-loading-skeleton';

import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../Responsive';
import axios from 'axios';
import config from '../../config/config';

import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';


const PostContainer = styled.div.attrs((props) => ({
  className: props.className
}))`
  ${tw`
flex
flex-col
gap-4
max-w-lg
`}
`;

const MediaContainer = styled.div`
${tw`
grid
place-items-center
rounded-t-md
overflow-hidden
max-h-96
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
h-12
w-12
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

export default function Post({ clip }){
  const isMobile = useMediaQuery({maxWidth: SCREENS.sm});
  const auth = useSelector(state => state.auth);

  const [ author, setAuthor ] = useState(null);
  const [isLoading, setLoading ] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    
    (async () => {
      
      const options = {
        method: 'GET',
        url: `${config.serverUrl}/api/v1/users/${clip.author}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.accessToken
        }
      };

      try {
        const response = await axios.request(options);
        setAuthor(response.data.user);
        setLoading(false);
      } catch(e){
        console.log(e);
        setError(e.message);
        setLoading(false);
      }

    })();

  }, [auth.accessToken, clip.author]);

  return (
    isError ? <PostContainer>
                <BoldText> Something went wrong</BoldText>
              </PostContainer> :
    <PostContainer>
      <PostStatusContainer>
        <AvatarContainer>
          { isLoading && <Skeleton circle={true}/>}
          { !isLoading && <img alt="" src={author.profile_link}/>}
        </AvatarContainer>
        <StatusContainer>
          <FlexContainer gap='0.4rem'>
            { isLoading && <Skeleton/>}
            { !isLoading && <BoldText> {author.gaming_name} </BoldText>}
            <NormalText> clipped </NormalText>
            <BoldText> { clip.title } </BoldText>
          </FlexContainer>
          <SmallText> 5 mins ago </SmallText>
        </StatusContainer>
      </PostStatusContainer>

      <PostCardContainer>
        <MediaContainer>
	  <Player controls fluid={false} width={'100%'} height={320}>
            <source src={clip.video_url}/>
            <BigPlayButton position='center'/>
          </Player>
        </MediaContainer>
        
        <DescriptionContainer>
          <BoldText> { clip.title } </BoldText>
        </DescriptionContainer>
        <StatsContainer>
          <FlexContainer
            gap='0.2rem'
            direction={isMobile && 'column'}
            align={isMobile && 'center'}>
            <AiFillHeart color='red'/> <SmallText> {clip.likes.length} Likes </SmallText>
          </FlexContainer>
          <FlexContainer gap={ isMobile ? '0.2rem' : '2rem'}
                         direction={isMobile && 'column'}
                         align='flex-end'>
            <SmallText> 0 Views </SmallText>
            <SmallText> { clip.comments.length } Comments </SmallText>
            <SmallText> 0 Shares </SmallText>                        
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
