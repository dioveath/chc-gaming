import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';


import CHCLogoImg from '../../assets/images/chc_gaming_logo.png';

const LogoContainer = styled.div`
  ${tw`
flex
items-center
justify-center
  `}
`;

const LogoText = styled.div`
  ${tw`
    text-xl
    md:text-2xl
    font-bold
    text-black
    m-1
   `}
`;


const Image = styled.div`
   width: auto;
   ${tw`
ml-4
sm:ml-0
   `}

   
   img { 
    width: ${ props => props.size || "40px"};
    height: auto;
   }
`;

export function Logo(props){
  return (
    <Image size={props.size}>
      <img src={CHCLogoImg} alt="Charicha Gaming Logo"/>
    </Image>
  );
  // return <LogoContainer>
  //          <Image size={props.size}>
  //            <img src={CHCLogoImg} alt="Charicha Gaming Logo"/>
  //          </Image>
  //        </LogoContainer>;
}
