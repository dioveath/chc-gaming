import styled from 'styled-components';


const MarginContainer = styled.div`

height: ${ props => props.vertical || "0px"};
width: ${ props => props.horizontal || "0px"};

`;


export function Marginer(props){
  return (
    <MarginContainer vertical={props.vertical} horizontal={props.horizontal}/>
  );
}

