import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import axios from 'axios';

import { BoldText, Text } from '../../../../components/Text';
import { FlexContainer } from '../../../../components/base';
import Post from '../../../../components/Post';

import config from '../../../../config/config';
import { setClips, pending, error } from '../../../../redux/ClipSlice';

import Skeleton from 'react-loading-skeleton';
import { MdError } from 'react-icons/md';


const HomePanelContainer = styled.div`
${tw`
flex
flex-col
gap-6
my-4
`}
`;

const AllBadgesContainer = styled.div`
${tw`
flex
flex-wrap
gap-2
`}
`;

const BadgeContainer = styled.div`
${tw`
px-12
py-1
rounded-3xl
text-sm
text-white
font-medium
bg-[#BE2222]
border border-transparent
transition-all
`}
${props => props.outlined && tw`bg-transparent border-white`}
`;

const CenterContainer = styled.div`
${tw`
grid
place-items-center
`}
`;

export default function HomePanel(){
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {
    allClips: { clips, pagination },
    isPending,
    isError
  } = useSelector((state) => state.clip);  

  useEffect(() => {
    
    (async () => {
      dispatch(pending());

      try {
        const options = {
          method: 'GET',
          url: `${config.serverUrl}/api/v1/clips`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.accessToken
          },
          params: {
            privacy: 'public',
            author: { 'ne': auth.userId }
          },
          paramsSerializer: (params) => {
            return Object.entries(params).map(([key, value]) => {
              if(typeof value !== 'object')
                return `${key}=${value}`;
              return Object.entries(value).map(([k, v]) => `${key}[${k}]=${v}`).join('&');
            }).join('&');
            // return params;
          }
        };

        const response = await axios.request(options);
        dispatch(setClips(response.data.clips));
        
      } catch(e){
        console.log(e);
        dispatch(error(e.response ? e.response.data.errorList : e.message));
      }

    })();

  }, [auth.accessToken, dispatch, auth.userId]);
  
  return (
    <HomePanelContainer>

      <BoldText> Highlights </BoldText>
      <AllBadgesContainer>
        <BadgeContainer>
          FIFA 
        </BadgeContainer>
        <BadgeContainer outlined>
          PUBG Mobile 
        </BadgeContainer>
        <BadgeContainer outlined>
          DOTA 2
        </BadgeContainer>                        
      </AllBadgesContainer>

      {
        isPending ?
	  <Skeleton count={10}/>
          : clips.map((clip) => {
            return <Post clip={clip}/>;
          })
      }

      { isError &&
        <CenterContainer>
	  <FlexContainer direction='col'
                                    align='center'
                                    justify='center'>
                       <MdError size={40} color='white'/>
		       <Text className="text-xl fomt-semibold"> Something went wrong!</Text>                       
                     </FlexContainer>        
      </CenterContainer>
    }

    </HomePanelContainer>
  );

}
