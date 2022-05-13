import styled from 'styled-components';
import tw from 'twin.macro';

export const LeftBarContainer = styled.div`
width: ${props => props.active ? '372px' : '60px'};
position: ${props => props.active ? 'fixed' : 'sticky'};
left: 0;
top: 0;
${tw`
bg-black
shadow-md
transition-all
h-screen
`
}`;

export const ProfileContainer = styled.img`
width: ${props => props.active ? '80px' : '50px'};
height: ${props => props.active ? '80px' : '50px'};
${tw`
rounded-full
overflow-hidden
object-cover
shadow-md
border-2 border-purple-800
transition-all
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
transition-all
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
w-full
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
transition-all
`}
`;
