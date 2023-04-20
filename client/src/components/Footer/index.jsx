import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import { InnerContainer, SectionContainer, NormalText, SubtitleText, TextLink, IconContainer, HorizontalContainer, CopyrightContainer, CopyrightText } from './FooterElements';
import { Marginer } from '../Marginer';
import { Logo } from '../Logo';

import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';


const FooterContainer = styled.div`
background-color: black;

${tw`
min-w-full
pt-5
pb-7
md:px-6
`}

`;


export default function Footer(){
  return (
    <FooterContainer>
      <InnerContainer>
        <SectionContainer>
          <Logo size="40px"/>
          <Marginer vertical="10px"/>
          <NormalText>
            Charicha Gaming aim is to organise Gaming Platform in Nepal.
            From breath-taking Story-driven Gaming to Endless Tournaments and Leagues of every popular e-Sports title there is. We aim to welcome and grow with everyone in this little gaming community of Nepal.
          </NormalText>
        </SectionContainer>


        <SectionContainer>
          <SubtitleText>
            Our Links
          </SubtitleText>
          <Marginer vertical="5px"/>
          <TextLink>
            Home
          </TextLink>
          <TextLink>
            Leagues
          </TextLink>
          <TextLink>
            Tourneys
          </TextLink>
          <TextLink>
            About
          </TextLink>                                  
        </SectionContainer>


        <SectionContainer>
          <SubtitleText>
            Other Links
          </SubtitleText>
          <Marginer vertical="5px"/>
          <TextLink>
            Charicha
          </TextLink>
          <TextLink>
            Charicha Institute
          </TextLink>
          <TextLink>
            Charicha Productions
          </TextLink>
          <TextLink>
            Charicha Store
          </TextLink>
          <TextLink>
            FAQ
          </TextLink>
          <TextLink>
            Support
          </TextLink>
          <TextLink>
            About Us
          </TextLink>          
        </SectionContainer>


        <SectionContainer>
          <SubtitleText>
            Contacts
          </SubtitleText>
          <Marginer horizontal="10px"/>          
          <HorizontalContainer>
            <IconContainer>
              <FaPhoneAlt/>
            </IconContainer>
            <Marginer horizontal="10px"/>
            <NormalText>
              +977 980-7311087
            </NormalText>
          </HorizontalContainer>
          <Marginer vertical="10px"/>
          <HorizontalContainer>
            <IconContainer>
              <FaEnvelope/>
            </IconContainer>
            <Marginer horizontal="10px"/>
            <NormalText>
              charichagaming@gmail.com
            </NormalText>
          </HorizontalContainer>          
        </SectionContainer>



      </InnerContainer>
      <Marginer vertical="20px"/>
      <CopyrightContainer>
        <CopyrightText>
          Copyright &copy; Charicha 2021 All Rights Reserved.
        </CopyrightText>
      </CopyrightContainer>

    </FooterContainer>
  );
} 
