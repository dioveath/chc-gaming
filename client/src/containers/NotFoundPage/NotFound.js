import styled from 'styled-components';
import tw from 'twin.macro';
import { GiGamepadCross } from 'react-icons/gi';

const Text = styled.p`
font-size: 1.2rem;
font-weight: 600;
color: white;
`;

const Border = styled.div`
height: 10px;
background-color: white;
`;

export const NotFound = () => {
  return (
    <>
      <GiGamepadCross size='40px' color='white'/>
      <Border/>
      <Text> 404 | Not Found </Text>
    </>
  );
};
