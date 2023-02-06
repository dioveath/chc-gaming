import { useLocation, Outlet, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequiresAuth = () => {
  const { accessToken } = useSelector(state => state.auth);
  const location = useLocation();

  return (accessToken ? <Outlet/> : <Route path='/' render={() => <Redirect to='/login'/>}/>);
};

export default RequiresAuth;
