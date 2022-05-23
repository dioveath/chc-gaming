import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { FlexContainer } from "./../base";

const BaseButton = styled(Link)`
  ${tw`
flex
justify-center
items-center
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

width: ${props => props.w || "auto" };
height: ${props => props.h || "auto" };

  ${(props) =>
    props.pad ||
    tw`px-10 py-2`}

${(props) =>
    props.size === "large" &&
    css`
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
  background-color: ${props => props.disabled ? tw`bg-gray-900` : '#b71b1b'};
  ${tw`
hover:bg-gray-800
hover:border-2
hover:border-gray-700
`}
`;

export default function Button({
  type,
  to,
  text,
  size,
  onClick,
  disabled,
  children,
  ...props
}) {
  if (type === "outlined")
    return (
      <OutlineButton
        size={size}
        to={disabled ? "#" : (to ? to : "#")}
        onClick={disabled ? () => {} : onClick}
        disabled={disabled}
        {...props}
      >
        {text || children}
      </OutlineButton>
    );
  return (
    <FilledButton to={disabled ? "#" : (to ? to : "#")} onClick={disabled ? () => { } : onClick} disabled={disabled} {...props}>
      {text || children}
    </FilledButton>
  );
}


export const SubmitButton = styled.button`
  color: #fff;

  width: 100%;
  font-size: 15px;
  font-weight: 600;
  padding: 7px 20px;

  border: none;
  border-radius: 4px;

  cursor: pointer;
  transition: all 240ms ease-in-out;
  background: rgb(183, 27, 27);
  background: linear-gradient(
    180deg,
    rgba(183, 27, 27, 1) 36%,
    rgba(120, 0, 0, 1) 100%
  );

  z-index: 100;

  &:hover {
    filter: brightness(1.3);
  }
`;

export const NormalButton = styled.button.attrs(props => ({
  className: props.className,
}))`

${tw`
flex
justify-center
items-center
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

`;

export function IconButton({ icon, gap, ...props }) {
  return (
    <NormalButton {...props}>
      <FlexContainer justify="center" align="center" gap={gap || "1rem"}>
        {icon} {props.children}
      </FlexContainer>
    </NormalButton>
  );
}
