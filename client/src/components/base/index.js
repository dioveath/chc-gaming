import styled from 'styled-components';
import tw from 'twin.macro';

export const FlexContainer = styled.div.attrs(props => ({
  className: props.className
}))`
${tw`
flex
`}
${props => (props.direction === 'col'
|| props.direction === 'column') && tw`flex-col`}

background: ${props => props.bg || 'initial'};
width: ${props => props.w || props.width || 'auto'};
height: ${props => props.h || props.height || 'auto'};
justify-content: ${props => props.justify || 'flex-start'};
align-items: ${props => props.align || 'flex-start'};
gap: ${props => props.gap || '0' };
padding: ${props => props.pad || '0'};

`;

export const WrapContainer = styled(FlexContainer)`
${tw`
flex-wrap
`}
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
