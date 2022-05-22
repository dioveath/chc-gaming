import styled from 'styled-components';

import { AccountBox } from '../../components/AccountBox';
import { Marginer } from '../../components/Marginer';

const PageContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;


export function LoginPage(){
  return (
    <PageContainer>
      <Marginer vertical="2rem"/>
      <AccountBox/>
      <Marginer vertical="2rem"/>      
    </PageContainer>
  );
}

export default LoginPage;
