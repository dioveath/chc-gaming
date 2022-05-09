import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import axios from 'axios';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { RegisterFifaSection } from './RegisterSection';
import { setSelectedTourney } from '../../redux/TourneySlice.js';
import config from '../../config/config.js';
import NotFoundPage from '../../containers/NotFoundPage';

const PageContainer = styled.div`
  background: radial-gradient(#1D0207, #0D0000);
${tw`
flex
flex-col
w-screen
h-screen
items-center
`}

`;

export function FifaLeagueRegister(props){
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { tourneyId } = useParams();

  useEffect(() => {

    (async() => {

      try {
        const options = {
          method: 'GET',
          url: `${config.serverUrl}/api/v1/tourneys/${tourneyId}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.accessToken
          },
        };

        const response = await axios.request(options);
        dispatch(setSelectedTourney(response.data.tourney));
      } catch (e){
        console.log(e);
      }

    })();
    
  });

  const { selectedTourney } = useSelector(state => state.tourney);

  return (
    selectedTourney !== null ?
      <PageContainer>
          <Navbar/>
          <RegisterFifaSection/> 
          <Footer/>
        </PageContainer>
    : <NotFoundPage/>
  );
  
}


export default FifaLeagueRegister;
