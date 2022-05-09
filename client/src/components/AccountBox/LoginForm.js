import React from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, pending, error } from '../../redux/AuthSlice';
import { Link } from 'react-router-dom';

import { BoxContainer, FormContainer, ErrorMessage,  Input, MutedLink, BoldLink, SubmitButton} from './FormElements';
import { Marginer } from '../../components/Marginer';

import { MdArrowBackIosNew } from 'react-icons/md';

import config from '../../config/config.js';


export function LoginForm(props){

  const email = useRef();
  const password = useRef();

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLoginClick = async (e) => {
    e.preventDefault();

    dispatch(pending());

    try {
      console.log(config.serverUrl);
      var response = await axios.post(`${config.serverUrl}/auth/login`,
                                      {
					"email": email.current.value,
					"password": password.current.value
                                      });
      console.log(response);
      if(response.data.status == 'success') {
	dispatch(login({
          accessToken: response.data.accessToken,
          userId: response.data.userId
	}));      
      } else {
	dispatch(error({
          errorMessages: response.data.errorList
	}));
      }      

    } catch (e){
      dispatch(error({
	errorMessages: [e.message]
      }));
    }



  };


  return (
    <FormContainer onSubmit={handleLoginClick}>
      <Input type="email" placeholder="Email" ref={email} />
      <Input type="password" minLength="6" placeholder="Password" ref={password} />
      <Marginer vertical="5px"/>
      {
        auth.isError && auth.errorMessages.map((message, i) => {
          return <ErrorMessage errorMessage={message} key={i}/>;
        })
      }
      <Marginer vertical="5px"/>
      <SubmitButton type="submit"> { auth.isPending ? 'Logging in...' : 'LOGIN'} </SubmitButton>
      <Marginer vertical="10px"/>
      <MutedLink> Don't have an Account? <BoldLink to="/auth/register"> Register Now! </BoldLink> </MutedLink>
      <Marginer vertical="10px"/>


      <BoldLink to="/"> Home </BoldLink>        

    </FormContainer>
  );
}
