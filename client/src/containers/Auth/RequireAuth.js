import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = () => {
  const { accessToken: loggedIn } = useSelector(state => state.auth);
  const location = useLocation();

  return (loggedIn ? <Outlet/> : <Navigate to='/' state={{from: location}} replace/>);
};

export default RequireAuth;
