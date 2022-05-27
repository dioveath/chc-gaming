import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';


import { BoldText, Text } from '../../../components/Text';
import { FlexContainer } from '../../../components/base';
import Post from '../../../components/Post';

import { useGetClipsQuery } from '../../../redux/ClipApi';

import Skeleton from 'react-loading-skeleton';
import { MdError } from 'react-icons/md';


const Container = styled.div`
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
  const { data, error, isLoading, isFetching } = useGetClipsQuery();
  const auth = useSelector(state => state.auth);

  return (
    <Container>

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
        (isFetching || isLoading || !data?.clips?.clips) ?
      	  <Skeleton count={10}/>
        : data.clips.clips.filter(c => c.author !== auth.userId).map((clip) => {
          return <Post clip={clip}/>;
        })
      }

      { error &&
        <CenterContainer>
	  <FlexContainer direction='col'
                                    align='center'
                                    justify='center'>
                       <MdError size={40} color='white'/>
		       <Text className="text-xl fomt-semibold"> Something went wrong!</Text>                       
                     </FlexContainer>        
      </CenterContainer>
    }

    </Container>
  );

}
