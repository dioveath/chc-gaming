import styled from 'styled-components';


const MarginContainer = styled.div`

height: ${ props => props.vertical || "10px"};
width: ${ props => props.horizontal || "10px"};

`;


export function Marginer(props){
  return (
    <MarginContainer vertical={props.vertical} horizontal={props.horizontal}/>
  );
}

