import React from "react";
import { useRef } from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login, pending, error } from "../../redux/AuthSlice";

import {
  FormContainer,
  ErrorMessage,
  Input,
  MutedLink,
  BoldLink,
  SubmitButton,
} from "./FormElements";
import { Marginer } from "../../components/Marginer";
import config from "../../config/config.js";

import { motion } from "framer-motion";

export function LoginForm() {
  const email = useRef();
  const password = useRef();

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLoginClick = async (e) => {
    e.preventDefault();

    dispatch(pending());

    try {
      console.log(config.serverUrl);
      var response = await axios.post(`${config.serverUrl}/auth/login`, {
        email: email.current.value,
        password: password.current.value,
      });
      if (response.data.status === "success") {
        dispatch(
          login({
            accessToken: response.data.accessToken,
            userId: response.data.userId,
          })
        );
      } else {
        dispatch(
          error({
            errorMessages: response.data.errorList,
          })
        );
      }
    } catch (e) {
      dispatch(
        error({
          errorMessages: [e.message],
        })
      );
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
        {auth.isError &&
          auth.errorMessages.map((message, i) => {
            return <ErrorMessage errorMessage={message} key={i} />;
          })}
        <Marginer vertical="5px" />
        <SubmitButton type="submit">
          {auth.isPending ? "Logging in..." : "LOGIN"}
        </SubmitButton>
        <Marginer vertical="10px" />
        <MutedLink>
          Don't have an Account?
          <BoldLink to="/auth/register"> Register Now! </BoldLink>{" "}
        </MutedLink>
        <Marginer vertical="10px" />

        <BoldLink to="/"> Home </BoldLink>
      </FormContainer>
    </motion.div>
  );
}
