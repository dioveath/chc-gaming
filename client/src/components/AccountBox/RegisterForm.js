import { useRef } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { BoxContainer, FormContainer, ErrorMessage, Input, MutedLink, BoldLink, SubmitButton} from './FormElements';
import { Marginer } from '../../components/Marginer';


import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { pending, error, complete }  from '../../redux/RegisterSlice';
import { login }  from '../../redux/AuthSlice';


export function RegisterForm(props){

  const firstName = useRef();
  const lastName = useRef();
  const gamingName = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const address = useRef();
  const dob = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const reg = useSelector((state) => state.reg);
  const dispatch = useDispatch();

  const handleRegisterClick = async (e) => {
    e.preventDefault();

    dispatch(pending());

    if(password.current.value !== confirmPassword.current.value)
      dispatch(error({
        errorMessages: [
          `Password and Confirm Password didn't match`
        ]
      }));

    try {
      var response = await axios.post("http://localhost:5555/auth/register",
                                      {
                                        "first_name": firstName.current.value,
                                        "last_name": lastName.current.value,
                                        "gaming_name": gamingName.current.value,
                                        "email": email.current.value,
                                        "phone_number": phoneNumber.current.value,
                                        "address": address.current.value,
                                        "dob": dob.current.value,
                                        "password": password.current.value,
                                      }
                                     );

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


    } catch (e) {
      
      dispatch(error({
        errorMessages: [e.message]
      }));

    }

  };


  return (
    <BoxContainer>
      <FormContainer onSubmit={handleRegisterClick}>
        <Input type="text" placeholder="First Name" ref={firstName}/>
        <Input type="text" placeholder="Last Name" ref={lastName}/>
        <Input type="text" placeholder="Gaming Name" ref={gamingName}/>
        <Input type="email" placeholder="Email" ref={email}/>
        <Input type="number" placeholder="Phone Number" ref={phoneNumber}/>
        <Input type="address" placeholder="Address" ref={address}/>
        <Input type="date" placeholder="Date of Birth" ref={dob}/>
        <Input type="password" placeholder="Password" ref={password}/>
        <Input type="password" placeholder="Confirm Password" ref={confirmPassword}/>
        <Marginer vertical="5px"/>        
        {
          reg.isError && reg.errorMessages.map((message, i) => {
            return <ErrorMessage errorMessage={message} key={i}/>;
          })
        }        
        <Marginer vertical="5px"/>
        <SubmitButton type="submit"> Register </SubmitButton>
        <Marginer vertical="10px"/>        
        <MutedLink> Already have an Account? <BoldLink to="/auth/login"> Login Here! </BoldLink> </MutedLink>
        <Marginer vertical="100px"/>
      </FormContainer>
    </BoxContainer>
  );
}
