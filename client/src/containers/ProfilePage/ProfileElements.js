import styled from 'styled-components';
import tw from 'twin.macro';


import { CgProfile } from 'react-icons/cg';

export const Container = styled.div`
min-height: 600px;
min-width: 90vw;
margin: 100px 10px;
`;

export const TopContainer = styled.div`
background: black;
min-height: 260px;
display: grid;
grid-template-columns: 1fr;
border-radius: 5px 5px 5px 5px;

@media only screen and (min-width: 768px) { 
grid-template-columns: 1fr 1fr
}

`;


export const PrimaryStatsContainer = styled.div`
display: flex;
grid-template-columns: 1fr 2fr; 
`;


export const Stats1Container = styled.div`
padding: 10px 10px;
`;


export const TitleText = styled.h2`
padding: 0px;
margin: 0px;
color: white;
font-weight: bolder; 
font-size: 18px;
`;


export const SubtitleText = styled.h4`
padding: 0px;
margin: 0px;
color: white;
font-weight: bold;
font-size: 14px;
`;

export const NormalText = styled.p`
color: white;
font-size: 12px;
padding: 2px 0px;
`;


export const ProfileAvatarContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 84px;
height: auto;
padding: 10px 10px;

@media only screen and (min-width: 640px) { 
width: 120px;
}

img { 
object-fit: cover;
border-radius: 3px;
}
`;

export const BasicInformationContainer = styled.div`
min-width: 250px;
padding: 10px 10px;

@media only screen and (min-width: 640px) { 
min-width: 300px;
}

`;


export const InfoTextContainer = styled.div`
display: flex;
// flex-direction: column;
justify-content: space-between;
border-bottom: 1px solid rgba(200,200, 200, 0.3);
border-top: 1px solid rgba(200,200, 200, 0.3);
`;

export const IconTextContainer = styled.div`
display: flex;
`;

export const IconTextTitle = styled.p`
color: white;
font-size: 12px;
font-weight: 600;
`;

export const InformationText = (props) => {
  const InfIcon = props.icon;
  return (
    <InfoTextContainer>
      <IconTextContainer>
        { props.icon && <InfIcon/> }
        <IconTextTitle>
          { props.title }
        </IconTextTitle>
      </IconTextContainer>
      <NormalText>
        { props.info }
      </NormalText>
    </InfoTextContainer>
  );
};


export const BottomContainer = styled.div`
background: black;
min-height: 260px;
`;

export const TitleContainer = styled.div`
background-color: #B71B1B;
width: 100%;
display: flex;
justify-content: center;
padding: 10px 0px;
` ;


