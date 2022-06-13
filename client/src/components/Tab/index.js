import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

const TabContainer = styled.div`
${tw`
w-full
h-full
shadow-2xl

`}
`;
const TabPanelContainer = styled.div`
${tw`
w-full
h-full
`}
`;

const TabHeaderContainer = styled.div.attrs(props => ({
  className: props.className
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

const TabHeader = styled.div`
text-align: center;
color: white;
border-bottom: 2px solid transparent;
transition: all .2s ease;

${tw`
flex
justify-center
items-center

w-16
py-2
px-4
text-sm
font-bold
cursor-pointer
`}

${props => props.active && css`
border-bottom: 2px solid #B60606;
${tw`
`}
`}

`;

export const TabPanel = (props) => {
  return <TabPanelContainer { ...props}> { props.children } </TabPanelContainer>;
};

TabPanel.propTypes = {
  name: PropTypes.string
};


export function Tab(props){
  const { children } = props;
  let headers = [];
  
  React.Children.forEach(children, element => {
    if(!React.isValidElement(element)) return;
    const { name, headerIcon } = element.props;
    headers.push({ name, headerIcon });
  });

  const [ activeTab, setActiveTab ] = useState(headers[0]);

  return <TabContainer>
           <TabHeaderContainer>
             { headers.map((h) => {
               return <TabHeader key={h.name}
                                 onClick={() => setActiveTab(h.name)}
                                 {...(h.name === activeTab ? { active: true } : {})}>
                        { h.headerIcon }
                      </TabHeader>;
             })}
           </TabHeaderContainer>
           <TabPanelContainer>
             { children.map((e) => {
               return e.props.name === activeTab ? e : <></>;
             }) }
           </TabPanelContainer>
         </TabContainer>;
}

Tab.propTypes = {
  children: function (props, propName, componentName){
    const prop = props[propName];
    let error = null;
    React.Children.forEach(prop, (child) => {
      if(child.type !== TabPanel){
        error = new Error(
          "`" + componentName + "` children should be of type `TapPanel`."
        );
      }
    });
    return error;
  }
};
