import { useDispatch } from 'react-redux';
import { logout } from '../../redux/AuthSlice';
import { deleteUser } from '../../redux/UserSlice';
import { resetMenu } from '../../redux/UserDashboardSlice';
import { useNavigate } from 'react-router-dom';

export default function Logout(){
  const navigate = useNavigate();
  const dispatch = useDispatch();

  dispatch(logout());
  dispatch(deleteUser());
  dispatch(resetMenu());

  navigate('/');
  return <p> Logging out... </p>;
}
