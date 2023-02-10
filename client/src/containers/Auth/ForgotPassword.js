import { useState, useRef } from 'react';
import { FormContainer, Input, SubmitButton, BoldLink, ErrorMessage } from '../../components/AccountBox/FormElements';
import config from '../../config/config';
import axios from 'axios';
import * as yup from 'yup';
import { toast } from 'react-toastify';

export default function ForgotPassword () {
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const emailRef = useRef();

  const resetError = () => setErrorMsg("");
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const yupEmail = yup.string().email().required();
    try {
      const validatedEmail = await yupEmail.validate(emailRef.current.value);
      const options = {
        url: `${config.serverUrl}/auth/reset/${validatedEmail}`,
        method: 'GET'
      };
      await axios.request(options);
      toast.success(`Email sent successfully to ${validatedEmail}!`);
      setDisabled(true);
    } catch(e){
      setErrorMsg(e.response.data.errorList.join(', '));
    } finally {
      setLoading(false);
    }

  };

  return (
    <FormContainer onSubmit={onSubmit}>
      <div className='h-2'></div>      
      <Input ref={emailRef} type="email" placeholder="Your email" onChange={resetError} disabled={disabled}/>
      { errorMsg && <ErrorMessage errorMessage={errorMsg}/>}
      <div className='h-2'></div>      
      <SubmitButton disabled={disabled}> { isLoading ? 'Requesting...' : disabled ? 'Check your Email' : 'Request Reset' } </SubmitButton>
      <div className='h-2'></div>
      <BoldLink to="/auth/login"> Back to Login </BoldLink>      
    </FormContainer>
  );
}
