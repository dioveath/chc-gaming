import { useDispatch } from 'react-redux';
import { logout } from '../../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';

export default function Logout(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(logout());
  navigate('/');

  return <></>;
}
