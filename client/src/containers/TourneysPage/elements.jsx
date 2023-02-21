import styled from 'styled-components';
import tw from 'twin.macro';

export const PageContainer = styled.div`
  background: radial-gradient(#1D0207, #0D0000);
${tw`
flex
flex-col
w-screen
h-screen
items-center
overflow-x-hidden
`}

`;

export const TourneysContainer = styled.div`
${tw`
p-4
`}
`;

export const TourneyCardContainer = styled.div`
${tw`
max-w-sm
rounded-md
overflow-hidden
shadow-md
text-white
bg-darkred
transition-all
hover:cursor-pointer
hover:bg-woodred
`}`;

export const TextContainer = styled.div`
${tw`
px-6 py-4
`}
`;

export const TitleText = styled.p`
${tw`
font-bold text-xl mb-2
`}
`;

export const DescriptionText = styled.p`
${tw`
text-gray-700 text-base
`}
`;


