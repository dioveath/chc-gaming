import React from "react";
import { useRef, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/AuthSlice";
import { useLoginMutation } from '../../containers/Auth/authApiSlice';

import {
  FormContainer,
  ErrorMessage,
  Input,
  MutedLink,
  BoldLink,
  SubmitButton,
} from "./FormElements";
import { Marginer } from "../../components/Marginer";

import { motion } from "framer-motion";

export function LoginForm() {
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  
  const [ login, { isLoading } ] = useLoginMutation();
  const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
    setErrorMsg('');
  }, [email.current?.value, password.current?.value]);

  const handleLoginClick = async (e) => {
    e.preventDefault();
    const cred = {
      email: email.current.value,
      password: password.current.value
    };

    try {
      const data = await login(cred).unwrap();
      dispatch(setCredentials({ ...data }));
    } catch(e) {
      if(e?.data?.status === 'fail') {
        setErrorMsg(e.data.errorList.join('\n'));
      } else if (e?.status) {
        setErrorMsg("Failed to fetch!");
      } else {
        setErrorMsg('Failed - Something went wrong!');
      }
    }

  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration: 0.5}}
    >
      <FormContainer onSubmit={handleLoginClick}>
        <Input type="email" placeholder="Email" ref={email} />
        <Input
          type="password"
          minLength="6"
          placeholder="Password"
          ref={password}
        />
        <Marginer vertical="5px" />
        {errorMsg && <ErrorMessage errorMessage={errorMsg} /> }
        <Marginer vertical="5px" />
        <SubmitButton type="submit">
          {isLoading ? "Logging in..." : "LOGIN"}
        </SubmitButton>
        <Marginer vertical="10px" />
        <MutedLink>
          Don't have an Account?
          <BoldLink to="/auth/register"> Register Now! </BoldLink>
        </MutedLink>
        <Marginer vertical="10px" />
        <BoldLink to="/auth/forgot"> Forgot Password? </BoldLink>
        <BoldLink to="/"> Home </BoldLink>
      </FormContainer>
    </motion.div>
  );
}
