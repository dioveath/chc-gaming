import { useRef, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FormContainer, Input, SubmitButton, BoldLink, ErrorMessage } from '../../components/AccountBox/FormElements';
import axios from 'axios';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import config from '../../config/config';
import { isTokenExpired } from '../../helpers/jwt';

const schema = yup.object({
  email: yup.string().email().required(),
  token: yup.string().required()
});

const passwordSchema = yup.object({
  password: yup.string()
    .required('Provide a password!')
    .min(3, 'At least 3 characters min').max(30, 'Max up to 30 characters only')
    .matches(/^[A-z0-9~!@#$%^&*()_+-=]{3,30}$/, 'Should match [A-z0-9~!@#$%^&*()_+-=]{3,30}')
});

export default function ResetPassword () {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const passRef = useRef();
  const confirmPassRef = useRef();

  useEffect(() => {
    const newQuery = Object.fromEntries([...searchParams]);
    (async () => {
      try {
        const validQuery = await schema.validate(newQuery);
        if(isTokenExpired(validQuery.token)) throw new Error();
        setQuery(validQuery);
      } catch(e){
        navigate('/auth/login');
      }
    })();
  }, [searchParams, navigate]);


  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(passRef.current.value !== confirmPassRef.current.value) {
      setErrorMsg("Password & Confirm Password didnt' match!");
      return;
    }

    try {
      const data = {
        password: passRef.current.value
      };
      await passwordSchema.validate(data);
      const options = {
        url: `${config.serverUrl}/auth/reset/${query.email}`,
        headers: {
          'Authorization': `Bearer ${query.token}`
        },
        method: 'POST',
        data: data
      };

      const response = await axios.request(options);
      if(response.data.status === 'success') {
        setTimeout(() => {
          navigate('/auth/login');
        }, 3000);
        setDisable(true);
        toast.success("Reset successful. You'll be redirected to login now!", { autoClose: 3500 });
      }
    } catch(e){
      setErrorMsg(e.message);
    } finally { setLoading(false); }
  };

  return (
    <FormContainer onSubmit={onSubmit}>
      <Input ref={passRef} type="password" placeholder="New Password"/>
      <Input ref={confirmPassRef} type="password" placeholder="Confirm New Password"/>
      <div className='h-2'></div>
      { errorMsg && <ErrorMessage errorMessage={errorMsg}/>}
      <SubmitButton disabled={disable}> { isLoading ? 'Reseting...' : 'Reset Password' } </SubmitButton>
      <div className='h-2'></div>
      <BoldLink to="/auth/login"> Back to Login </BoldLink>
    </FormContainer>
  );
}
