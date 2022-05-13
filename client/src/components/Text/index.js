import styled from 'styled-components';
import tw from 'twin.macro';

const NormalText = styled.p`
${tw`
text-sm
text-white
`}
`;

const BoldText = styled.p`
${tw`
text-sm
text-white
font-bold
`}
`;

const Text = styled.p`
font-size: ${props => props.fontSize || '1rem'};
color: ${props => props.color || '#ffefef'};
font-weight: ${props => props.weight || props.fontWeight || '400'};
`;


export {
  Text,
  NormalText,
  BoldText
};
