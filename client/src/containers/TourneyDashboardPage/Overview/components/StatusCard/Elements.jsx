import styled from 'styled-components';
import tw from 'twin.macro';

const CardContainer = styled.div`
${tw`
max-w-md
w-full
bg-black
shadow-md
rounded-md
px-6
py-8
`}
`;

const Badge = styled.div`
${tw`
px-4
py-1
text-sm
text-white
bg-green-500
rounded-md
`}
`;

const ActionsContainer = styled.div`
${tw`
flex
items-center
justify-center
gap-2
`}
`;


const Bar = styled.div`
${tw`
w-full
h-1
rounded-full
bg-blue-300
`}
`;


export { CardContainer, Badge, ActionsContainer, Bar};
