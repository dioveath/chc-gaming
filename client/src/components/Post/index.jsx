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
import { useUpdateClipMutation, useGetClipQuery } from '../../redux/ClipApi';

import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';

import { toast } from 'react-toastify';


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
relative
h-12
w-12
bg-black
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

export const ProfileContainer = styled.img`
${tw`
w-full
h-full
rounded-full
overflow-hidden
object-cover
shadow-md
border-2 border-purple-800
transition-all
`}

`;


export default function Post({ clip: propClip, innerRef }){
  const isMobile = useMediaQuery({maxWidth: SCREENS.sm});
  const auth = useSelector(state => state.auth);

  const [ author, setAuthor ] = useState(null);
  const [isLoading, setLoading ] = useState(true);
  const [isError, setError] = useState(false);
  const [updateClip, { isLoading: isUpdating }] = useUpdateClipMutation();

  const { data, error } = useGetClipQuery(propClip.id);
  const clip = data?.clip || propClip;

  const isLikedByCurrentUser =  clip.likes.findIndex(e => e === auth.userId) !== -1;
  const clipTime = Date.now() - new Date(clip.createdAt).getTime();
  
  let seconds = Math.floor(clipTime/1000);
  let minutes = Math.floor(clipTime/(1000*60));
  let hours = Math.floor(clipTime/(1000*60*60));
  let days = Math.floor(clipTime/(1000*60*60*24));
  let agoTime = (days ? days + " days" : hours ? hours + " hours" : minutes ? minutes + " minutes" : seconds + " seconds") + " ago";

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
    isError ? <PostContainer ref={innerRef}>
                <BoldText> Something went wrong</BoldText>
              </PostContainer> :
    <PostContainer ref={innerRef}>
      <PostStatusContainer>
        <AvatarContainer>
          { isLoading && <Skeleton height={'80px'}
                                    width={'80px'}
                                    style={{
                                      "position": "absolute",
                                      "top": "-2px"
                                    }}/>}
	  { !isLoading && <ProfileContainer src={author.profile_link}/>}
        </AvatarContainer>
        <StatusContainer>
          <FlexContainer gap='0.4rem'>
            { isLoading && <Skeleton/>}
            { !isLoading && <BoldText> {author.gaming_name} </BoldText>}
            <NormalText> clipped </NormalText>
            <BoldText> { clip.title } </BoldText>
          </FlexContainer>
          <SmallText> {agoTime} </SmallText>
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
            <AiFillHeart color='red' size={Math.min(clip.likes.length + 10, 25)}/> <SmallText> {clip.likes.length} Likes </SmallText>
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
          <CardButton onClick={() => {
            let likesCopy = [...(clip.likes)];
            const index = likesCopy.findIndex(e => e === auth.userId);
            if(index === -1)
              likesCopy.push(auth.userId);
            else
              likesCopy.splice(index, 1);

            toast.promise(updateClip({id: clip.id, likes: likesCopy }).unwrap(), {
              pending: likesCopy.length > clip.likes.length ? "Liking.." : "Unliking.." ,
              success: likesCopy.length > clip.likes.length ? "Liked" : "Unliked" ,
              error: "Couldn't like the clip!"
            });
          }}>
            <AiFillHeart color={ isLikedByCurrentUser ? 'red' : 'white'} size={20}/>
            { isMobile || <SmallText> Like </SmallText> }
          </CardButton>
          <CardButton onClick={() => {
            toast.info("Feature not available yet!");
          }}>
            <AiOutlineComment color='royalblue' size={20}/>
            { isMobile || <SmallText> Comment </SmallText> }
          </CardButton>
          <CardButton onClick={() => {
            toast.info("Feature not available yet!");
          }}>
            <IoMdShareAlt color='orange' size={20}/>
            { isMobile || <SmallText> Share </SmallText> }
          </CardButton>
          <CardButton onClick={() => {
            toast.info("Feature not available yet!");
          }}>
            <BsFillBookmarkHeartFill color='pink' size={18}/>
            { isMobile || <SmallText> Save </SmallText> }
          </CardButton>                              
        </InteractableContainer>
      </PostCardContainer>

    </PostContainer>
  );

}
