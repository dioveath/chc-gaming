import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

import { IconContext } from "react-icons";
import { HiOutlineExclamation } from 'react-icons/hi';
import { Marginer } from '../../components/Marginer';

export const BoxContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
transition: all .2s ease;
`;

export const FormContainer = styled.form`
width: 100%;
display: flex;
flex-direction: column;
`;


export const MutedLink = styled.span`
font-size: 12px;
color: rgba(200, 200, 200, 0.9);
font-weight: 500;
text-decoration: none;
cursor: pointer;

`;


export const BoldLink = styled(Link)`
font-size: 12px;
color: rgb(183,27,27);
font-weight: 500;
text-decoration: none;
cursor: pointer;

&:hover { 
filter: brightness(1.3);
}

`;


export const ErrorText = styled.span`
// color: white;
color: rgb(183,27,27);
font-size: 10px;
`;

export const ErrorContainer = styled.div`
display: flex;
width: auto;
` ;

export const ErrorMessage = (props) => {
  return (
    <div className='flex flex-col gap-2 my-2'>
      { props.errorMessage && props.errorMessage.split('\n').map((em, idx) =>
        <ErrorContainer key={idx}>
          <IconContext.Provider value={{ color: "white"}}>
            <HiOutlineExclamation/>
          </IconContext.Provider>
          <Marginer horizontal="5px"/>
          <ErrorText> { em } </ErrorText> 
        </ErrorContainer>
      )}      
      { !props.errorMessage && <ErrorText>{'Something went wrong!'}</ErrorText> }
    </div>
  );
};


export const Input = styled.input`
color: #ffffff;
background-color: #220303;

width: 100%;
height: 38px;
font-size: 14px;
outline: none;
padding: 0px 10px;
margin: 5px 0px;
border-radius: 5px;
border-bottom: 2px solid transparent;
transition: all 300ms ease-in-out;

&::placeholder { 
color: rgba(255, 255, 255, 0.4);
font-size: 12px;
font-family: 'Montserrat';
}

&:focus { 
outline: none;
border-bottom: 2px solid rgb(183,27,27);
}
`;

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
background: rgb(183,27,27);
background: linear-gradient(180deg, rgba(183,27,27,1) 36%, rgba(120,0,0,1) 100%);

z-index: 100;

&:hover { 
filter: brightness(1.3);
}

&:disabled {
background: gray;
}
` ;

export const Select = styled.select.attrs(props => ({
  className: props.className
}))`
background-color: #220303;
color: #fff;
font-size: 15px;
font-weight: 600;
padding: 7px 20px;
border: none;
border-radius: 4px;
cursor: pointer;
transition: all 240ms ease-in-out;
outline: none;

&:disabled {
background: gray;
}


`;

export const Option = styled.option.attrs(props => ({
  className: props.className
}))`
`;

