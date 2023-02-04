import config from '../config/config';
import { login, logout } from './AuthSlice';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.serverUrl}/api/v1`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if(result?.error?.originalStatus === 403) {
    console.log('sending refresh token..');
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    console.log(refreshResult);
    if(refreshResult?.data){
      
    } else {
      api.dispatch(logout());
    }
  }
};


export const ApiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => {
    
  }
});
