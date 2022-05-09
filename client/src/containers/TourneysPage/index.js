import { useEffect } from 'react';


import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import config from '../../config/config.js';
import { setTourneys } from '../../redux/TourneySlice.js';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Marginer } from '../../components/Marginer';

import {
  PageContainer,
  TourneysContainer,
  TourneyCardContainer,
  TextContainer,
  TitleText,
  DescriptionText
} from './elements.js';


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
    
  }, [auth.accessToken, dispatch]);

  const { allTourneys } = useSelector(state => state.tourney);

  return (
    <PageContainer>
      <Navbar/>
      <Marginer vertical='4rem'/>
      <TourneysContainer>
        { allTourneys.map((t) => {
          return <Link to={'/tourneys/' + t.id}>
               <TourneyCardContainer>
                 <TextContainer>
                   <TitleText>
                     { t.title }
                   </TitleText>
                   <DescriptionText>
                     { t.description }
                   </DescriptionText>                   
                 </TextContainer>
               </TourneyCardContainer>          
             </Link>;
        })}
      </TourneysContainer>
      <Footer/>
    </PageContainer>
  );
  
}
