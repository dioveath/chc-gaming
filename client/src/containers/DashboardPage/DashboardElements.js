import styled from 'styled-components';
import tw from 'twin.macro';

export const LeftBarContainer = styled.div`
min-width: 372px;
${tw`
bg-black
// bg-[#141414]
rounded-md
shadow-md
`
}`;

export const ProfileContainer = styled.img`
width: 100px;
height: 100px;
${tw`
rounded-full
overflow-hidden
object-cover
shadow-md
border-4 border-purple-800
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
gap: ${props => props.gap || '0' };
padding: ${props => props.pad || '0'};

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
