
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

const TabContainer = styled.div`
`;
const TabPanelContainer = styled.div`
`;

const TabHeaderContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
// background-color: #141414;
${tw`
rounded-md
bg-black
gap-2
px-4
`}
`;

const TabHeader = styled.div`
text-align: center;
color: white;
border-bottom: 2px solid transparent;
transition: all .2s ease;

${tw`
py-2
px-4
text-sm
font-normal
cursor-pointer
`}

${props => props.active && css`
border-bottom: 2px solid #B60606;
${tw`
`}
`}

`;

export const TabPanel = (props) => {
  return <TabPanelContainer> { props.children} </TabPanelContainer>;
};

TabPanel.propTypes = {
  name: PropTypes.string
};


export function Tab(props){
  const { children } = props;
  let headers = [];
  
  React.Children.forEach(children, element => {
    if(!React.isValidElement(element)) return;
    const { name } = element.props;
    headers.push(name);
  });

  const [ activeTab, setActiveTab ] = useState(headers[0]);

  return <TabContainer>
           <TabHeaderContainer>
             { headers.map((h) => {
               return <TabHeader key={h}
                                 onClick={() => setActiveTab(h)}
                                 {...(h === activeTab ? { active: true } : {})}>
                        {h}
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
