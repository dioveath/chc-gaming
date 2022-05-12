import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

const BaseButton = styled(Link)`
${tw`
w-full
flex
justify-center
items-center
px-10
py-2
outline-none
rounded-md
text-white
text-xs
md:text-sm
font-semibold
border-transparent
border-2
border-solid
focus:outline-none
transition-all
duration-300
ease-in-out
hover:border-2
hover:border-red-900
`}

${props => props.size === 'large' && css`
${tw`
px-40
py-5
text-xl
text-black
`}
`}

`;



const OutlineButton = styled(BaseButton)`
    background-color: #220303;
${tw`
hover:bg-transparent
hover:border-red-400
hover:border-2
`}
`;


const FilledButton = styled(BaseButton)`
background-color: #B71B1B;
${tw`
hover:bg-gray-900
hover:border-2
hover:border-gray-700
`}
`;



export default function Button(props){
  if(props.type === "outlined")
    return <OutlineButton size={props.size} to={ props.disabled ? '#' : props.to ? props.to : "/" }  onClick={props.onClick}>
             { props.text || props.children }
           </OutlineButton>;
  return (
    <FilledButton to={ props.to ? props.to : "/" } onClick={props.onClick}>
      { props.text || props.children }
    </FilledButton>
  );
}
