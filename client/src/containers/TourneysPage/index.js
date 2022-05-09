import { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import config from '../../config/config.js';
import { setTourneys } from '../../redux/TourneySlice.js';


const PageContainer = styled.div`
  background: radial-gradient(#1D0207, #0D0000);
${tw`
flex
flex-col
w-screen
h-screen
items-center
overflow-x-hidden
`}

`;


export default function TourneysPage(){
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {

    (async() => {

      try {
        const options = {
          method: 'GET',
          url: `${config.serverUrl}/api/v1/tourneys`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.accessToken
          },
        };

        const response = await axios.request(options);
        dispatch(setTourneys(response.data.tourneys));
      } catch (e){
        console.log(e);
      }

    })();
    
  });

  const { allTourneys } = useSelector(state => state.tourney);

  console.log(allTourneys);

  return (
    <PageContainer>
    </PageContainer>
  );
  
}
