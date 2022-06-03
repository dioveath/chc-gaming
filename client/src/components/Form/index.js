import styled from 'styled-components';
import tw from 'twin.macro';

export const Input = styled.input`
color: #fff;


background-color: ${props => props.readOnly ? '#222222' : '#220303'};

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
}

&:not(:last-of-type) { 

}

&:focus { 
outline: none;
border-bottom: ${props => props.readOnly ? '2px solid #111111' : '2px solid rgb(183,27,27)'};
}
`;

export const TextArea = styled.textarea`
  color: #fff;
  background-color: #220303;

  width: 100%;
  height: 100px;
  font-size: 14px;
  outline: none;
  padding: 10px 10px;
  margin: 5px 0px;
  border-radius: 5px;
  border-bottom: 2px solid transparent;
  transition: all 300ms ease-in-out;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
    font-size: 12px;
  }

  &:not(:last-of-type) {
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(183, 27, 27);
  }
`;

export const Select = styled.select`
  color: #fff;
  background-color: #220303;
  border-radius: 5px;
  border-bottom: 2px solid transparent;
  transition: all 300ms ease-in-out;
  padding: 10px 10px;

  ${tw`
  outline-none
  w-full
  `}

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
    font-size: 12px;
  }

  &:not(:last-of-type) {
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(183, 27, 27);
  }
`;

export const SelectOption = styled.option`
  color: #fff;
  background-color: #220303;
  border-radius: 5px;
  border-bottom: 2px solid transparent;
  transition: all 300ms ease-in-out;
  padding: 10px 10px;
  outline: none;
`;

