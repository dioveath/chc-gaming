import styled from 'styled-components';
import tw from 'twin.macro';
import {
  BoldText
} from '../../components/Text';
import AdCard from './AdCard';

const SectionContainer = styled.div`
min-width: 372px;
${tw`
flex
flex-col
gap-4
bg-black
// bg-[#141414]
px-4
py-4
rounded-md
`}
`;



export default function RightBarSection(){
  return (
    <SectionContainer>
      <BoldText> Sponsored </BoldText>
      <AdCard/>
    </SectionContainer>
  );
}
