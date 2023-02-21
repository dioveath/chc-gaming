import styled from 'styled-components';
import tw from 'twin.macro';
import { IconContext } from 'react-icons';

import {
  BoldText
} from '../../components/base';
import { Marginer } from '../Marginer/index';

import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../Responsive';

const MenuButtonContainer = styled.div`
${props => props.open ? tw`px-6` : tw`px-2`}

${tw`
w-full
py-4
flex
items-center
justify-start
rounded-md
shadow-sm
bg-transparent
transition-all
cursor-pointer
`}

justify-content: ${props => props.open ? 'flex-start' : 'center' };
background-color: ${props => props.active ? '#922626' : 'transparent'};

&:hover { 
background-color: ${props => props.active ? 'rgb(17 24 39)' : 'rgb(31 41 55)'};
}

`;

const MenuItem = ({open, active,  icon, color, name, onClick, ...props}) => {
  const iconSize = useMediaQuery({ maxWidth: SCREENS.md }) ? '20' : '24';

  return (
    <IconContext.Provider value={{ color: 'white', size: iconSize }}>
      <MenuButtonContainer open={open} active={active} onClick={onClick}>
        { icon }
        { open ?
          <>
            <Marginer horizontal='1rem'/>
            <BoldText> { name } </BoldText>        
          </> : <></>}
      </MenuButtonContainer>
    </IconContext.Provider>
  );
};

export default MenuItem;
