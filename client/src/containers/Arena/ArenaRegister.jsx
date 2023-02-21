import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  FormContainer,
  Input,
  SubmitButton,
  BoldLink,
  ErrorMessage,
} from "../../components/AccountBox/FormElements";
import { useArenaRegisterMutation } from './arenaRegisterSlice';
import { toast } from 'react-toastify';

export default function ArenaRegister() {
  const arenaRef = useRef();
  const arenaHandleRef = useRef();
  const [ arenaRegister, { isLoading }] = useArenaRegisterMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const reset = () => setErrorMsg("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const newArena = {
      name: arenaRef.current.value,
      handle: arenaHandleRef.current.value
    };
    try {
      await arenaRegister(newArena).unwrap();
      setDisabled(true);
      toast.success("Arena registered successfully!");
      toast.info("Redirecting you to dashboard!");
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

    } catch(e){
      setErrorMsg(e.data.errorList.join('\n'));
    }
  };

  return (
    <div className="w-full min-h-screen h-full flex justify-center items-center">
      <div className="w-full max-w-md">
        <FormContainer onSubmit={onSubmit}>
          <Input ref={arenaRef} type="text" placeholder="Arena Name" onChange={reset}/>
          <Input ref={arenaHandleRef} type="text" placeholder="Arena Short Name / Handle" onChange={reset}/>
          <div className="h-2"></div>
          {errorMsg && <ErrorMessage errorMessage={errorMsg} />}
          <SubmitButton disabled={disabled}>
            {isLoading ? "Loading..." : disabled ? "Registered Arena" : "Register Arena"}
          </SubmitButton>
          <div className="h-2"></div>
          <BoldLink to="/dashboard"> Back to Dashboard </BoldLink>
        </FormContainer>
      </div>
    </div>
  );
}
