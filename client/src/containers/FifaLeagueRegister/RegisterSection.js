import React, { useRef } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import axios from 'axios';

import KhaltiCheckout from "khalti-checkout-web";
import { FaPhoneAlt } from 'react-icons/fa';

import FifaLeaguePoster from '../../assets/images/fifa_league_poster.png';
// import FifaS3IntroVideo from '../../assets/videos/fifa_s3_intro.mp4';
import KhaltiLogo from '../../assets/images/khalti_logo.png';

import { Marginer } from '../../components/Marginer';

import APIUrl from '../../config/config.js';

import VideoJs from 'video.js';
import 'video.js/dist/video-js.css';
import Youtube from 'react-youtube';

const RegisterContainer = styled.div`
  background: black;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  border-radius: 5px 5px 5px 5px;
  margin: 100px 100px;
  // overflow: hidden;

@media only screen and (max-width: 768px) { 
  grid-template-columns: 1fr;
  margin: 40px 20px;
}

@media only screen and (max-width: 640px) { 
  margin: 20px 10px;
}

`;

const KhaltiLogoContainer = styled.div`

border: 2px solid #BD1FCD;
border-radius: 10px;

img { 
width: 200px;
height: auto;
object-fit: cover;
}
`;

const LeftContainer = styled.div`
`;

const LeaguePosterContainer = styled.div`
min-width: 80vw;
height: 100%;
iframe { 
width:100%;
height: 100%;
aspect-ratio: 16/9;
}

img { 
height: 400px;
object-fit: cover;
}
`;

const RightContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding-bottom: 50px;
`;

const TitleContainer = styled.div`
background-color: #BD1FCD;
width: 100%;
display: flex;
justify-content: center;
padding: 10px 0px;
` ;

const TitleText = styled.h2`
padding: 0px;
margin: 0px;
color: white;
font-weight: bold; 
`;

const RulesContainer = styled.div`
width: 100%;
display: flex;
justify-content: flex-start;
padding: 10px 30px;
`;

const BodyText = styled.p`
font-size: 12px;
font-weight: normal;
color: white;
`;


const RegisterLeagueButton = styled.button`
background-color: #BD1FCD;
color: #fff;
max-width: 400px;
padding: 8px 30px;
border-radius: 5px;
border: 2px solid #BD1FCD;
transition: all 300ms ease-in-out;
font-weight: bold;

&:hover { 
filter: brightness(1.2);
border: 2px solid #C100C4;
}
`;

const HorizontalContainer = styled.div`
display: flex;
align-items: center;
background-color: #BD1FCD;
`;

export const IconContainer = styled.div`
font-size: 20px;
color: white;
display: flex;
align-items: center;
justify-content: center;
border-radius: 100%;
`;

export const PhoneNumberText = styled.p`
font-size: 16px;
color: white;
font-weight: bold;
letter-spacing: 0.5px;
`;


export function RegisterFifaSection(){
  // let YtHtml5 = new YoutubeHtml5({
  //   autoload: true
  // });o

  // let videoEl = useRef(null);
  // if(videoEl.current != null){
  //   let Player = new VideoJs(videoEl.current.id); 
  // }

  let config = {
    "publicKey": "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
          console.log(payload);

          axios.post(`http://${APIUrl.baseUrl}:${APIUrl.port}/fifa/s3/registration/verify`).then((res) => {
            console.log(res);
            // change state 
          });
          
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
  };

  const checkout = new KhaltiCheckout(config);

  return (
    <RegisterContainer>
      <LeaguePosterContainer>
        <Youtube videoId="hKIGnR4LKdM"/>
      </LeaguePosterContainer>
      <RightContainer>
        <TitleContainer>
          <TitleText> REGISTRATION </TitleText>
        </TitleContainer>
        <Marginer vertical="10px"/>
        <TitleText>
          Rules and Guidelines
        </TitleText>
        <Marginer vertical="10px"/>        
        <RulesContainer>
          <BodyText>
            1. Welcome to the Charicha League.
          </BodyText>
        <Marginer vertical="10px"/>          
        </RulesContainer>

        <Marginer vertical="40px"/>

        <KhaltiLogoContainer>
          <img src={KhaltiLogo}/>
        </KhaltiLogoContainer>
        <Marginer vertical="10px"/>

        <RegisterLeagueButton onClick={() => checkout.show({amount: 1000}) }> Pay and Register with Khalti </RegisterLeagueButton>

        <Marginer vertical="5px"/>
        <TitleText>
          or Call Us
        </TitleText>
        <Marginer vertical="5px"/>
        
        <RegisterLeagueButton>
          <HorizontalContainer>
            <IconContainer>
              <FaPhoneAlt/>
            </IconContainer>
            <Marginer horizontal="10px"/>
            <PhoneNumberText>
            +977 980-7311087
            </PhoneNumberText>
          </HorizontalContainer>
        </RegisterLeagueButton>

      </RightContainer>
    </RegisterContainer>
  );
}
