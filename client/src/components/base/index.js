import styled from 'styled-components';
import tw from 'twin.macro';


export const FlexContainer = styled.div`
${tw`
flex
`}
${props => (props.direction === 'col' 
|| props.direction === 'column') && tw`flex-col`}

background: ${props => props.bg || 'initial'};
width: ${props => props.w || 'auto'};
height: ${props => props.h || 'auto'};
justify-content: ${props => props.justify || 'flex-start'};
align-items: ${props => props.align || 'flex-start'};
gap: ${props => props.gap || '0' };
padding: ${props => props.pad || '0'};

`;

export const NormalText = styled.p`
${tw`
text-sm
text-white
`}
`;

export const BoldText = styled.p`
${tw`
text-sm
text-white
font-bold
`}
`;
