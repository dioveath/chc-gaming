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


export {
  NormalText,
  BoldText
};
