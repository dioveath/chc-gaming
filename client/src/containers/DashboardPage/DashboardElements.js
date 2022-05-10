import styled from 'styled-components';
import tw from 'twin.macro';

export const LeftBarContainer = styled.div`
width: 372px;
${tw`
bg-[#141414]
rounded-md
shadow-md
max-w-sm
`
}`;

export const ProfileContainer = styled.div`
width: 96px;
${tw`
rounded-full
shadow-md
overflow-hidden
flex
`}
`;

export const FlexContainer = styled.div`
${tw`
flex
`}
${props => (props.direction === 'col' 
|| props.direction === 'column') && tw`flex-col`}

justify-content: ${props => props.justify || 'flex-start'};
align-items: ${props => props.align || 'flex-start'};
`;

export const ProfileStatsContainer = styled.div`
${tw`
flex
bg-[#BE2222]
py-4
px-6
justify-around
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


export const MenuContainer = styled.div`
${tw`
px-2
py-4
flex
flex-col
`}
`;

export const MenuButtonContainer = styled.div`
${tw`
px-6
py-4
flex
items-center
rounded-md
shadow-sm
bg-transparent
transition-all
cursor-pointer

hover:bg-gray-600
`}
`;
