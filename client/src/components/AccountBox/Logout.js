import { useDispatch } from 'react-redux';
import { logout } from '../../redux/AuthSlice';
import { useHistory } from 'react-router-dom';

export default function Logout(){
  const history = useHistory();
  const dispatch = useDispatch();
  dispatch(logout());
  history.push('/');

  return <></>;
}
