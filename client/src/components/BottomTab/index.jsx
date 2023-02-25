import React, { useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import tw from "twin.macro";

const BottomTabContainer = styled.div`
  ${tw`
w-full
h-full
shadow-2xl

`}
`;
const BottomTabPanelContainer = styled.div`
  ${tw`
w-full
h-full
`}
`;

const BottomTabHeaderContainer = styled.div.attrs((props) => ({
  className: props.className,
}))`
  ${tw`
flex
justify-center
items-center
fixed
z-30
bg-black
gap-2
px-2
py-3

border-green-600
border-t-2
bottom-0
left-0
right-0
overflow-x-scroll
`}
`;

const BottomTabHeader = styled.div`
  text-align: center;
  color: white;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;

  ${tw`
flex
justify-center
items-center

w-16
py-1
text-sm
font-bold
cursor-pointer
`}

  ${(props) =>
    props.active &&
    css`
      border-bottom: 2px solid #b60606;
      ${tw`
`}
    `}
`;

export const BottomTabPanel = (props) => {
  return <BottomTabPanelContainer {...props}> {props.children} </BottomTabPanelContainer>;
};

BottomTabPanel.propTypes = {
  name: PropTypes.string,
};

export function BottomTab(props) {
  const { children } = props;
  let headers = [];

  React.Children.forEach(children, (element) => {
    if (!React.isValidElement(element)) return;
    const { name, headerIcon } = element.props;
    headers.push({ name, headerIcon });
  });

  const [activeTab, setActiveTab] = useState("Lobby");

  return (
    <BottomTabContainer>
      <BottomTabHeaderContainer>
        {headers.map((h) => {
          return (
            <BottomTabHeader
              key={h.name}
              onClick={() => setActiveTab(h.name)}
              {...(h.name === activeTab ? { active: true } : {})}
            >
              <div
                className={`absolute translate-x-full translate-y-full rounded-full bg-transparent w-10 h-10 flex justify-center items-center ${
                  h.name === activeTab && "bg-red-600 animate-pulse"
                }`}
              ></div>
              <div
                className={`rounded-full bg-transparent w-10 h-10 flex justify-center items-center ${
                  h.name === activeTab && "bg-red-800 animate-pulse"
                }`}
              >
                {h.headerIcon}
              </div>
            </BottomTabHeader>
          );
        })}
      </BottomTabHeaderContainer>
      <BottomTabPanelContainer>
        {children.map((e) => {
          return e.props.name === activeTab ? e : <></>;
        })}
      </BottomTabPanelContainer>
    </BottomTabContainer>
  );
}

BottomTab.propTypes = {
  children: function (props, propName, componentName) {
    const prop = props[propName];
    let error = null;
    React.Children.forEach(prop, (child) => {
      if (child.type !== BottomTabPanel) {
        error = new Error(
          "`" + componentName + "` children should be of type `TapPanel`."
        );
      }
    });
    return error;
  },
};
