import styled from 'styled-components';

import { AccountBox } from '../../components/AccountBox';
import { Marginer } from '../../components/Marginer';

import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
 

const PageContainer = styled.div`
margin-top: 40px;
margin-bottom: 100px;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;


export function LoginPage(){

  const auth = useSelector((state) => state.auth);

  return (
    auth.accessToken != null ?
      <Redirect to={`/profile/${auth.userId}`}/> :    
    <PageContainer>
      <AccountBox/>
    </PageContainer>
  );
}

export default LoginPage;
