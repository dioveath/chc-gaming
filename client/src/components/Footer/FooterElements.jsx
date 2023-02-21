import styled, { css } from 'styled-components';
import tw from 'twin.macro';


export const InnerContainer = styled.div`
display: flex;
flex-wrap: wrap;
`;


export const SectionContainer = styled.div`
min-width: 300px;
max-width: 400px;
padding: 10px 40px; 
display: flex;
flex-direction: column;
`;

export const NormalText = styled.p`
color: white;
font-size: 12px;
font-weight: thin;
letter-spacing: 0.3px;
`;

export const SubtitleText = styled.h4`
padding: 0px;
margin: 0px;
// color: rgb(183,27,27);
color: white;
font-weight: bold;
font-size: 18px;
`;


export const TextLink = styled.a`
font-size: 13px;
color: rgb(200, 200, 200);
font-weight: 500;
text-decoration: none;
cursor: pointer;
margin-bottom: 6px;

&:hover { 
filter: brightness(2);
}

`;

export const IconContainer = styled.div`
font-size: 16px;
color: black;
background-color: white;
display: flex;
align-items: center;
justify-content: center;
padding: 5px;
border-radius: 100%;
`;

export const HorizontalContainer = styled.div`
display: flex;
align-items: center;
`;

export const CopyrightContainer = styled.div`
display: flex;
justify-content: center;
`;

export const CopyrightText = styled.small`
color: white;
font-size: 11px;
`;
